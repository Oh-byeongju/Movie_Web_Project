package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.MovieInfoSeatEntity;
import com.movie.Spring_backend.entity.ReservationEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieInfoSeatRepository extends JpaRepository<MovieInfoSeatEntity, Long> {

    List<MovieInfoSeatEntity> findByMovieInfo(MovieInfoEntity movieInfo);


    // 이거 제거해도됨
    @Query(value = "SELECT mis from MovieInfoSeatEntity as mis where mis.movieInfo.miid=(:miid)")
    List<MovieInfoSeatEntity> findByInfoMovie(@Param("miid") Long miid);


    @Query(value = "select count(mis.misid) >0 from MovieInfoSeatEntity as mis where mis.seat.sid IN (:sid) AND " +
            "mis.movieInfo.miid=(:miid)")
    boolean exists(@Param(value = "sid")List<Long> sid, @Param(value ="miid") Long miid);











    // 사용자가 예매한 영화의 좌석들을 가져오는 메소드(예매시간 순으로 내림차순, 아직 영화가 끝나지 않은 예매들)
    @Query(value = "SELECT mis FROM MovieInfoSeatEntity as mis LEFT OUTER JOIN ReservationEntity as rs ON mis.reservation = rs.rid " +
            "LEFT OUTER JOIN MovieInfoEntity as mi ON rs.movieInfo = mi.miid " +
            "WHERE rs.member = :member AND rs.rstate = true AND rs.rdate > :rdate AND mi.miendtime > now() " +
            "ORDER BY rs.rdate DESC")
    @EntityGraph(attributePaths = {"seat"})
    List<MovieInfoSeatEntity> findMyPageReserveSeat(@Param("member") MemberEntity member, @Param("rdate") String rdate);

//    // 사용자가 예매한 영화의 좌석들을 가져오는 메소드(취소시간 순으로 내림차순)
        // 최종으로 지우기
//    @Query(value = "SELECT mis FROM MovieInfoSeatEntity as mis LEFT OUTER JOIN ReservationEntity as rs ON mis.reservation = rs.rid " +
//            "LEFT OUTER JOIN MovieInfoEntity as mi ON rs.movieInfo = mi.miid " +
//            "WHERE rs.member = :member AND rs.rstate = false AND rs.rcanceldate > :rcanceldate " +
//            "ORDER BY rs.rcanceldate DESC")
//    @EntityGraph(attributePaths = {"seat"})
//    List<MovieInfoSeatEntity> findMyPageReserveCancelSeat(@Param("member") MemberEntity member, @Param("rcanceldate") String rcanceldate);

    // 사용자가 예매한 지난 관람내역의 좌석들을 가져오는 메소드(예매시간 순으로 내림차순, 영화가 끝난 예매들)
    @Query(value = "SELECT mis FROM MovieInfoSeatEntity as mis INNER JOIN ReservationEntity as rs ON mis.reservation = rs.rid " +
            "INNER JOIN MovieInfoEntity as mi ON rs.movieInfo = mi.miid " +
            "WHERE rs.member = :member AND rs.rstate = true AND rs.rdate > :rdate AND mi.miendtime <= now() " +
            "ORDER BY rs.rdate DESC")
    @EntityGraph(attributePaths = {"seat"})
    List<MovieInfoSeatEntity> findMyPageReserveFinishSeat(@Param("member") MemberEntity member, @Param("rdate") String rdate);

    // 사용자가 예매한 영화의 세부내역 좌석들을 가져오는 메소드
    @Query(value = "SELECT mis FROM MovieInfoSeatEntity as mis LEFT OUTER JOIN ReservationEntity as rs ON mis.reservation = rs.rid " +
            "LEFT OUTER JOIN MovieInfoEntity as mi ON rs.movieInfo = mi.miid " +
            "WHERE rs.rid = :rid")
    @EntityGraph(attributePaths = {"seat"})
    List<MovieInfoSeatEntity> findMyPageReserveDetailSeat(@Param("rid") Long rid);

    // 예매 취소시 좌석을 삭제하는 메소드
    void deleteByReservation(ReservationEntity reservation);
}
