/*
  23-02-09 로그인한 유저가 영화에 관련된 행위를 할때 사용되는 컨트롤러 구현(오병주)
  23-02-12 영화 관람평 조회 컨트롤러 구현(오병주)
  23-02-13 관람평 작성 컨트롤러 구현(오병주)
  23-02-25 관람평 작성 컨트롤러 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.service.MovieMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/MovieMember")
public class MovieMemberController {

    private final MovieMemberService movieMemberService;

    // 영화 세부내용의 관람평을 가져오는 컨트롤러
    @GetMapping("/normal/comment/Moviedetail/{mid}")
    public ResponseEntity<List<CommentInfoDto>> MovieDetailComment(@PathVariable("mid") Long mid, @RequestParam Map<String, String> requestMap){
        return ResponseEntity.ok().body(movieMemberService.getMovieDetailComment(mid, requestMap));
    }

    // 영화 좋아요 토글을 위한 컨트롤러, 좋아요 누른 영화정보 리턴
    @PostMapping("/auth/MovieLikeToggle")
    public ResponseEntity<MovieDto> LikeToggle(@RequestBody MovieDto requestDto, HttpServletRequest request) {
        return ResponseEntity.ok().body(movieMemberService.MovieLikeUpdate(requestDto, request));
    }

    // 관람평 작성을 위한 컨트롤러, 작성에 성공할 경우 noContent 리턴
    @PostMapping("/auth/InsertComment")
    public ResponseEntity<String> InsertComment(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        movieMemberService.CommentInsert(requestMap, request);
        return ResponseEntity.noContent().build();
    }

    // 관람평 좋아요 토글을 위한 컨트롤러, 좋아요 누른 관람평 정보 리턴
    @PostMapping("/auth/CommentLikeToggle")
    public ResponseEntity<CommentInfoDto> CommentLikeToggle(@RequestBody CommentInfoDto requestDto, HttpServletRequest request) {
        return ResponseEntity.ok().body(movieMemberService.CommentLikeUpdate(requestDto, request));
    }

    // 관람평을 삭제할때 사용되는 컨트롤러, 삭제에 성공할 경우 noContent 리턴
    @DeleteMapping("/auth/CommentDelete")
    public ResponseEntity<String> CommentDelete(@RequestParam("umid") Long umid, HttpServletRequest request) {
        movieMemberService.CommentDelete(umid, request);
        return ResponseEntity.noContent().build();
    }
}