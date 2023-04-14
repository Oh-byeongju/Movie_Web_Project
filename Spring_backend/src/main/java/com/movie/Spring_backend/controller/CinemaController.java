package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.service.CinemaService;
import com.movie.Spring_backend.service.MovieInfoService;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.movie.Spring_backend.dto.CinemaDto;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")
public class CinemaController {

    private final CinemaService cinemaService;

    @GetMapping("/normal/cinemaall")
    public ResponseEntity<List<CinemaDto>> cinema() {
        return ResponseEntity.ok().body(cinemaService.findall());
    }
    @PostMapping("/normal/insertcinema")
    public void insert(@RequestBody Map<String, String> requestMap, HttpServletRequest request,
                       @RequestBody MultipartFile multipartFile[]){
        cinemaService.insert(requestMap,request,multipartFile);
    }
}