package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
// Movie로 수정
@RequestMapping("/movie")

public class MovieController {
    private final MovieService movieService;

    // 전체 영화 가져오는 메소드
    @GetMapping("/normal/allmovie")
    public ResponseEntity<List<MovieDto>> AllMovie(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(movieService.getAllMovie(requestMap));
    }

    // 현재상영작 영화 가져오는 메소드
    @GetMapping("/normal/screenmovie")
    public ResponseEntity<List<MovieDto>> ScreenMovie(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(movieService.getScreenMovie(requestMap));
    }

    // 상영예정작 영화 가져오는 메소드
    @GetMapping("/normal/comingmovie")
    public ResponseEntity<List<MovieDto>> ComingMovie(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(movieService.getComingMovie(requestMap));
    }

    // 영화 세부내용을 보여줄 때 사용되는 메소드
    @GetMapping("/normal/Moviedetail/{mid}")
    public ResponseEntity<MovieDto> MovieDetail(@PathVariable("mid") Long mid, @RequestParam(value = "uid") String uid){
        return ResponseEntity.ok().body(movieService.getMovieDetail(mid, uid));
    }

    // 아랫놈들은 컨트롤러를 따로 빼버릴까 고민 무비 멤버로
    // 그리고 두개를 묶어버리면됨
    // 영화 세부내용의 관람평을 가져오는 메소드(최신순)
    @GetMapping("/normal/recentcomment/Moviedetail/{mid}")
    public ResponseEntity<List<CommentInfoDto>> MovieDetailCommentRecent(@PathVariable("mid") Long mid, @RequestParam(value = "uid") String uid){
        return ResponseEntity.ok().body(movieService.getMovieDetailCommentRecent(mid, uid));
    }

    // 영화 세부내용의 관람평을 가져오는 메소드(공감순)
    @GetMapping("/normal/likecomment/Moviedetail/{mid}")
    public ResponseEntity<List<CommentInfoDto>> MovieDetailCommentLike(@PathVariable("mid") Long mid, @RequestParam(value = "uid") String uid){
        return ResponseEntity.ok().body(movieService.getMovieDetailCommentLike(mid, uid));
    }

    // 예매 페이지에서 조건에 맞는 영화를 가져오는 메소드
    @GetMapping("/normal/Ticket")
    public ResponseEntity<List<MovieDto>> TicketMovie(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(movieService.getTicketMovie(requestMap));
    }

    // 현재 예매가 가능한 영화를 가져오는 메소드(예매율 순으로 내림차순)
    @GetMapping("/normal/ReservePossibleDESC")
    public ResponseEntity<List<MovieDto>> PossibleDESCMovie() {
        return ResponseEntity.ok().body(movieService.getPossibleDESCMovie());
    }
}