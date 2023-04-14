package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.TheaterEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component

public class TheaterMapper {


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
                .able("able").build();
    }
    public List<TheaterDto> toAble(List<TheaterEntity> entity) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return entity.stream().map((entitys)->TheaterDto.builder().tid(entitys.getTid()).tname(entitys.getTname())
                .taddr(entitys.getTaddr()).tarea(entitys.getTarea())
                .able("able").build()).collect(Collectors.toList());
    }

    public TheaterDto toDisable(TheaterEntity entity,int count) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return TheaterDto.builder().tid(entity.getTid()).tname(entity.getTname())
                .taddr(entity.getTaddr()).tarea(entity.getTarea())
                .able("disable").count(count).build();
    }
}
