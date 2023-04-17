package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.*;

@Getter
@NoArgsConstructor
public class CinemaDto {

    private Long cid;
    private String cname;
    private String ctype;
    private Integer cseat;
    private TheaterEntity theater;
    private String tname;

    private Long tid;

    @Builder
    public CinemaDto(Long cid, String cname, String ctype, Integer cseat, TheaterEntity theater, String tname, Long tid) {
        this.cid = cid;
        this.cname = cname;
        this.ctype = ctype;
        this.cseat = cseat;
        this.theater = theater;
        this.tname = tname;
        this.tid = tid;
    }
}






