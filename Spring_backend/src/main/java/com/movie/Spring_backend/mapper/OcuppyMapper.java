package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.MovieInfoSeatDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@NoArgsConstructor
public class OcuppyMapper {
    private Long miid;
    private Long seatid;
    private List<MovieInfoSeatDto> infoseat;
    private List<OcuppyMapper> ocuppyseat;
    @Builder
    public OcuppyMapper(Long miid, Long seatid) {
        this.miid=miid;
        this.seatid=seatid;
    }

}
