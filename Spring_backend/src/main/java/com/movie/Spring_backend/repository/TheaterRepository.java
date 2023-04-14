package com.movie.Spring_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.TheaterEntity;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TheaterRepository extends JpaRepository<TheaterEntity,Long>  {
    //JpaRepository<Entity클래스, PK값>
    List<TheaterEntity> findAll();


  
    //영화로 극장을 검색하는 메소드, able
    @Query("select theater from TheaterEntity as theater where theater.tid in " +
            "(select cinema.theater.tid from CinemaEntity as cinema where cinema.cid in (" +
            "select info.cinema.cid from MovieInfoEntity as info where info.movie.mid = :mid and "+
            "info.mistarttime >= function('addtime', now(), '0:30:00')" +
            "))")
    List <TheaterEntity> findByTidIn(@Param("mid") Long mid);

    //영화로 극장을 검색하는 메소드, disable
    @Query("select theater from TheaterEntity as theater where theater.tid not in " +
            "(select cinema.theater.tid from CinemaEntity as cinema where cinema.cid in (" +
            "select info.cinema.cid from MovieInfoEntity as info where info.movie.mid= :mid and "+
            "info.mistarttime >= function('addtime', now(), '0:30:00')" +
            "))")
    List <TheaterEntity> findByTidNotIn(@Param("mid") Long mid);

    //날짜로 극장 검색하는 메소드 ,able
    @Query("select theater from TheaterEntity as theater where theater.tid in " +
            "(select cinema.theater.tid from CinemaEntity as cinema where cinema.cid in (" +
            "select info.cinema.cid from MovieInfoEntity as info where info.miday = :miday and " +
            "info.mistarttime >= function('addtime', now(), '0:30:00')))" )
    List<TheaterEntity> findDayToTheaterAble (@Param("miday") Date miday);

    //날짜로 극장 검색하는 메소드 ,Disable
    @Query("select theater from TheaterEntity as theater where theater.tid not in " +
            "(select cinema.theater.tid from CinemaEntity as cinema where cinema.cid in (" +
            "select info.cinema.cid from MovieInfoEntity as info where info.miday = :miday and " +
            "info.mistarttime >= function('addtime', now(), '0:30:00')))" )
    List<TheaterEntity> findDayToTheaterDisAble (@Param("miday") Date miday);

    //날짜와 영화로 극장을 검색하는 메소드 ,able
    @Query("select theater from TheaterEntity as theater where theater.tid in " +
            "(select cinema.theater.tid from CinemaEntity as cinema where cinema.cid in (" +
            "select info.cinema.cid from MovieInfoEntity as info where info.miday= :miday and " +
            "info.movie.mid = :mid and info.mistarttime >= function('addtime', now(), '0:30:00')))")
    List<TheaterEntity> DayMovieToTheater(@Param("miday") Date miday, @Param("mid")Long mid);

    //날짜와 영화로 극장을 검색하는 메소드, disable
    @Query("select theater from TheaterEntity as theater where theater.tid not in " +
            "(select cinema.theater.tid from CinemaEntity as cinema where cinema.cid in (" +
            "select info.cinema.cid from MovieInfoEntity as info where info.miday= :miday and " +
            "info.movie.mid = :mid and info.mistarttime >= function('addtime', now(), '0:30:00')))")
    List<TheaterEntity> DayMovieToTheaterDis(@Param("miday") Date miday, @Param("mid")Long mid);

    @Modifying
    @Query("update TheaterEntity set tname = :tname ,taddr = :taddr where tid = :tid")
    public void updateTheater(@Param("tname")String tname,@Param("taddr")String taddr, @Param("tid") Long tid);






}