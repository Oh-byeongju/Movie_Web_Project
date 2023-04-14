package com.movie.Spring_backend.controller;


import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.MovieInfoSeatDto;
import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.service.MovieInfoSeatService;
import com.movie.Spring_backend.service.MovieInfoService;
import com.movie.Spring_backend.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/seat")
public class MovieInfoSeatController {
    private final MovieInfoSeatService movieInfoSeatService;

}
