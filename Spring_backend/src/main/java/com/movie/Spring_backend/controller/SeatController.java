/*
  23-04-30 예매 좌석 페이지 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
// Seat로 수정
@RequestMapping("/seat")
public class SeatController {

    private final SeatService seatService;

    // 예매 페이지에서 좌석을 가져오는 메소드
    @GetMapping("/auth/MovieInfo")
    public ResponseEntity<List<SeatDto>> SeatMovieInfo(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(seatService.getSeatMovieInfo(request, requestMap));
    }





    //responseentity 쓰기
    @PostMapping("/normal/rediss")
    public void startRedis(@RequestBody HashMap<String, String> body, HttpServletRequest request) {
        seatService.setValues(body.get("name"), body.get("age"),body.get("user"), request);
    }

    @GetMapping("/normal/rediss")
    public String startRedis() {

         return seatService.getValues();
    }
}


