package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.service.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Theater")
public class TheaterController {

    private final TheaterService theaterService;

    // 예매가 가능한 영화관 불러오는 컨트롤러
    @GetMapping("/normal/ReservePossible")
    public ResponseEntity<List<TheaterDto>> PossibleTheater() {
        return ResponseEntity.ok().body(theaterService.getPossibleTheater());
    }

    // 예매 페이지에서 조건에 맞는 영화관 불러오는 컨트롤러
    @GetMapping("/normal/Ticket")
    public ResponseEntity<List<TheaterDto>> TicketTheater(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(theaterService.getTicketTheater(requestMap));
    }
}


