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

    // 댓글 조회 메소드(최상위 부모 댓글만, 최신순)
    List<BoardCommentEntity> findByBoardAndBcrootIsNullOrderByBcidDesc(BoardEntity board);

    // 댓글 조회 메소드(최상위 부모 댓글만, 인기순)
    @Query("SELECT bc FROM BoardCommentEntity AS bc WHERE bc.board = :board AND bc.bcroot IS NULL " +
            "ORDER BY bc.likes DESC")
    List<BoardCommentEntity> findByCommentLike(@Param("board") BoardEntity board);

    // 답글 조회 메소드(작성 시간순으로 최신순)
    List<BoardCommentEntity> findByBoardAndBcrootIsNotNullOrderByBcrootAscBcparentAscBcidDesc(BoardEntity board);





//    //아래로 날려


//
//    //댓글이 존재하는지 확인하는 메소드
//    @Query("select bc from BoardCommentEntity as bc where bc.bcid = :bcid ")
//    public BoardCommentEntity booleanCheck(@Param("bcid") Long bcid);
//
//
//    //부모로 자식 검색
//    @Query("select bc from BoardCommentEntity as bc where bc.bcparent = :parent")
//    public List<BoardCommentEntity> commentParent(@Param("parent") Integer parent);


}
