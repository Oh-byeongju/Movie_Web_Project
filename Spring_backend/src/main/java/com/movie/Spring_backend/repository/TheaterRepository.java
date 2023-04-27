package com.movie.Spring_backend.repository;
import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.TheaterEntity;

import java.sql.Date;
import java.util.List;

@Repository
public interface TheaterRepository extends JpaRepository<TheaterEntity, Long> {
    // 현재 예매가 가능한 영화관 조회 메소드(영화시작 시간이 현재시간에 30분을 더한 값 보다 큰것들)
    @Query(value = "SELECT t FROM TheaterEntity as t WHERE t.tid IN " +
            "(SELECT DISTINCT c.theater FROM CinemaEntity as c WHERE c.cid IN " +
            "(SELECT DISTINCT mi.cinema FROM MovieInfoEntity as mi WHERE mi.mistarttime >= function('addtime', now(), '0:30:00')))")
    List<TheaterEntity> findPossibleTheater();

    // 예매 페이지에서 조건에 맞는 영화관 조회 메소드
    @Query(value = "SELECT t FROM TheaterEntity as t WHERE t.tid IN " +
            "(SELECT DISTINCT ci.theater FROM CinemaEntity as ci WHERE ci.cid IN " +
            "(SELECT DISTINCT mi.cinema FROM MovieInfoEntity as mi WHERE mi.mistarttime >= function('addtime', now(), '0:30:00') " +
            "AND (:miday is null or mi.miday = :miday) AND (:movie is null or mi.movie = :movie)))")
    List<TheaterEntity> findTheaterOnTicket(@Param("miday") Date miday, @Param("movie") MovieEntity movie);

    // 영화관 수정하는 메소드
    @Modifying
    @Query("UPDATE TheaterEntity as t " +
            "SET t.tname = :tname, t.tarea = :tarea, t.taddr = :taddr WHERE t.tid = :tid")
    void TheaterUpdate(@Param("tname") String tname, @Param("tarea") String tarea,
                       @Param("taddr")String taddr, @Param("tid") Long tid);








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


}