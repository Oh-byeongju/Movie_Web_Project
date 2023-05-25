/*
  23-05-24 ~ 25 게시물 댓글 관련 서비스 수정(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.BoardCommentDto;
import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.BoardLikeEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.BoardCommentRepository;
import com.movie.Spring_backend.repository.BoardLikeRepository;
import com.movie.Spring_backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BoardCommentService {
    private final BoardCommentRepository boardCommentRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final JwtValidCheck jwtValidCheck;
    private final BoardRepository boardRepository;

    // 댓글 조회하는 메소드
    @Transactional
    public HashMap<Long, BoardCommentDto> getComment(Map<String, String> requestMap) {
        // requestMap 안에 정보를 추출
        Long bid = Long.valueOf(requestMap.get("bid"));
        String sort = requestMap.get("sort");
        String uid = requestMap.get("uid");

        // 댓글 조회에 필요한 정보 Entity형으로 변환
        BoardEntity board = BoardEntity.builder().bid(bid).build();
        MemberEntity member = MemberEntity.builder().uid(uid).build();

        // 정렬에 따른 최상위 부모 댓글 조회
        List<BoardCommentEntity> boardComments;
        if (sort.equals("like")) {
            boardComments = boardCommentRepository.findByCommentLike(board);
        }
        else {
            boardComments = boardCommentRepository.findByBoardAndBcrootIsNullOrderByBcidDesc(board);
        }

        // 전체 답글조회(작성 시간순으로 최신순)
        List<BoardCommentEntity> boardReply = boardCommentRepository.findByBoardAndBcrootIsNotNullOrderByBcrootAscBcparentAscBcidDesc(board);

        // 사용자가 좋아요 누른 댓글 조회 및 기본키 매핑
        List<Long> checkLike = new ArrayList<>();
        List<BoardLikeEntity> commentLikes = boardLikeRepository.findByBoardAndMemberAndBllikeTrueAndBoardcommentIsNotNull(board, member);
        for (BoardLikeEntity BL : commentLikes) {
            checkLike.add(BL.getBoardcomment().getBcid());
        }

        // 사용자가 싫어요 누른 댓글 조회 및 기본키 매핑
        List<Long> checkUnlike = new ArrayList<>();
        List<BoardLikeEntity> commentUnlikes = boardLikeRepository.findByBoardAndMemberAndBlunlikeTrueAndBoardcommentIsNotNull(board, member);
        for (BoardLikeEntity BL : commentUnlikes) {
            checkUnlike.add(BL.getBoardcomment().getBcid());
        }

        // 최상위 부모 댓글 매핑
        HashMap<Long, BoardCommentDto> result = new LinkedHashMap<>();
        for (BoardCommentEntity BC : boardComments) {
            result.put(BC.getBcid(), BoardCommentDto.builder()
                    .bcid(BC.getBcid())
                    .bccomment(BC.getBccomment())
                    .bcdate(BC.getBcdate())
                    .likes(BC.getLikes())
                    .unlikes(BC.getUnlikes())
                    .like(checkLike.contains(BC.getBcid()))
                    .unlike(checkUnlike.contains(BC.getBcid()))
                    .uid(BC.getMember().getUid())
                    .child(new ArrayList<>()).build());
        }

        // 답글 매핑
        for (BoardCommentEntity BC : boardReply) {
            // 답글 중 최상위 답글일경우 답글을 그냥 삽입
            if (BC.getBcroot().equals(BC.getBcparent())) {
                result.get(BC.getBcroot()).getChild().add(0, BoardCommentDto.builder()
                        .bcid(BC.getBcid())
                        .bccomment(BC.getBccomment())
                        .bcdate(BC.getBcdate())
                        .bcroot(BC.getBcroot())
                        .uid(BC.getMember().getUid()).build());
            }
            else {
                // 최상위 부모 댓글의 자식들을 추출
                List<BoardCommentDto> temp = result.get(BC.getBcroot()).getChild();

                // 현재 답글 리스트중 자신의 부모를 찾은 뒤 다음 인덱스에 정보 삽입
                for (int i = 0; i < temp.size(); i++) {
                    if (temp.get(i).getBcid().equals(BC.getBcparent())) {
                        temp.add(i + 1, BoardCommentDto.builder()
                                .bcid(BC.getBcid())
                                .bccomment(BC.getBccomment())
                                .bcdate(BC.getBcdate())
                                .bcroot(BC.getBcroot())
                                .uid(BC.getMember().getUid())
                                .parentUid(temp.get(i).getUid()).build());
                    }
                }
            }
        }
        return result;
    }




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//    //대댓글을 작성하는 메소드
//    @Transactional
//    public void CommentWrite(Map<String, String> requestMap, HttpServletRequest request) {
//        jwtValidCheck.JwtCheck(request, "ATK");
//        String User_id = SecurityUtil.getCurrentMemberId();
//        String text = requestMap.get("text").trim();
//        String bid = requestMap.get("bid").trim();
//        String parentcomment = requestMap.get("parent").trim();
//        System.out.println(parentcomment);
//
//        BoardEntity boardId = BoardEntity.builder().bid(Long.valueOf(bid)).build();  //
//
//        MemberEntity member = MemberEntity.builder().uid(User_id).build();  //유저 아이디 엔티티로 매핑
//
//        Date nowDate = new Date();
//        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String day = DateFormat.format(nowDate);
//        BoardEntity board =  boardRepository.booleanCheck(Long.valueOf(bid));  //게시물확인
//        if(null==board){
//           System.out.println("게시물이 없기때문에 예외처리를 해줘야함");
//       }
//        //정보가 온다
//       BoardCommentEntity parent= null;
//       //이 정보들을 불러온다
//        //자식댓글일 경우
//        if(parentcomment.length()!=0){  //parent가 있으면
//            BoardCommentEntity comment;
//
//            comment = BoardCommentEntity.builder()
//                    .bcdate(day)
//                    .bccomment(text)
//                    .board(boardId)
//                    .bcparent((long) Math.toIntExact(Long.parseLong(parentcomment)))
//                    .member(member).build();
//            boardCommentRepository.save(comment);
//        }
//        else{
//            BoardCommentEntity comment;
//
//            comment = BoardCommentEntity.builder()
//                    .bcdate(day)
//                    .bccomment(text)
//                    .board(boardId)
//                    .member(member).build();
//            boardCommentRepository.save(comment);
//        }
//
//    }
//
//    @Transactional
//    public void deleteComment(Map<String, String> requestMap, HttpServletRequest request){
//        jwtValidCheck.JwtCheck(request, "ATK");
//
//        String comment = requestMap.get("comment");
//        List<BoardCommentEntity> datas = boardCommentRepository.commentParent(Math.toIntExact(Long.parseLong(comment)));
//        for(BoardCommentEntity data : datas){
//            boardCommentRepository.delete(data);
//
//        }
//
//        boardCommentRepository.deleteById(Long.valueOf(comment));
//    }
//
//    @Transactional
//    public BoardCommentDto22 like(Map<String, String> requestMap, HttpServletRequest request){
//        jwtValidCheck.JwtCheck(request, "ATK");
//
//        boolean liked= false;
//        boolean unliked = false;
//
//        String like = requestMap.get("like");
//        String unlike = requestMap.get("unlike");
//        String comment = requestMap.get("comment");
//        String User_id = SecurityUtil.getCurrentMemberId();
//        String board = requestMap.get("board");
//
//        BoardEntity bid = BoardEntity.builder().bid(Long.valueOf(board)).build();
//        MemberEntity member = MemberEntity.builder().uid(User_id).build();
//        BoardCommentEntity boardCommentEntity = BoardCommentEntity.builder().bcid(Long.valueOf(comment)).build();
//
//        BoardLikeEntity boardLike = boardLikeRepository.findByCommentLike(Long.valueOf(board), User_id, Long.valueOf(comment));
//        BoardLikeEntity boardUnLike = boardLikeRepository.findByCommentUnLike(Long.valueOf(board), User_id, Long.valueOf(comment));
//        BoardLikeEntity boardLikeEntity;
//        boardLikeEntity = BoardLikeEntity.builder().
//                bllike(true)
//                .board(bid)
//                .boardcomment(boardCommentEntity)
//                .blunlike(false)
//                .member(member)
//                .build();
//        if(boardLike==null && like.equals("1")) {
//            System.out.println("추가");
//            if(boardUnLike!=null){
//                boardLikeRepository.CommentDeleted(Long.valueOf(board),User_id, Long.valueOf(comment));
//            }
//            boardLikeRepository.save(boardLikeEntity);
//        }
//        else if(boardUnLike==null && unlike.equals("1")){
//            if(boardLike!=null){
//                boardLikeRepository.CommentDeleted(Long.valueOf(board),User_id,Long.valueOf(comment));
//
//            }
//            boardLikeRepository.save(boardLikeEntity);
//        }
//        else if (boardUnLike!=null && unlike.equals("1")){
//            boardLikeRepository.CommentDeleted(Long.valueOf(board),User_id,Long.valueOf(comment));
//        }
//        else{
//            System.out.println("삭제");
//            boardLikeRepository.CommentDeleted(Long.valueOf(board),User_id,Long.valueOf(comment));
//        }
//        BoardCommentEntity datas = boardCommentRepository.booleanCheck(Long.valueOf(comment));
//
//
//        BoardLikeEntity checklike = boardLikeRepository.findByCommentLike(Long.valueOf(board), User_id, Long.valueOf(comment));
//        BoardLikeEntity checkunlike = boardLikeRepository.findByCommentUnLike(Long.valueOf(board), User_id, Long.valueOf(comment));
//
//
//        if (checklike == null) {
//            liked=false;
//        }
//        if(checklike !=null){
//            liked=true;
//        }
//        if(checkunlike ==null){
//            unliked=false;
//        }
//        if(checkunlike!=null){
//            unliked=true;
//        }
//
//        return BoardCommentDto22.builder().bcid(datas.getBcid())
//                .commentlike(datas.getCommentlike())
//                .commentUnlike(datas.getCommentUnlike())
//                .likes(liked)
//                .unlikes(unliked)
//                .build();
//    }
}

