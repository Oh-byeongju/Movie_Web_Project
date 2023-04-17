package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.repository.CinemaRepository;
import com.movie.Spring_backend.service.CinemaService;
import com.movie.Spring_backend.service.MovieInfoService;
import com.movie.Spring_backend.service.TheaterService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")
public class TheaterController {

    private final TheaterService theaterService;
    MovieInfoService movieInfoService;
    CinemaService cinemaService;
    MovieInfoDto movieInfoDto;

    @GetMapping("/normal/area")
    public List<TheaterDto> getData() {
        return theaterService.getInfo();
    }

}


