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

    //게시글 좋아요 확인하는 메소드
    @Query("select boardcomment from BoardLikeEntity as boardcomment where boardcomment.board.bid = :bid and boardcomment.member.uid = :uid" +
            " and boardcomment.blike=1 and boardcomment.comment.bcid is null")
    public BoardLikeEntity findByLike(@Param("bid")Long bid, @Param("uid")String uid);

    //게시글 싫어요 확인하는 메소드
    @Query("select boardcomment from BoardLikeEntity as boardcomment where boardcomment.board.bid = :bid and boardcomment.member.uid = :uid " +
            "and boardcomment.bunlike=1")
    public BoardLikeEntity findByUnLike(@Param("bid")Long bid, @Param("uid")String uid);

    //댓글 좋아요 확인하는 메소드
    @Query("select bb from BoardLikeEntity as bb where bb.board.bid= :bid and bb.member.uid = :uid " +
            "and bb.blike=1 and bb.comment.bcid = :bcid")
    public BoardLikeEntity findByCommentLike(@Param("bid")Long bid, @Param("uid")String uid ,@Param("bcid") Long bcid);

    //댓글 싫어요 확인하는 메스도
    @Query("select bb from BoardLikeEntity as bb where bb.board.bid= :bid and bb.member.uid = :uid " +
            "and bb.bunlike=1 and bb.comment.bcid = :bcid")
    public BoardLikeEntity findByCommentUnLike(@Param("bid")Long bid, @Param("uid")String uid ,@Param("bcid") Long bcid);

    //삭제 , 게시글좋아요
    @Modifying
    @Query("delete from BoardLikeEntity as boardcomment where boardcomment.board.bid = :bid and boardcomment.member.uid = :uid " +
            "and boardcomment.blike = :blike and boardcomment.bunlike = :bunlike")
    public void Deleted(@Param("bid")Long bid, @Param("uid")String uid, @Param("blike")Integer like,@Param("bunlike")Integer unlike);

    //삭제, 댓글좋아요
    @Modifying
    @Query("delete from BoardLikeEntity as boardcomment where boardcomment.board.bid = :bid and boardcomment.member.uid = :uid " +
            "and boardcomment.blike = :blike and boardcomment.bunlike = :bunlike and boardcomment.comment.bcid = :bcid")
    public void CommentDeleted(@Param("bid")Long bid, @Param("uid")String uid,@Param("blike")Integer like,@Param("bunlike")Integer unlike,
                               @Param("bcid")Long bcid);

}
