package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardCommentEntity, Long> {

    //댓글을 불러오는 메소드 , 최신순
    @Query("select bc from BoardCommentEntity as bc where bc.board.bid = :bid order by bcid desc")
    public List<BoardCommentEntity> findByComment(@Param("bid") Long bid);

    @Query("select bc from BoardCommentEntity as bc where bc.board.bid = :bid ORDER BY bc.commentlike desc, bc.bcparent DESC NULLS FIRST, bcid desc")
    public List<BoardCommentEntity> findByCommentlike(@Param("bid") Long bid);

    //댓글이 존재하는지 확인하는 메소드
    @Query("select bc from BoardCommentEntity as bc where bc.bcid = :bcid ")
    public BoardCommentEntity booleanCheck(@Param("bcid") Long bcid);


    //대댓글을 확인하는 메소드
    @Query("select bc from BoardCommentEntity as bc where bc.board.bid = :bid ORDER BY bc.bcparent DESC NULLS FIRST, bcid desc")
    public List<BoardCommentEntity> CommentToComment(@Param("bid") Long bid);

    //부모로 자식 검색
    @Query("select bc from BoardCommentEntity as bc where bc.bcparent = :parent")
    public List<BoardCommentEntity> commentParent(@Param("parent") Integer parent);



    //댓글 페이지 네이션을 위한 메소드 ,번호순
    @Query("select bc from BoardCommentEntity as bc where bc.board.bid = :bid ORDER BY bc.bcparent DESC NULLS FIRST, bcid desc")
    public Page<BoardCommentEntity> PaginationComment(Pageable pageable, @Param("bid") Long bid);

}
