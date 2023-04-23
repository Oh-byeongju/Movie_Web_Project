package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.mapper.MovieInfoMapper;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.MovieRepository;
import com.movie.Spring_backend.util.DeduplicationUtil;
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
    private final MovieRepository movieRepository;
    private final MovieInfoMapper movieInfoMapper;
    private final MovieMapper movieMapper;

    // 조건에 맞는 상영정보의 상영날짜를 구하는 메소드
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

        // 검색된 상영정보에 날짜 중복제거
        HashSet<Date> Dates = new HashSet<>();
        for (MovieInfoEntity MI : MovieInfos) {
            Dates.add(MI.getMiday());
        }

        // List로 변환 후 정렬(오름차순)
        List<Date> result = new ArrayList<>(Dates);
        Collections.sort(result);

        return result.stream().map(date -> MovieInfoDto.builder().miday(date).build()).collect(Collectors.toList());
    }











    @Transactional
    public List<MovieInfoDto> findAllMiday() {
        List<MovieInfoEntity> datas = movieInfoRepository.findAll();
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());
    }

    //영화로 날짜 검색
    @Transactional
    public List<MovieInfoDto> findByMovieToDay(Long id) {
        //외래키로 엔티티 검색 위해 매핑

        List<MovieInfoEntity> datas = movieInfoRepository.findByMovieToDay(id);

        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());

    }

    //극장으로 영화를 검색하는 메소드
    @Transactional
    public List<MovieDto> findByTheater(Long id) {
        List<MovieEntity> able = movieRepository.MovieToTheater(id);
        //여기서 able 에 전체 in 데이터가 넘어감
        List<MovieEntity> DisAble = movieRepository.MovieToTheaterDis(id);

        //able dto mapping
        List<MovieDto> AbleDto= able.stream().map((movie->movieMapper.toAble(movie))).collect(Collectors.toList());
        //NOTIN cid 구하고

        //disable dto mapping

        List<MovieDto> DisAbleDto= DisAble.stream().map((movie->movieMapper.toDisable(movie))).collect(Collectors.toList());

        for(MovieDto mm : DisAbleDto){
            AbleDto.add(mm);
        }

        //mid 검색을 통해 무비 조회
        return AbleDto;
    }

    //극장으로 날짜 검색하는 메소드
    @Transactional
    public List<MovieInfoDto> findByCinemaCidIn(Long tid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findByCinemaCidIn(tid);
        if (!datas.isEmpty()) {
            List<MovieInfoDto> datad = datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());
            List <MovieInfoDto> dedupication = DeduplicationUtil.deduplication(datad,MovieInfoDto::getMiday);

            return dedupication;
        } else {
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }
    //날짜로 영화를  검색하는 메소드
    @Transactional
    public List<MovieDto> findByMovieableDisable(Date miday){

        List<MovieEntity> able = movieRepository.findByMidInAble(miday);
        //여기서 able 에 전체 in 데이터가 넘어감
        //able dto mapping
        List<MovieDto> AbleDto= able.stream().map((movie->movieMapper.toAble(movie))).collect(Collectors.toList());
        //NOTIN cid 구하고
        List<MovieEntity> disable = movieRepository.findByMidInDisAble(miday);
        //disable dto mapping
        List<MovieDto> DisAbleDto= disable.stream().map((movie->movieMapper.toDisable(movie))).collect(Collectors.toList());

        for(MovieDto mm : DisAbleDto){
            AbleDto.add(mm);
        }
        //객체로 중복제거하면 끝
        List <MovieDto> dedupication = DeduplicationUtil.deduplication(AbleDto,MovieDto::getMid);

        //mid 검색을 통해 무비 조회
        return dedupication;
    }

    //날짜와 극장으로 영화를 검색하는 메소드
    @Transactional
    public List<MovieDto> DayTheaterToMovie(Date miday,Long tid){

        List<MovieEntity> able = movieRepository.findByDayTheaterToMovie(miday,tid);
        //여기서 able 에 전체 in 데이터가 넘어감
        //able dto mapping
        List<MovieDto> AbleDto= able.stream().map((movie->movieMapper.toAble(movie))).collect(Collectors.toList());
        //NOTIN cid 구하고
        List<MovieEntity> disable = movieRepository.findByDayTheaterToMovieDis(miday,tid);
        //disable dto mapping
        List<MovieDto> DisAbleDto= disable.stream().map((movie->movieMapper.toDisable(movie))).collect(Collectors.toList());

        for(MovieDto mm : DisAbleDto){
            AbleDto.add(mm);
        }
        //객체로 중복제거하면 끝
        List <MovieDto> dedupication = DeduplicationUtil.deduplication(AbleDto,MovieDto::getMid);

        //mid 검색을 통해 무비 조회
        return dedupication;
    }


    //극장과 영화로 데이터 추출
    @Transactional
    public List<MovieInfoDto> findByMovieTheaterDay(Long tid, Long mid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findByCinemaCidInAndMovieMid(mid, tid);
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());

    }



    @Transactional
    public List<MovieInfoDto> findBySchedule(Date miday, Long mid, Long tid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findBySchedule(miday, mid, tid);

        return datas.stream().map(data -> movieInfoMapper.CountDto(data, data.getCinema().getCid(), data.getCinema().getCname(), data.getCinema().getCtype(), data.getCntSeatInfo(), data.getCinema().getCseat())).collect(Collectors.toList());

    }
}