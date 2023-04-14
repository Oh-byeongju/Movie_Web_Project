/*
  23-03-17 마이페이지에 있는 영화 관련 메소드 생성(오병주)
  23-03-24 마이페이지에 있는 예매내역 조회 구현(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.ReservationDto;
import com.movie.Spring_backend.entity.MovieInfoSeatEntity;
import com.movie.Spring_backend.service.MyPageMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/MyPageMovie")
public class MyPageMovieController {

    private final MyPageMovieService myPageMovieService;

    // 관람평 작성이 가능한 영화 가져오는 메소드
    @GetMapping("/auth/moviePossible")
    public ResponseEntity<List<MovieDto>> MovieMemberPossible(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MoviePossibleGet(request));
    }

    // 관람평 작성을 위한 메소드, 작성에 성공할 경우 noContent 리턴
    @PostMapping("/auth/InsertComment")
    public ResponseEntity<String> InsertComment(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        myPageMovieService.MovieCommentWrite(requestMap, request);
        return ResponseEntity.noContent().build();
    }

    // 사용자가 작성한 관람평 가져오는 메소드
    @GetMapping("/auth/GetComment")
    public ResponseEntity<List<CommentInfoDto>> MemberGetComment(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieCommentSearch(request));
    }

    // 사용자가 좋아요 누른 영화 가져오는 메소드
    @GetMapping("/auth/movieLike")
    public ResponseEntity<List<MovieDto>> MovieMemberLike(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieLikeGet(request));
    }

    // 사용자가 예매한 영화 내역을 불러오는 메소드
    @GetMapping("/auth/reserve")
    public ResponseEntity<List<ReservationDto>> MemberGetReserve(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieReserveSearch(request));
    }

    // 사용자가 예매한 영화의 세부 내역을 불러오는 메소드
    @GetMapping("/auth/ReserveDetail/{rid}")
    public ResponseEntity<ReservationDto> MemberGetReserveDetail(@PathVariable("rid") Long rid, HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieReserveDetailSearch(rid, request));
    }

    // 사용자가 예매 취소한 영화 내역을 불러오는 메소드
    @GetMapping("/auth/reserve/cancel")
    public ResponseEntity<List<ReservationDto>> MemberGetCancel(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieReserveCancelSearch(request));
    }

    // 사용자가 예매 취소한 영화의 세부 내역을 불러오는 메소드
    @GetMapping("/auth/CancelDetail/{rid}")
    public ResponseEntity<ReservationDto> MemberGetCancelDetail(@PathVariable("rid") Long rid, HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieReserveDetailSearch(rid, request));
    }

    // 사용자가 예매한 지난 관람내역을 불러오는 메소드
    @GetMapping("/auth/reserve/finish")
    public ResponseEntity<List<ReservationDto>> MemberGetFinish(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieReserveFinishSearch(request));
    }

    // 사용자가 예매한 지난 관람내역의 세부 내역을 불러오는 메소드
    @GetMapping("/auth/FinishDetail/{rid}")
    public ResponseEntity<ReservationDto> MemberGetFinishDetail(@PathVariable("rid") Long rid, HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieReserveDetailSearch(rid, request));
    }
}
