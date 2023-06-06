/*
  23-04-30 ~ 23-05-01 예매 좌석 페이지 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Seat")
public class SeatController {

    private final SeatService seatService;

    // 예매 페이지에서 좌석을 가져오는 컨트롤러
    @GetMapping("/auth/MovieInfo")
    public ResponseEntity<List<SeatDto>> SeatMovieInfo(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(seatService.getSeatMovieInfo(request, requestMap));
    }

    // 결제전 점유좌석의 여부를 확인하는 컨트롤러
    @PostMapping("/auth/Check")
    public ResponseEntity<String> SeatCheck(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        seatService.getSeatCheck(request, requestMap);
        return ResponseEntity.noContent().build();
    }
}


