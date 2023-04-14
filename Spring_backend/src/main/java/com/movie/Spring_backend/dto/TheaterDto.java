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
    private String able;
    private int count;

    @Builder
    public TheaterDto(Long tid, String tname, String taddr, String tarea, String able, int count) {
        this.tid=tid;
        this.tname=tname;
        this.taddr=taddr;
        this.tarea=tarea;
        this.able=able;
        this.count=count;
    }


}

