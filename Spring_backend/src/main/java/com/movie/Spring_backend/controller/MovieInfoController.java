package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.mapper.ScheduleMapper;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.service.CinemaService;
import com.movie.Spring_backend.service.MovieInfoService;
import com.movie.Spring_backend.service.MovieService;
import com.movie.Spring_backend.service.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.*;

//crossorigin 바꿔야함
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/infomovie")
public class MovieInfoController {

    private final MovieInfoService movieInfoService;
    private final CinemaService cinemaService;
    private final MovieService movieService;
    final TheaterService theaterService;
    private final MovieInfoRepository movieInfoRepository;

    @GetMapping("/normal/movieinfo")
    public List<MovieInfoDto> getData() {
        return movieInfoService.findAllMiday();

    }


    //영화로 극장 검색
    //수정완
    @GetMapping("/normal/movieselect")
    public List<TheaterDto> findByMovie(@RequestParam Long id) {
        return theaterService.findByTidIn(id);
    }

    //영화로 날짜 검색
    //수정완
    @GetMapping("/normal/movieselectday")
    public List<MovieInfoDto> findByMovieToDay(@RequestParam Long id) {
        return movieInfoService.findByMovieToDay(id);
    }

    //극장으로 날짜 검색
    //수정완
    @GetMapping("/normal/theaterday")
    public List<MovieInfoDto> getTheaterDay(@RequestParam Long id) {
        return movieInfoService.findByCinemaCidIn(id);
    }

    //극장으로 영화검색
    //수정완
    @GetMapping("/normal/theatertomovie")
    public List<MovieDto> getData(@RequestParam Long id) {
        return movieInfoService.findByTheater(id);
    }

    //날짜로 영화 검색
    //수정완
    @GetMapping("/normal/daytomovie")
    public List<MovieDto> findByDayToMovie(@RequestParam Date miday) {
        return movieInfoService.findByMovieableDisable(miday);
    }

    //날짜로 극장 검색
    //수정완
    @GetMapping("/normal/daytotheater")
    public List<TheaterDto> findByDayToTheater(@RequestParam Date miday) {
        return theaterService.findDayToTheater(miday);
    }

    //영화와 극장으로 날짜검색
    //수정완
    @GetMapping("/normal/movietheaterday")
    public List<MovieInfoDto> findByMovieTheaterDay(@RequestParam Long tid, @RequestParam Long mid) {
        return movieInfoService.findByMovieTheaterDay(tid, mid);
    }

    //날짜와 극장으로 영화를 검색
    //수정완
    @GetMapping("/normal/daytheatertomovie")
    public List<MovieDto> findByDayTheaterToMovie(@RequestParam Date miday, @RequestParam Long tid) {
        return movieInfoService.DayTheaterToMovie(miday,tid);
    }


    //날짜와 영화로 극장을 검색하는 메소드
    //수정완
    @GetMapping("/normal/daymovietotheater")
    public List<TheaterDto> findByDayMovieToTheater(@RequestParam Date miday, @RequestParam Long mid){
        return theaterService.findDayMovieToTheater(miday,mid);
    }


    //스케쥴을 불러오는 메소드
    //영화, 극장, 날짜를 다 선택한 경우
    @GetMapping("normal/Schedule")
    public List<MovieInfoDto> findBySchedule(@RequestParam Date miday , @RequestParam Long mid, @RequestParam Long tid){
        List<Long> cid = cinemaService.findByTheaterday(tid);
        return movieInfoService.findBySchedule(miday,mid,tid);
    }


    @GetMapping("normal/findtest")
    public List<ScheduleMapper> findtest(@RequestParam Long mid , @RequestParam Date miday, @RequestParam String area,@RequestParam Long tid,
    @RequestParam String message){
        if(message.equals("movie")) {
            System.out.println("극장조회");
            List<ScheduleMapper>  cinema= movieInfoService.findTest(mid, miday, area);
            return cinema;
        }
        else if(message.equals("theater")){
            System.out.println("영화조회");

            List<ScheduleMapper> movie = movieInfoService.findByTheater(miday,tid);
            return movie;
        }
        return null;
    }

    //영화 스케쥴 페이지에서 날짜 검색(movie: 영화 기준, theater: 극장 기준)
    @GetMapping("/normal/timeselect")
    public List<MovieInfoDto> timeselect(@RequestParam Long mid,@RequestParam Long tid,@RequestParam String message) {

        if(message.equals("movie")){
            List<MovieInfoDto> mappedmid = movieInfoService.findByMovieToDay(mid);
            return mappedmid;
        }
        else if(message.equals("theater")){
            List<MovieInfoDto> theater = movieInfoService.findByCinemaCidIn(tid);
            return theater;
        }
        return null;
        //영화 검색 시 해당하는 상영 날짜 추출
    }


}