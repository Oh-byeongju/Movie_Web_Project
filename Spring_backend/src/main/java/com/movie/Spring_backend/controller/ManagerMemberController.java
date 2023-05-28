/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
  23-03-28 ~ 30 관리자 페이지 사용자 예매 현황 구현(오병주)
  23-03-31 ~ 23-04-01 관리자 페이지 관람평 관리 구현(오병주)
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

    // 아래꺼도 옮기려면 옮겨야할듯
    private final BoardCommentService boardCommentService;

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

    // 관람평 조회 메소드
    @GetMapping("/auth/allMovieComment")
    public ResponseEntity<Page<CommentInfoDto>> MovieComment(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.MovieCommentSearch(request, requestMap));
    }

    // 관람평 삭제 메소드
    @DeleteMapping("/auth/allMovieCommentDelete")
    public ResponseEntity<Page<CommentInfoDto>> MovieCommentDelete(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.MovieCommentDelete(request, requestMap));
    }


    // 아래로 밀어뿌라
    @GetMapping("/auth/boardread")
    public ResponseEntity<List<BoardDto>> BoardWrite() {
        return ResponseEntity.ok().body(managerMemberService.ReadBoard());
    }
    @GetMapping("/auth/boardselect")
    public ResponseEntity<List<BoardDto>> BoardSelect(@RequestParam("text") String text ,@RequestParam("state") String state){
        return ResponseEntity.ok().body(managerMemberService.SearchUid(text,state));
    }
    @PostMapping("/auth/deleteboard")
    public void BoardDelete(@RequestBody Map<String, String> requestMap, HttpServletRequest request){
        managerMemberService.boarddelete(requestMap,request);
    }
//    @GetMapping("/auth/commentread")
//    public ResponseEntity<CountCommentMapper> commentAll(@RequestParam("bid") Long bid, @RequestParam("type") String type) {
//        if(type.equals("new")) {
//            return ResponseEntity.ok().body(boardCommentService.findByComment(bid));
//        }
//        return null;
//    }
}
