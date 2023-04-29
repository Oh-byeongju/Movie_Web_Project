package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.entity.RedisSeatEntity;
import com.movie.Spring_backend.mapper.OcuppyMapper;
import com.movie.Spring_backend.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;


@RestController
@RequiredArgsConstructor
// Seat로 수정
@RequestMapping("/seat")
public class SeatController {

    private final SeatService seatService;

    @GetMapping("/normal/infoseat")
    public List<SeatDto> findBySeat(@RequestParam Long id,@RequestParam Long miid) {
        return seatService.findBySeat(id,miid);
    }

    @PostMapping("/normal/rediss")
    public void startRedis(@RequestBody HashMap<String, String> body, HttpServletRequest request) {
        seatService.setValues(body.get("name"), body.get("age"),body.get("user"), request);
    }

    @GetMapping("/normal/rediss")
    public String startRedis() {

         return seatService.getValues();
    }
}


