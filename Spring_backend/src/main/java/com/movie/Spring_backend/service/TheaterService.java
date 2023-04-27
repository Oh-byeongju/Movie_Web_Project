package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.util.DeduplicationUtil;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.mapper.TheaterMapper;
import com.movie.Spring_backend.repository.TheaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterRepository theaterRepository;
    private final TheaterMapper theaterMapper;

    // 예매가 가능한 영화관 조회하는 메소드
    @Transactional
    public List<TheaterDto> getPossibleTheater() {
        List<TheaterEntity> Theaters = theaterRepository.findPossibleTheater();

        return Theaters.stream().map(theater -> TheaterDto.builder()
                .tid(theater.getTid())
                .tname(theater.getTname())
                .tarea(theater.getTarea()).build()).collect(Collectors.toList());
    }

    // 예매 페이지에서 조건에 맞는 영화관을 가져오는 메소드
    public List<TheaterDto> getTicketTheater(Map<String, String> requestMap) {
        // requestMap 안에 정보를 추출
        String miday = requestMap.get("miday");
        String mid = requestMap.get("mid");

        // 프론트단에서 날짜를 선택 안했을경우 파라미터를 null로 주기위한 과정
        Date day = null;
        if (miday != null) {
            day = java.sql.Date.valueOf(miday);
        }

        // 프론트단에서 영화를 선택 안했을경우 파라미터를 null로 주기위한 과정
        MovieEntity movie = null;
        if (mid != null) {
            movie = MovieEntity.builder().mid(Long.valueOf(mid)).build();
        }

        // 영화관 테이블에서 조건에 맞는 영화관들 조회
        List<TheaterEntity> conditionTheater = theaterRepository.findTheaterOnTicket(day, movie);

        // 영화관 테이블에서 현재 예매가 가능한 영화관들 조회
        List<TheaterEntity> allTheater = theaterRepository.findPossibleTheater();

        // 검색한 영화관 목록 리턴
        return theaterMapper.toDtoTicketTheater(conditionTheater, allTheater);
    }






    // 아래로 수정
    @Transactional
    public List<TheaterDto> getInfo() {
        List<TheaterEntity> datas = theaterRepository.findAll();
        return datas.stream()
                .map(data -> theaterMapper.toDto(data)).collect(Collectors.toList());
    }








    //영화로 극장 검색하는 메소드

    @Transactional
    public List<TheaterDto> findByTidIn(Long id) {
        int count;
        List<TheaterEntity> datasIn = theaterRepository.findByTidIn(id);
        List<TheaterEntity> datasNotIn = theaterRepository.findByTidNotIn(id);

        //in한것들 불러와서 매핑
        List<TheaterDto> DtoIn = datasIn.stream().map(data -> theaterMapper.toAble(data)).collect(Collectors.toList());
        List<TheaterDto> forCount = new ArrayList<>();

        count = (int) IntStream.range(0, DtoIn.toArray().length).count();
        //NOT IN 한것들 매핑
        List<TheaterDto> DtoNotIn = datasNotIn.stream().map(data -> theaterMapper.toDisable(data, count)).collect(Collectors.toList());

        for (TheaterDto tt : DtoNotIn) {
            DtoIn.add(tt);
        }
        //IN에 NOT iN 넣기
        //중복제거
        List<TheaterDto> dedupication = DeduplicationUtil.deduplication(DtoIn, TheaterDto::getTname);
        return dedupication;
    }

    //날짜로 극장을 검색하는 메소드
    @Transactional
    public List<TheaterDto> findDayToTheater(Date miday) {
        int count;
        List<TheaterEntity> datasIn = theaterRepository.findDayToTheaterAble(miday);
        List<TheaterEntity> datasNotIn = theaterRepository.findDayToTheaterDisAble(miday);

        //in한것들 불러와서 매핑
        List<TheaterDto> DtoIn = datasIn.stream().map(data -> theaterMapper.toAble(data)).collect(Collectors.toList());
        List<TheaterDto> forCount = new ArrayList<>();

        count = (int) IntStream.range(0, DtoIn.toArray().length).count();
        //NOT IN 한것들 매핑
        List<TheaterDto> DtoNotIn = datasNotIn.stream().map(data -> theaterMapper.toDisable(data, count)).collect(Collectors.toList());

        for (TheaterDto tt : DtoNotIn) {
            DtoIn.add(tt);
        }
        //IN에 NOT iN 넣기
        //중복제거
        List<TheaterDto> dedupication = DeduplicationUtil.deduplication(DtoIn, TheaterDto::getTname);
        return dedupication;
    }

    //날짜와 영화로 극장을 검색하는 메소드
    //수정
    @Transactional
    public List<TheaterDto> findDayMovieToTheater(Date miday, Long mid) {
        int count;
        List<TheaterEntity> datasIn = theaterRepository.DayMovieToTheater(miday, mid);
        List<TheaterEntity> datasNotIn = theaterRepository.DayMovieToTheaterDis(miday, mid);

        //in한것들 불러와서 매핑
        List<TheaterDto> DtoIn = datasIn.stream().map(data -> theaterMapper.toAble(data)).collect(Collectors.toList());

        count = (int) IntStream.range(0, DtoIn.toArray().length).count();
        //NOT IN 한것들 매핑
        List<TheaterDto> DtoNotIn = datasNotIn.stream().map(data -> theaterMapper.toDisable(data, count)).collect(Collectors.toList());

        for (TheaterDto tt : DtoNotIn) {
            DtoIn.add(tt);
        }
        //IN에 NOT iN 넣기
        //중복제거
        List<TheaterDto> dedupication = DeduplicationUtil.deduplication(DtoIn, TheaterDto::getTname);
        return dedupication;
    }








}