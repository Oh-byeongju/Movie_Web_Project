package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.repository.CinemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;

    @Transactional
    public List<Long> findByTheaterday(Long id) {
        //외래키 검색을 위해 엔티티 매핑
        TheaterEntity theaterEntity = TheaterEntity.builder().tid(id).build();

        //위에서 매핑한 theater엔티티를 이용해서 cinema에서 cid 추출하기
        List<CinemaEntity> datas = cinemaRepository.findByTheater(theaterEntity);
        List<Long> mappedcid = new ArrayList<>();
        //cid 추출
        for (CinemaEntity cc : datas) {
            mappedcid.add(cc.getCid());
        }
        return mappedcid;
    }

    @Transactional
    public List<CinemaDto> findall(){

        List<CinemaEntity> datas = cinemaRepository.findAll();

        return datas.stream().map((data)->
                CinemaDto.builder().cid(data.getCid()).cname(data.getCname()).ctype(data.getCtype()).cseat(data.getCseat())
                        .tname(data.getTheater().getTname()).tid(data.getTheater().getTid()).build()).collect(Collectors.toList());
    }
}

