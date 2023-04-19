/*
  23-04-03 ~ 23-04-05 관리자 페이지 상영정보관리 구현(오병주)
  23-04-17 상영관, 영화관 관리자 페이지 수정(오병주)
  23-04-18 ~ 19 영화 관리자 페이지 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.CountCommentMapper;
import com.movie.Spring_backend.service.BoardCommentService;
import com.movie.Spring_backend.service.BoardService;
import com.movie.Spring_backend.service.ManagerOneService;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Manager")
public class ManagerOneController {

    private final ManagerOneService managerOneService;





    //영화를 저장, 수정, 삭제하는 메소드
    @PostMapping("/auth/postmovie")
    public void postMovie(@RequestPart(value="data") Map<String, String> requestMap,HttpServletRequest request,
                          @RequestPart(required = false) MultipartFile multipartFiles
    )     throws SQLException {
        System.out.println("도착");
        managerOneService.postMovie(requestMap,request,multipartFiles);
    }




    // 영화 조회 메소드 (다른 페이지에서 사용하기 때문에 페이지네이션 x)
    @GetMapping("/auth/allMovie")
    public ResponseEntity<List<MovieDto>> AllMovie(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerOneService.AllMovieSearch(request));
    }



    // 배우 조회 메소드 (다른 페이지에서 사용하기 때문에 페이지네이션 x)
    @GetMapping("/auth/allActor")
    public ResponseEntity<List<ActorDto>> AllActor(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerOneService.AllActorSearch(request));
    }

    // 배우 추가 메소드
    @PostMapping("/auth/insertActor")
    public ResponseEntity<String> InsertActor(HttpServletRequest request, @RequestBody ActorDto requestDto) {
        managerOneService.ActorInsert(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 배우 삭제 메소드
    @DeleteMapping("/auth/deleteActor")
    public ResponseEntity<String> DeleteActor(HttpServletRequest request, @RequestParam Long aid) {
        managerOneService.ActorDelete(request, aid);
        return ResponseEntity.noContent().build();
    }

    // 배우 수정 메소드
    @PatchMapping("/auth/updateActor")
    public ResponseEntity<String> UpdateActor(HttpServletRequest request, @RequestBody ActorDto requestDto) {
        managerOneService.ActorUpdate(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 영화관 조회 메소드 (다른 페이지에서 사용하기 때문에 페이지네이션 x)
    @GetMapping("/auth/allTheater")
    public ResponseEntity<List<TheaterDto>> AllTheater(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerOneService.AllTheaterSearch(request));
    }

    // 영화관 추가 메소드
    @PostMapping("/auth/insertTheater")
    public ResponseEntity<String> InsertTheater(HttpServletRequest request, @RequestBody TheaterDto requestDto) {
        managerOneService.TheaterInsert(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 영화관 삭제 메소드
    @DeleteMapping("/auth/deleteTheater")
    public ResponseEntity<String> DeleteTheater(HttpServletRequest request, @RequestParam Long tid) {
        managerOneService.TheaterDelete(request, tid);
        return ResponseEntity.noContent().build();
    }

    // 영화관 수정 메소드
    @PatchMapping("/auth/updateTheater")
    public ResponseEntity<String> UpdateTheater(HttpServletRequest request, @RequestBody TheaterDto requestDto) {
        managerOneService.TheaterUpdate(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 상영관 조회 메소드 (다른 페이지에서 사용하기 때문에 페이지네이션 x)
    @GetMapping("/auth/allCinema")
    public ResponseEntity<List<CinemaDto>> AllCinema(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerOneService.AllCinemaSearch(request));
    }

    // 상영관 추가 메소드
    @PostMapping("/auth/insertCinema")
    public ResponseEntity<String> InsertCinema(HttpServletRequest request, @RequestBody CinemaDto requestDto) {
        managerOneService.CinemaInsert(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 상영관 삭제 메소드
    @DeleteMapping("/auth/deleteCinema")
    public ResponseEntity<String> DeleteCinema(HttpServletRequest request, @RequestParam Long cid) {
        managerOneService.CinemaDelete(request, cid);
        return ResponseEntity.noContent().build();
    }

    // 상영관 수정 메소드
    @PatchMapping("/auth/updateCinema")
    public ResponseEntity<String> UpdateCinema(HttpServletRequest request, @RequestBody CinemaDto requestDto) {
        managerOneService.CinemaUpdate(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 상영정보 불러오는 메소드
    @GetMapping("/auth/getMovieInfo")
    public ResponseEntity<Page<MovieInfoDto>> GetMovieInfo(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerOneService.MovieInfoSearch(request, requestMap));
    }

    // 상영정보 추가하는 메소드
    @PostMapping("/auth/insertMovieInfo")
    public ResponseEntity<String> InsertMovieInfo(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        managerOneService.MovieInfoInsert(request, requestMap);
        return ResponseEntity.noContent().build();
    }

    // 상영정보 삭제하는 메소드
    @DeleteMapping("/auth/deleteMovieInfo")
    public ResponseEntity<String> DeleteMovieInfo(HttpServletRequest request, @RequestParam Long miid) {
        managerOneService.MovieInfoDelete(request, miid);
        return ResponseEntity.noContent().build();
    }

    // 상영정보 수정하는 메소드
    @PatchMapping("/auth/updateMovieInfo")
    public ResponseEntity<String> UpdateMovieInfo(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        managerOneService.MovieInfoUpdate(request, requestMap);
        return ResponseEntity.noContent().build();
    }
}
