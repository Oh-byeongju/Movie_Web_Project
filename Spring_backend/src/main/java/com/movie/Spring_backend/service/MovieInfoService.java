/*
  23-04-22 ~ 23-04-24 상영시간표에 사용되는 메소드 수정(오병주)
  23-04-27 ~ 23-04-29 예매페이지에 사용되는 메소드 수정(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.mapper.CinemaMapper;
import com.movie.Spring_backend.mapper.MovieInfoMapper;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class MovieInfoService {
    private final MovieInfoRepository movieInfoRepository;
    private final CinemaMapper cinemaMapper;
    private final MovieInfoMapper movieInfoMapper;

    // 예매 페이지에서 조건에 맞는 상영정보의 상영날짜를 가져오는 메소드
    @Transactional
    public List<MovieInfoDayDto> getTicketMovieInfoDay(Map<String, String> requestMap) {
        // requestMap 안에 정보를 추출
        String tid = requestMap.get("tid");
        String mid = requestMap.get("mid");

        // 프론트단에서 영화를 선택 안했을경우 파라미터를 null로 주기위한 과정
        MovieEntity movie = null;
        if (mid != null) {
            movie = MovieEntity.builder().mid(Long.valueOf(mid)).build();
        }

        // 프론트단에서 극장을 선택 안했을경우 파라미터를 null로 주기위한 과정
        Long theater = null;
        if (tid != null) {
            theater = Long.valueOf(tid);
        }

        // 상영정보 테이블에서 조건에 맞는 상영정보의 날짜들 조회
        List<MovieInfoEntity> conditionDay = movieInfoRepository.findMovieInfoDay(movie, theater, null);

        // 상영정보 테이블에서 현재 예매가 가능한 상영정보의 날짜들 조회
        List<MovieInfoEntity> allDay = movieInfoRepository.findPossibleMovieInfoDay();

        // 검색한 상영정보 날짜 리턴
        return movieInfoMapper.toDtoTicketInfoDay(conditionDay, allDay);
    }

    // 예매 페이지에서 영화, 극장, 날짜를 모두 골랐을경우 상영정보를 불러오는 메소드
    @Transactional
    public List<MovieInfoDto> getScheduleMovieInfo(Map<String, String> requestMap) {
        // requestMap 안에 정보를 추출
        Date miday = Date.valueOf(requestMap.get("miday"));
        Long mid = Long.valueOf(requestMap.get("mid"));
        Long tid = Long.valueOf(requestMap.get("tid"));

        // 상영정보 조회에 필요한 정보 Entity로 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();
        TheaterEntity theater = TheaterEntity.builder().tid(tid).build();

        // 상영정보 조회
        List<MovieInfoEntity> movieInfos = movieInfoRepository.findSchedule(miday, movie, theater);

        return movieInfos.stream().map(movieInfo -> MovieInfoDto.builder()
                .miid(movieInfo.getMiid())
                .miday(movieInfo.getMiday())
                .mistarttime(movieInfo.getMistarttime())
                .miendtime(movieInfo.getMiendtime())
                .cid(movieInfo.getCinema().getCid())
                .cname(movieInfo.getCinema().getCname())
                .ctype(movieInfo.getCinema().getCtype())
                .cntSeatAll(movieInfo.getCinema().getCseat())
                .cntSeatInfo(movieInfo.getCntSeatInfo())
                .build()).collect(Collectors.toList());
    }

    // 조건에 맞는 상영정보의 상영날짜를 구하는 메소드(상영 시간표 페이지)
    @Transactional
    public List<MovieInfoDto> getMovieInfoDay(Map<String, String> requestMap) {
        // requestMap 데이터 추출 및 형변환
        String mid = requestMap.get("mid");
        String tarea = requestMap.get("tarea");
        String tid = requestMap.get("tid");

        // 프론트단에서 영화를 선택 안했을경우 파라미터를 null로 주기위한 과정
        MovieEntity movie = null;
        if (mid != null) {
            movie = MovieEntity.builder().mid(Long.valueOf(mid)).build();
        }

        // 프론트단에서 극장을 선택 안했을경우 파라미터를 null로 주기위한 과정
        Long theater = null;
        if (tid != null) {
            theater = Long.valueOf(tid);
        }

        // 프론트단에서 보낸 조건을 이용해서 상영정보 검색
        List<MovieInfoEntity> MovieInfos = movieInfoRepository.findMovieInfoDay(movie, theater, tarea);

        // 정보를 리턴
        return MovieInfos.stream().map(movieInfo -> MovieInfoDto.builder()
                .miday(movieInfo.getMiday()).build()).collect(Collectors.toList());
    }

    // 영화, 상영날짜, 지역을 이용하여 상영정보를 검색하는 메소드(상영시간표 페이지)
    @Transactional
    public List<TimeTableDto> getTimeTableByMovie(Map<String, String> requestMap) {
        // requestMap 데이터 추출 및 형변환
        String mid = requestMap.get("mid");
        String miday = requestMap.get("miday");
        String tarea = requestMap.get("tarea");

        // 상영정보 조회에 필요한 정보 Entity로 변환
        MovieEntity movie = MovieEntity.builder().mid(Long.valueOf(mid)).build();

        // 상영정보 검색
        List<MovieInfoEntity> MovieInfos = movieInfoRepository.findTimeTableMovieInfoByMovie(movie, Date.valueOf(miday), tarea);

        // 상영정보 리턴을 위한 극장이름 및 상영관번호 추출
        List<String> TheaterName = new ArrayList<>();
        List<Long> CinemaID = new ArrayList<>();

        for (MovieInfoEntity MI : MovieInfos) {
            if (!TheaterName.contains(MI.getCinema().getTheater().getTname())) {
                TheaterName.add(MI.getCinema().getTheater().getTname());
            }

            if (!CinemaID.contains(MI.getCinema().getCid())) {
                CinemaID.add(MI.getCinema().getCid());
            }
        }

        // 상영관별로 상영정보를 매핑
        List<CinemaDto> cinemaDtoList = cinemaMapper.MappingCinemaUseTheater(CinemaID, MovieInfos);

        // 극장별로 상영관 및 상영정보를 매핑
        return movieInfoMapper.MappingTimeTableByTheater(TheaterName, cinemaDtoList);
    }

    // 극장, 상영날짜를 이용하여 상영정보를 검색하는 메소드(상영시간표 페이지)
    @Transactional
    public List<TimeTableDto> getTimeTableByTheater(Map<String, String> requestMap) {
        // requestMap 데이터 추출 및 형변환
        String tid = requestMap.get("tid");
        String miday = requestMap.get("miday");

        // 상영정보 조회에 필요한 정보 Entity로 변환
        TheaterEntity theater = TheaterEntity.builder().tid(Long.valueOf(tid)).build();

        // 상영정보 검색
        List<MovieInfoEntity> MovieInfos = movieInfoRepository.findTimeTableMovieInfoByTheater(Date.valueOf(miday), theater);

        // 상영정보 리턴을 위한 영화번호 및 상영관번호 추출
        List<Long> MovieID = new ArrayList<>();
        List<Long> CinemaID = new ArrayList<>();
        long checkMovie = 0L;
        long checkCinema = 0L;

        for (MovieInfoEntity MI : MovieInfos) {
            if (!MovieID.contains(MI.getMovie().getMid())) {
                MovieID.add(MI.getMovie().getMid());
            }

            if (!(checkMovie == MI.getMovie().getMid()) || !(checkCinema == MI.getCinema().getCid())) {
                CinemaID.add(MI.getCinema().getCid());
                checkMovie = MI.getMovie().getMid();
                checkCinema = MI.getCinema().getCid();
            }
        }

        // 상영관별로 상영정보를 매핑
        List<CinemaDto> cinemaDtoList = cinemaMapper.MappingCinemaUseMovie(CinemaID, MovieInfos);

        // 영화별로 상영관 및 상영정보를 매핑
        return movieInfoMapper.MappingTimeTableByMovie(MovieID, cinemaDtoList);
    }
}