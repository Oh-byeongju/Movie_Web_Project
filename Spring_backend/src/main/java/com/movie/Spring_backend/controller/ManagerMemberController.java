/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
  23-03-28 ~ 30 관리자 페이지 사용자 예매 현황 구현(오병주)
  23-03-31 ~ 23-04-01 관리자 페이지 관람평 관리 구현(오병주)
  23-05-30 ~ 23-06-01 관리자 페이지 게시물 관리 구현(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.service.BoardCommentService;
import com.movie.Spring_backend.service.ManagerMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Manager")
public class ManagerMemberController {

    private final ManagerMemberService managerMemberService;

    // 사용자 조회 메소드
    @GetMapping("/auth/allUser")
    public ResponseEntity<Page<MemberDto>> AllMember(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.AllMemberSearch(request, requestMap));
    }

    // 특정 사용자 추방하는 메소드
    @DeleteMapping("/auth/dropUser")
    public ResponseEntity<Page<MemberDto>> DropMember(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.DropMember(request, requestMap));
    }

    // 예매기록 페이지에서 전체 영화 불러오는 메소드
    @GetMapping("/auth/allMovie/Reservation")
    public ResponseEntity<List<MovieDto>> AllMovie(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerMemberService.AllMovieSearch(request));
    }

    // 예매기록 조회 메소드(영화 선택)
    @GetMapping("/auth/allMovieReserve")
    public ResponseEntity<Page<ReservationDto>> MovieReserve(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.MovieReserveSearch(request, requestMap));
    }

    // 예매기록 조회 메소드(극장 선택)
    @GetMapping("/auth/allTheaterReserve")
    public ResponseEntity<Page<ReservationDto>> TheaterReserve(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.TheaterReserveSearch(request, requestMap));
    }

    // 관람평 조회 컨트롤러
    @GetMapping("/auth/allMovieComment")
    public ResponseEntity<List<CommentInfoDto>> MovieComment(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.MovieCommentSearch(request, requestMap));
    }

    // 관람평 삭제 컨트롤러
    @DeleteMapping("/auth/MovieCommentDelete")
    public ResponseEntity<String> MovieCommentDelete(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        managerMemberService.MovieCommentDelete(request, requestMap);
        return ResponseEntity.noContent().build();
    }

    // 게시물 조회 컨트롤러
    @GetMapping("/auth/allBoard")
    public ResponseEntity<List<BoardDto>> AllBoard(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerMemberService.getBoard(request));
    }

    // 게시물 검색 컨트롤러
    @GetMapping("/auth/boardSearch")
    public ResponseEntity<List<BoardDto>> BoardSearch(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.getSearchBoard(request, requestMap));
    }

    // 게시물 삭제 컨트롤러
    @DeleteMapping("/auth/boardDelete")
    public ResponseEntity<String> BoardDelete(HttpServletRequest request, @RequestParam("bid") Long bid)  {
        managerMemberService.BoardDelete(request, bid);
        return ResponseEntity.noContent().build();
    }

    // 댓글 조회 컨트롤러
    @GetMapping("/auth/allComment")
    public ResponseEntity<CountCommentDto> AllComment(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.getComment(request, requestMap));
    }

    // 댓글 삭제 컨트롤러
    @DeleteMapping("/auth/commentDelete")
    public ResponseEntity<String> CommentDelete(HttpServletRequest request, @RequestParam("bcid") Long bcid) {
        managerMemberService.CommentDelete(request, bcid);
        return ResponseEntity.noContent().build();
    }

    // 답글 삭제 컨트롤러
    @DeleteMapping("/auth/replyDelete")
    public ResponseEntity<String> ReplyDelete(HttpServletRequest request, @RequestParam("bcid") Long bcid) {
        managerMemberService.ReplyDelete(request, bcid);
        return ResponseEntity.noContent().build();
    }
}
