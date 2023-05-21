package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

    // 게시물 조회 메소드(최신순)
    Page<BoardEntity> findByBcategoryOrderByBidDesc(String category, Pageable pageable);

    // 게시물 조회 메소드(인기순)
    @Query("SELECT board FROM BoardEntity AS board WHERE board.bcategory = :category ORDER BY board.like DESC")
    Page<BoardEntity> findByBcategoryOrderByBlikeDesc(@Param("category") String category, Pageable pageable);

    // 게시물 조회 메소드(조회순)
    Page<BoardEntity> findByBcategoryOrderByBclickindexDesc(String category, Pageable pageable);

    // 게시물 조회 메소드(내 게시물)
    Page<BoardEntity> findByMemberOrderByBidDesc(MemberEntity member, Pageable pageable);

    // 게시글의 조회수를 올려주는 메소드
    @Modifying
    @Query("UPDATE BoardEntity AS board SET board.bclickindex = board.bclickindex+1 WHERE board.bid = :bid")
    void updateViews(@Param("bid") Long bid);


    // 아래로 날려





    //페이지 네이션 위한 메소드 , 인기순
    @Query("select board from BoardEntity as board where btitle LIKE %:title% order by bid desc")
    Page<BoardEntity> SearchTitle(Pageable pageable, @Param("title") String title);

    //게시판 검색 ,uid
    @Query("select board from BoardEntity as board where board.member.uid =:uid  order by bid desc")
    Page<BoardEntity> SearchUid(Pageable pageable, @Param("uid") String uid);

    @Query("select board from BoardEntity as board where bid = :bid ")
    BoardEntity booleanCheck(@Param("bid") Long bid);

    @Query("select board from BoardEntity as board order by bid desc")
    List<BoardEntity> findAll();

    @Query("select board from BoardEntity as board where btitle LIKE %:title% order by bid desc")
    List<BoardEntity> ManagerTitle( @Param("title") String title);

    //게시판 검색 ,uid
    @Query("select board from BoardEntity as board where board.member.uid =:uid  order by bid desc")
    List<BoardEntity> ManagerUid(@Param("uid") String uid);
}
