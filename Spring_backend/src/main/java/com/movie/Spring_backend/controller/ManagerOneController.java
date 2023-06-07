/*
  23-04-03 ~ 23-04-05 관리자 페이지 상영정보관리 구현(오병주)
  23-04-17 상영관, 영화관 관리자 페이지 수정(오병주)
  23-04-18 ~ 19 영화 관리자 페이지 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.error.ErrorResponse;
import com.movie.Spring_backend.service.ManagerOneService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Manager")
@Tag(name = "ManagerOneController", description = "관리자 컨트롤러(영화 관련)")
public class ManagerOneController {

    private final ManagerOneService managerOneService;

    // 영화 조회 컨트롤러
    @Operation(summary = "영화 조회 요청", description = "모든 영화의 정보가 조회됩니다.", tags = { "ManagerOneController" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "영화 정보 리턴"),
            @ApiResponse(responseCode = "401", description = "로그인 Token이 전달되지 않았거나 유효하지 않은 경우", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "403", description = "접근 권한이 없을경우(관리자 계정이 아님)", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/auth/allMovie")
    public ResponseEntity<List<MovieDto>> AllMovie(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerOneService.AllMovieSearch(request));
    }

    // 영화 추가 컨트롤러
    @PostMapping("/auth/insertMovie")
    public ResponseEntity<String> InsertMovie(HttpServletRequest request, @RequestPart(value="data") MovieDto requestDto, @RequestPart(required = false) MultipartFile multipartFiles) {
        managerOneService.MovieInsert(request, requestDto, multipartFiles);
        return ResponseEntity.noContent().build();
    }

    // 영화 삭제 컨트롤러
    @DeleteMapping("/auth/deleteMovie")
    public ResponseEntity<String> DeleteMovie(HttpServletRequest request, @RequestParam Long mid) {
        managerOneService.MovieDelete(request, mid);
        return ResponseEntity.noContent().build();
    }

    // 영화 수정 컨트롤러
    @PatchMapping("/auth/updateMovie")
    public ResponseEntity<String> UpdateMovie(HttpServletRequest request, @RequestPart(value="data") MovieDto requestDto, @RequestPart(required = false) MultipartFile multipartFiles) {
        managerOneService.MovieUpdate(request, requestDto, multipartFiles);
        return ResponseEntity.noContent().build();
    }

    // 배우 조회 컨트롤러
    @Operation(summary = "배우 조회 요청", description = "모든 배우의 정보가 조회됩니다.", tags = { "ManagerOneController" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "배우 정보 리턴"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 에러", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/auth/allActor")
    public ResponseEntity<List<ActorDto>> AllActor(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerOneService.AllActorSearch(request));
    }

    // 배우 추가 컨트롤러
    @PostMapping("/auth/insertActor")
    public ResponseEntity<String> InsertActor(HttpServletRequest request, @RequestBody ActorDto requestDto) {
        managerOneService.ActorInsert(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 배우 삭제 컨트롤러
    @DeleteMapping("/auth/deleteActor")
    public ResponseEntity<String> DeleteActor(HttpServletRequest request, @RequestParam Long aid) {
        managerOneService.ActorDelete(request, aid);
        return ResponseEntity.noContent().build();
    }

    // 배우 수정 컨트롤러
    @PatchMapping("/auth/updateActor")
    public ResponseEntity<String> UpdateActor(HttpServletRequest request, @RequestBody ActorDto requestDto) {
        managerOneService.ActorUpdate(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 영화관 조회 컨트롤러
    @Operation(summary = "영화관 조회 요청", description = "모든 영화관의 정보가 조회됩니다.", tags = { "ManagerOneController" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "영화관 정보 리턴"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 에러", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/auth/allTheater")
    public ResponseEntity<List<TheaterDto>> AllTheater(@Parameter(name = "id", description = "posts 의 id", in = ParameterIn.PATH) HttpServletRequest request) {
        return ResponseEntity.ok().body(managerOneService.AllTheaterSearch(request));
    }

    // 영화관 추가 컨트롤러
    @PostMapping("/auth/insertTheater")
    public ResponseEntity<String> InsertTheater(HttpServletRequest request, @RequestBody TheaterDto requestDto) {
        managerOneService.TheaterInsert(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 영화관 삭제 컨트롤러
    @DeleteMapping("/auth/deleteTheater")
    public ResponseEntity<String> DeleteTheater(HttpServletRequest request, @RequestParam Long tid) {
        managerOneService.TheaterDelete(request, tid);
        return ResponseEntity.noContent().build();
    }

    // 영화관 수정 컨트롤러
    @PatchMapping("/auth/updateTheater")
    public ResponseEntity<String> UpdateTheater(HttpServletRequest request, @RequestBody TheaterDto requestDto) {
        managerOneService.TheaterUpdate(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 상영관 조회 컨트롤러
    @GetMapping("/auth/allCinema")
    public ResponseEntity<List<CinemaDto>> AllCinema(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerOneService.AllCinemaSearch(request));
    }

    // 상영관 추가 컨트롤러
    @PostMapping("/auth/insertCinema")
    public ResponseEntity<String> InsertCinema(HttpServletRequest request, @RequestBody CinemaDto requestDto) {
        managerOneService.CinemaInsert(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 상영관 삭제 컨트롤러
    @DeleteMapping("/auth/deleteCinema")
    public ResponseEntity<String> DeleteCinema(HttpServletRequest request, @RequestParam Long cid) {
        managerOneService.CinemaDelete(request, cid);
        return ResponseEntity.noContent().build();
    }

    // 상영관 수정 컨트롤러
    @PatchMapping("/auth/updateCinema")
    public ResponseEntity<String> UpdateCinema(HttpServletRequest request, @RequestBody CinemaDto requestDto) {
        managerOneService.CinemaUpdate(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 상영정보 조회 컨트롤러
    @GetMapping("/auth/getMovieInfo")
    public ResponseEntity<List<MovieInfoDto>> GetMovieInfo(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerOneService.MovieInfoSearch(request, requestMap));
    }

    // 상영정보 추가 컨트롤러
    @PostMapping("/auth/insertMovieInfo")
    public ResponseEntity<String> InsertMovieInfo(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        managerOneService.MovieInfoInsert(request, requestMap);
        return ResponseEntity.noContent().build();
    }

    // 상영정보 삭제 컨트롤러
    @DeleteMapping("/auth/deleteMovieInfo")
    public ResponseEntity<String> DeleteMovieInfo(HttpServletRequest request, @RequestParam Long miid) {
        managerOneService.MovieInfoDelete(request, miid);
        return ResponseEntity.noContent().build();
    }

    // 상영정보 수정 컨트롤러
    @PatchMapping("/auth/updateMovieInfo")
    public ResponseEntity<String> UpdateMovieInfo(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        managerOneService.MovieInfoUpdate(request, requestMap);
        return ResponseEntity.noContent().build();
    }
}
