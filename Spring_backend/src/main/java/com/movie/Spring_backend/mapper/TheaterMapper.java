package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.TheaterEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component

public class TheaterMapper {
    // 예매페이지에서 필요한 영화관 내용들을 mapping 해주는 메소드
    public List<TheaterDto> toDtoTicketTheater(List<TheaterEntity> conditionTheater, List<TheaterEntity> allTheater) {

        // 사용될 변수들 초기화
        List<TheaterDto> Theaters = new ArrayList<>();
        List<Long> checkNum = new ArrayList<>();

        // 조건에 맞는 영화관 반복
        for (TheaterEntity t : conditionTheater) {
            // 영화관을 리턴할 TheaterDto 배열에 넣고 영화관 ID는 조건문을 위해 다른 배열에 삽입
            Theaters.add(TheaterDto.builder()
                    .tid(t.getTid())
                    .tarea(t.getTarea())
                    .tname(t.getTname())
                    .reserve(true).build());
            checkNum.add(t.getTid());
        }

        // 예매가 가능한 영화관 반복
        for (TheaterEntity t : allTheater) {
            // TheaterDto 배열에 들어가지 않은 영화관 삽입
            if (!checkNum.contains(t.getTid())) {
                Theaters.add(TheaterDto.builder()
                        .tid(t.getTid())
                        .tarea(t.getTarea())
                        .tname(t.getTname())
                        .reserve(false).build());
            }
        }
        return Theaters;
    }







    // 아래로 날리면 될듯
    public TheaterDto toDto(TheaterEntity entity) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return TheaterDto.builder().tid(entity.getTid()).tname(entity.getTname())
                .taddr(entity.getTaddr()).tarea(entity.getTarea())
                .build();
    }
    public TheaterDto toAble(TheaterEntity entity) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return TheaterDto.builder().tid(entity.getTid()).tname(entity.getTname())
                .taddr(entity.getTaddr()).tarea(entity.getTarea())
                .build();
    }
    public List<TheaterDto> toAble(List<TheaterEntity> entity) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return entity.stream().map((entitys)->TheaterDto.builder().tid(entitys.getTid()).tname(entitys.getTname())
                .taddr(entitys.getTaddr()).tarea(entitys.getTarea())
                .build()).collect(Collectors.toList());
    }

    public TheaterDto toDisable(TheaterEntity entity,int count) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return TheaterDto.builder().tid(entity.getTid()).tname(entity.getTname())
                .taddr(entity.getTaddr()).tarea(entity.getTarea())
                .count(count).build();
    }
}
