package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.BoardCommentDto;
import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.BoardLikeEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.CommentMapper;
import com.movie.Spring_backend.mapper.CountCommentMapper;
import com.movie.Spring_backend.repository.BoardCommentRepository;
import com.movie.Spring_backend.repository.BoardLikeRepository;
import com.movie.Spring_backend.repository.BoardRepository;
import com.movie.Spring_backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardCommentService {

    private final JwtValidCheck jwtValidCheck;
    private final BoardCommentRepository boardCommentRepository;
    private final BoardRepository boardRepository;

    private final BoardLikeRepository boardLikeRepository;


    //댓글을 불러오는 메소드
    @Transactional
    public CountCommentMapper  findByComment(Long bid){
        List<BoardCommentEntity> comment = boardCommentRepository.CommentToComment(bid);
        PageRequest page = PageRequest.of(0,20);   //(페이지 순서, 단일 페이지 크기)
        CountCommentMapper countCommentMapper= null;
        //전체 댓글 데이터
        List<CommentMapper> result = new ArrayList<>();
        Map<Long, CommentMapper> map = new HashMap<>();
        String User_id = SecurityUtil.getCurrentMemberId();

        Integer count = 0;
        if(comment==null) {
            System.out.println("예외처리");
        }
        for(BoardCommentEntity com : comment){
            boolean liked = false;
            boolean unliked=false;
            BoardLikeEntity checklike = boardLikeRepository.findByCommentLike(Long.valueOf(bid), User_id, com.getBcid());
            BoardLikeEntity checkunlike = boardLikeRepository.findByCommentUnLike(Long.valueOf(bid), User_id, com.getBcid());

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
            count++;
            CommentMapper dto = new CommentMapper(com,liked,unliked);
            map.put(dto.getBcid(),dto);
            if(com.getParent()!=null){
                map.get(com.getParent()).getChild().add(dto);
            }
            else{
                result.add(dto);
            }
        }
        countCommentMapper=new CountCommentMapper(result,count);
        return countCommentMapper;
    }

    //댓글 좋아요순
    @Transactional
    public CountCommentMapper  commentLike(Long bid){
        List<BoardCommentEntity> comment = boardCommentRepository.findByCommentlike(bid);
        PageRequest page = PageRequest.of(0,20);   //(페이지 순서, 단일 페이지 크기)
        CountCommentMapper countCommentMapper= null;
        //전체 댓글 데이터
        List<CommentMapper> result = new ArrayList<>();
        Map<Long, CommentMapper> map = new HashMap<>();
        String User_id = SecurityUtil.getCurrentMemberId();

        Integer count = 0;
        if(comment==null) {
            System.out.println("예외처리");
        }
        for(BoardCommentEntity com : comment){
            boolean liked = false;
            boolean unliked=false;
            BoardLikeEntity checklike = boardLikeRepository.findByCommentLike(Long.valueOf(bid), User_id, com.getBcid());
            BoardLikeEntity checkunlike = boardLikeRepository.findByCommentUnLike(Long.valueOf(bid), User_id, com.getBcid());

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
            count++;
            CommentMapper dto = new CommentMapper(com,liked,unliked);
            map.put(dto.getBcid(),dto);
            if(com.getParent()!=null){
                map.get(com.getParent()).getChild().add(dto);
            }
            else{
                result.add(dto);
            }
        }
        countCommentMapper=new CountCommentMapper(result,count);
        return countCommentMapper;

    }


    //대댓글을 작성하는 메소드
    @Transactional
    public void CommentWrite(Map<String, String> requestMap, HttpServletRequest request) {
        jwtValidCheck.JwtCheck(request, "ATK");
        String User_id = SecurityUtil.getCurrentMemberId();
        String text = requestMap.get("text").trim();
        String bid = requestMap.get("bid").trim();
        String parentcomment = requestMap.get("parent").trim();
        System.out.println(parentcomment);

        BoardEntity boardId = BoardEntity.builder().bid(Long.valueOf(bid)).build();  //

        MemberEntity member = MemberEntity.builder().uid(User_id).build();  //유저 아이디 엔티티로 매핑

        Date nowDate = new Date();
        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String day = DateFormat.format(nowDate);
        BoardEntity board =  boardRepository.booleanCheck(Long.valueOf(bid));  //게시물확인
        if(null==board){
           System.out.println("게시물이 없기때문에 예외처리를 해줘야함");
       }
        //정보가 온다
       BoardCommentEntity parent= null;
       //이 정보들을 불러온다
        //자식댓글일 경우
        if(parentcomment.length()!=0){  //parent가 있으면
            BoardCommentEntity comment;

            comment = BoardCommentEntity.builder()
                    .bcdate(day)
                    .bccomment(text)
                    .board(boardId)
                    .parent(Long.valueOf(parentcomment))
                    .member(member).build();
            boardCommentRepository.save(comment);
        }
        else{
            BoardCommentEntity comment;

            comment = BoardCommentEntity.builder()
                    .bcdate(day)
                    .bccomment(text)
                    .board(boardId)
                    .member(member).build();
            boardCommentRepository.save(comment);
        }

    }

    @Transactional
    public void deleteComment(Map<String, String> requestMap, HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        String comment = requestMap.get("comment");
        List<BoardCommentEntity> datas = boardCommentRepository.commentParent(Long.valueOf(comment));
        for(BoardCommentEntity data : datas){
            boardCommentRepository.delete(data);

        }

        boardCommentRepository.deleteById(Long.valueOf(comment));
    }

    @Transactional
    public BoardCommentDto like(Map<String, String> requestMap,HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        boolean liked= false;
        boolean unliked = false;

        String like = requestMap.get("like");
        String unlike = requestMap.get("unlike");
        String comment = requestMap.get("comment");
        String User_id = SecurityUtil.getCurrentMemberId();
        String board = requestMap.get("board");

        BoardEntity bid = BoardEntity.builder().bid(Long.valueOf(board)).build();
        MemberEntity member = MemberEntity.builder().uid(User_id).build();
        BoardCommentEntity boardCommentEntity = BoardCommentEntity.builder().bcid(Long.valueOf(comment)).build();

        BoardLikeEntity boardLike = boardLikeRepository.findByCommentLike(Long.valueOf(board), User_id, Long.valueOf(comment));
        BoardLikeEntity boardUnLike = boardLikeRepository.findByCommentUnLike(Long.valueOf(board), User_id, Long.valueOf(comment));
        BoardLikeEntity boardLikeEntity;
        boardLikeEntity = BoardLikeEntity.builder().
                blike(Integer.valueOf(like))
                .board(bid)
                .comment(boardCommentEntity)
                .bunlike(Integer.valueOf(unlike))
                .member(member)
                .build();
        if(boardLike==null && like.equals("1")) {
            System.out.println("추가");
            if(boardUnLike!=null){
                boardLikeRepository.CommentDeleted(Long.valueOf(board),User_id,0,1, Long.valueOf(comment));
            }
            boardLikeRepository.save(boardLikeEntity);
        }
        else if(boardUnLike==null && unlike.equals("1")){
            if(boardLike!=null){
                boardLikeRepository.CommentDeleted(Long.valueOf(board),User_id,1,0, Long.valueOf(comment));

            }
            boardLikeRepository.save(boardLikeEntity);
        }
        else if (boardUnLike!=null && unlike.equals("1")){
            boardLikeRepository.CommentDeleted(Long.valueOf(board),User_id,0,1, Long.valueOf(comment));
        }
        else{
            System.out.println("삭제");
            boardLikeRepository.CommentDeleted(Long.valueOf(board),User_id,1,0, Long.valueOf(comment));
        }
        BoardCommentEntity datas = boardCommentRepository.booleanCheck(Long.valueOf(comment));


        BoardLikeEntity checklike = boardLikeRepository.findByCommentLike(Long.valueOf(board), User_id, Long.valueOf(comment));
        BoardLikeEntity checkunlike = boardLikeRepository.findByCommentUnLike(Long.valueOf(board), User_id, Long.valueOf(comment));


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

        return BoardCommentDto.builder().bcid(datas.getBcid())
                .commentlike(datas.getCommentlike())
                .commentUnlike(datas.getCommentUnlike())
                .likes(liked)
                .unlikes(unliked)
                .build();
    }
}

