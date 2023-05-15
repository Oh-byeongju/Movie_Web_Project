package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.BoardEntity;
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
    //게시글 번호와 타이틀명으로 검색하는 메소드
    @Query("select board from BoardEntity as board where bid = :bid and btitle like :btitle")
    BoardEntity findByContent(@Param("bid") Long bid,@Param("btitle")String btitle);

    //게시글번호로 검색
    @Query("select board from BoardEntity as board where board = :board")
    BoardEntity findByUpdate(@Param("board") BoardEntity board);

    //게시글의 조회수를 올려주는 메소드
    @Modifying
    @Query("update BoardEntity as board set board.bclickindex=board.bclickindex+1 where board.bid= :bid")
    void updateViews(@Param("bid") Long bid);

    //페이지 네이션을 위한 메소드 ,번호순
    @Query("select board from BoardEntity as board where board.bcategory = :category order by bid desc")
    Page<BoardEntity> PaginationBid(Pageable pageable , @Param("category") String category);

    //페이지 네이션을 위한 메소드 ,top순
    @Query("select board from BoardEntity as board where board.bcategory = :category order by bclickindex desc, bid desc")
    Page<BoardEntity> PaginationIndex(Pageable pageable, @Param("category") String category);

    //페이지 네이션 위한 메소드 , 좋아요순
    @Query("select board from BoardEntity as board where board.bcategory = :category order by board.like desc")
    Page<BoardEntity> LikesTop(Pageable pageable,@Param("category") String category);

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
