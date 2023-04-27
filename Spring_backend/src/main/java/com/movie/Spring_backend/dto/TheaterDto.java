package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class TheaterDto {

    private Long tid;
    private String tname;
    private String taddr;
    private String tarea;
    private Boolean reserve; // 예매 가능 여부

    // 얘는 내가한게 아닌데 날릴지 말지 프론트 해보고 결정
    private int count;

    private Integer cntCinema;

    @Builder
    public TheaterDto(Long tid, String tname, String taddr, String tarea, Boolean reserve, int count, Integer cntCinema) {
        this.tid = tid;
        this.tname = tname;
        this.taddr = taddr;
        this.tarea = tarea;
        this.reserve = reserve;
        this.count = count;
        this.cntCinema = cntCinema;
    }
}

