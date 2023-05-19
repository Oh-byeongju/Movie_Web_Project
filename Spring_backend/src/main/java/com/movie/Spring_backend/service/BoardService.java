/*
  23-05-19 게시물 관련 서비스 수정(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.BoardNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.BoardLikeRepository;
import com.movie.Spring_backend.repository.BoardRepository;
import com.movie.Spring_backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final JwtValidCheck jwtValidCheck;
    private final BoardLikeRepository boardLikeRepository;
    private final EntityManagerFactory entityManagerFactory;

    // 게시물 조회 메소드
    @Transactional
    public Page<BoardDto> getBoard(Map<String, String> requestMap) {
        // requestMap 안에 정보를 추출
        String category = requestMap.get("category");
        String sort = requestMap.get("sort");
        int page = Integer.parseInt(requestMap.get("page"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, 20);

        // 카테고리 분류
        String search_category = "";
        switch (category) {
            case "free":
                search_category = "자유 게시판";
                break;
            case "news":
                search_category = "영화 뉴스";
                break;
            case "debate":
                search_category = "영화 토론";
                break;
        }

        // 게시물 조회
        Page<BoardEntity> board;
        switch (sort) {
            // 인기순
            case "like":
                board = boardRepository.findByBcategoryOrderByBlikeDesc(search_category, PageInfo);
                break;
            // 조회순
            case "top":
                board = boardRepository.findByBcategoryOrderByBclickindexDesc(search_category, PageInfo);
                break;
            // 최신순
            default:
                board = boardRepository.findByBcategoryOrderByBidDesc(search_category, PageInfo);
        }

        return board.map(data -> BoardDto.builder()
                .bid(data.getBid())
                .btitle(data.getBtitle())
                .bdate(data.getBdate())
                .bcategory(data.getBcategory())
                .bthumbnail(data.getBthumbnail())
                .uid(data.getMember().getUid())
                .commentcount(data.getCommentcount()).build());
    }

    // 게시물 상세조회 메소드
    @Transactional
    public BoardDto getBoardDetail(Map<String, String> requestMap) {
        // requestMap 안에 정보를 추출
        Long bid = Long.valueOf(requestMap.get("bid"));
        String uid = requestMap.get("uid");

        // 게시물 상세조회
        BoardEntity Board = boardRepository.findById(bid).orElseThrow(() -> new BoardNotFoundException("게시물이 존재하지 않습니다."));

        // 게시물 조회수 1증가
        boardRepository.updateViews(bid);

        // 게시물 조회에 필요한 정보 Entity로 변환
        BoardEntity board = BoardEntity.builder().bid(bid).build();
        MemberEntity member = MemberEntity.builder().uid(uid).build();

        // 좋아요, 싫어요 정보 조회 및 가공
        BoardLikeEntity checkLike = boardLikeRepository
                .findByBoardAndMemberAndBllikeTrueAndBoardcommentIsNull(board, member).orElse(null);
        BoardLikeEntity checkUnlike = boardLikeRepository
                .findByBoardAndMemberAndBlunlikeTrueAndBoardcommentIsNull(board, member).orElse(null);

        boolean like = false;
        boolean unlike = false;
        if (checkLike != null) {
            like = true;
        }
        if (checkUnlike != null) {
            unlike = true;
        }

        return BoardDto.builder()
                .bid(Board.getBid())
                .btitle(Board.getBtitle())
                .bdetail(Board.getBdetail())
                .bdate(Board.getBdate())
                .bcategory(Board.getBcategory())
                .bclickindex(Board.getBclickindex() + 1)
                .uid(Board.getMember().getUid())
                .likes(Board.getLike())
                .unlikes(Board.getBunlike())
                .commentcount(Board.getCommentcount())
                .blike(like)
                .bunlike(unlike).build();
    }







    // 아래로 날려
    //페이지내 제목으로 검색하는 메소드
    @Transactional
    public Page<BoardDto> SearchTitle(Integer index, String title){
        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.SearchTitle(page, title);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .bthumbnail(data.getBthumbnail()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }

    //페이지내 이름으로 검색하는 메소드
    @Transactional
    public Page<BoardDto> SearchUid(Integer index, String uid){
        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.SearchUid(page, uid);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .bthumbnail(data.getBthumbnail()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }

    //게시판에 글을 작성하는 메소드
    @Transactional
    public void BoardWrite(Map<String, String> requestMap, HttpServletRequest request) {

        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");
        String User_id = SecurityUtil.getCurrentMemberId();


        String title = requestMap.get("title").trim();
        String detail = requestMap.get("detail").trim();
        String category = requestMap.get("category").trim();
        String state = requestMap.get("state").trim();

        EntityManager entityManager = entityManagerFactory.createEntityManager();


        // 이거 date util로 날려야할듯
        Date nowDate = new Date();

        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String day = DateFormat.format(nowDate);

        MemberEntity member = MemberEntity.builder().uid(User_id).build();
        BoardEntity Board;

        Pattern pattern  =  Pattern.compile("<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>");
            Matcher match = pattern.matcher(detail);

            String imgTag;

            if (match.find()) { // 이미지 태그를 찾았다면,,
                imgTag = match.group(0); // 글 내용 중에 첫번째 이미지 태그를 뽑아옴.
            } else {
                imgTag = null;
            }
            System.out.println("imgTag : " + imgTag);

            if(state.equals("insert")) {
                Board = BoardEntity.builder()
                        .btitle(title)
                        .bdate(java.sql.Date.valueOf(day))
                        .bdetail(detail)
                        .bcategory(category)
                        .bclickindex(0)
                        .member(member)
                        .bthumbnail(imgTag)
                        .build();
                boardRepository.save(Board);
            }

//            else if (state.equals("update")){
//                BoardEntity board = BoardEntity.builder().bid(Long.valueOf(id)).build();
//                entityManager.getTransaction().begin();
//                BoardEntity transboard = boardRepository.findByUpdate(board);
//
//                transboard.updateBoard(Long.valueOf(id), title,detail, java.sql.Date.valueOf(day), category,imgTag);
//                entityManager.getTransaction().commit();  //트렌잭션이 끝나도 아무런 업데이트가 일어나지 않는다.
//                System.out.println("update");
//            }
    }

    //좋아요 구현 메소드
    //comment_like
    //like
    @Transactional
    public BoardDto like(Map<String, String> requestMap,HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        boolean liked= false;
        boolean unliked = false;

        String like = requestMap.get("like");
        String unlike = requestMap.get("unlike");
        String User_id = SecurityUtil.getCurrentMemberId();
        String board = requestMap.get("board");

        BoardEntity bid = BoardEntity.builder().bid(Long.valueOf(board)).build();
        MemberEntity member = MemberEntity.builder().uid(User_id).build();
        BoardLikeEntity boardLike = boardLikeRepository.findByLike(Long.valueOf(board), User_id);
        BoardLikeEntity boardUnLike = boardLikeRepository.findByUnLike(Long.valueOf(board), User_id);
        BoardLikeEntity boardLikeEntity;
        boardLikeEntity = BoardLikeEntity.builder().
                bllike(true)
                .board(bid)
                .blunlike(false)
                .member(member)
                .build();
        //좋아요 추가
        if(boardLike==null && like.equals("1")) {
            System.out.println("추가");
            //싫어요가 된 상태
            if(boardUnLike != null){
                boardLikeRepository.Deleted(Long.valueOf(board),User_id);
            }
            boardLikeRepository.save(boardLikeEntity);
        }

        // 좋아요 상태에서 싫어요 하면 좋아요 삭제후 싫어요 추가를 해야함

        //안좋아요 추가
        else if(boardUnLike==null && unlike.equals("1")){
            if(boardLike!=null){
                //좋아요가 된상태
                boardLikeRepository.Deleted(Long.valueOf(board),User_id);
            }
            boardLikeRepository.save(boardLikeEntity);
        }

        //안좋아요 제거
        else if (boardUnLike!=null && unlike.equals("1")){
            boardLikeRepository.Deleted(Long.valueOf(board),User_id);
        }

        //좋아요 제거
        else{
            System.out.println("삭제");
            boardLikeRepository.Deleted(Long.valueOf(board),User_id);
        }
        BoardEntity datas = boardRepository.booleanCheck(Long.valueOf(board));


        BoardLikeEntity checklike = boardLikeRepository.findByLike(Long.valueOf(board), User_id);
        BoardLikeEntity checkunlike = boardLikeRepository.findByUnLike(Long.valueOf(board), User_id);


        if (checklike == null) {
            liked=false;
        }
        if(checklike !=null){
            liked=true;
        }
        if(checkunlike ==null){
            unliked=false;
        }
        if(checkunlike!=null){
            unliked=true;
        }
        return BoardDto.builder().bid(datas.getBid()).blike(liked).bunlike(unliked).likes(datas.getLike()).unlikes(datas.getBunlike()).build();
    }

    @Transactional
    public void deleteBoard(Map<String, String> requestMap, HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        String bid = requestMap.get("bid");


     boardRepository.deleteById(Long.valueOf(bid));
    }


}
