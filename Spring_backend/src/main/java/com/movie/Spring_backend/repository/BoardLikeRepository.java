package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLikeEntity, Long> {
    // 게시물 좋아요 확인 메소드
    Optional<BoardLikeEntity> findByBoardAndMemberAndBllikeTrueAndBoardcommentIsNull(BoardEntity board, MemberEntity member);

    // 게시물 싫어요 확인 메소드
    Optional<BoardLikeEntity> findByBoardAndMemberAndBlunlikeTrueAndBoardcommentIsNull(BoardEntity board, MemberEntity member);

    // 아래로 수정
    // 옵셔널 써라
    // jpql 안써도 되는애들이 많은듯

    //게시글 좋아요 확인하는 메소드
    @Query("select bl from BoardLikeEntity as bl where bl.board.bid = :bid and bl.member.uid = :uid" +
            " and bl.bllike = true and bl.boardcomment.bcid is null")
    BoardLikeEntity findByLike(@Param("bid")Long bid, @Param("uid")String uid);

    //게시글 싫어요 확인하는 메소드
    @Query("select bl from BoardLikeEntity as bl where bl.board.bid = :bid and bl.member.uid = :uid " +
            "and bl.blunlike = true")
    BoardLikeEntity findByUnLike(@Param("bid")Long bid, @Param("uid")String uid);

    //댓글 좋아요 확인하는 메소드
    @Query("select bb from BoardLikeEntity as bb where bb.board.bid= :bid and bb.member.uid = :uid " +
            "and bb.bllike = true and bb.boardcomment.bcid = :bcid")
    BoardLikeEntity findByCommentLike(@Param("bid")Long bid, @Param("uid")String uid ,@Param("bcid") Long bcid);

    //댓글 싫어요 확인하는 메스도
    @Query("select bb from BoardLikeEntity as bb where bb.board.bid= :bid and bb.member.uid = :uid " +
            "and bb.blunlike = true and bb.boardcomment.bcid = :bcid")
    public BoardLikeEntity findByCommentUnLike(@Param("bid")Long bid, @Param("uid")String uid ,@Param("bcid") Long bcid);

    //삭제 , 게시글좋아요  // 이거 이상하게 바꿈 내가
    @Modifying
    @Query("delete from BoardLikeEntity as bl where bl.board.bid = :bid and bl.member.uid = :uid " +
            "and bl.bllike = true and bl.blunlike = false")
    public void Deleted(@Param("bid")Long bid, @Param("uid")String uid);

    //삭제, 댓글좋아요 // 이것들 다 이상함
    @Modifying
    @Query("delete from BoardLikeEntity as bl where bl.board.bid = :bid and bl.member.uid = :uid " +
            "and bl.bllike = true and bl.blunlike = false and bl.boardcomment.bcid = :bcid")
    public void CommentDeleted(@Param("bid")Long bid, @Param("uid")String uid,
                               @Param("bcid")Long bcid);

}
