/*
  23-04-22 ~ 23-04-24 상영시간표에 사용되는 컨트롤러 수정(오병주)
  23-04-27 ~ 23-04-29 예매페이지에 사용되는 컨트롤러 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.service.MovieInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//crossorigin 바꿔야함
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/MovieInfo")
public class MovieInfoController {

    private final MovieInfoService movieInfoService;

    // 예매 페이지에서 조건에 맞는 상영정보의 상영날짜를 불러오는 컨트롤러
    @GetMapping("/normal/Ticket")
    public ResponseEntity<List<MovieInfoDayDto>> TicketMovieInfoDay(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(movieInfoService.getTicketMovieInfoDay(requestMap));
    }

    // 예매 페이지에서 영화, 극장, 날짜를 모두 골랐을경우 상영정보를 불러오는 컨트롤러
    @GetMapping("normal/Schedule")
    public ResponseEntity<List<MovieInfoDto>> ScheduleMovieInfo(@RequestParam Map<String, String> requestMap){
        return ResponseEntity.ok().body(movieInfoService.getScheduleMovieInfo(requestMap));
    }

    // 조건에 맞는 상영정보의 상영날짜를 구하는 컨트롤러(상영시간표 페이지)
    @GetMapping("/normal/findDay")
    public ResponseEntity<List<MovieInfoDto>> movieInfoFindDay(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(movieInfoService.getMovieInfoDay(requestMap));
    }

    // 영화, 상영날짜, 지역을 이용하여 상영정보를 검색하는 컨트롤러(상영시간표 페이지)
    @GetMapping("/normal/timeTableByMovie")
    public ResponseEntity<List<TimeTableDto>> TimeTableByMovie(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(movieInfoService.getTimeTableByMovie(requestMap));
    }

    // 극장, 상영날짜를 이용하여 상영정보를 검색하는 컨트롤러(상영시간표 페이지)
    @GetMapping("/normal/timeTableByTheater")
    public ResponseEntity<List<TimeTableDto>> TimeTableByTheater(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(movieInfoService.getTimeTableByTheater(requestMap));
    }
}