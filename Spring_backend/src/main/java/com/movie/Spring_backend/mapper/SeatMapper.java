package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.entity.SeatEntity;
import org.springframework.stereotype.Component;

@Component
public class SeatMapper {

    public SeatDto toAble(SeatEntity entity, String able) {
        // 예외처리
        if (entity == null) {
            return null;
        }
        return SeatDto.builder()
                .sid(entity.getSid())
                .sname(entity.getSname())
                .able(able).build();
    }
}
