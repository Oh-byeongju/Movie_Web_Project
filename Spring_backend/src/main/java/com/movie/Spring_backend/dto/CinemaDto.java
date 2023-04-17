package com.movie.Spring_backend.dto;

import lombok.*;

@Getter
@NoArgsConstructor
public class CinemaDto {
    private Long cid;
    private String cname;
    private String ctype;
    private Integer cseat;
    private Long tid;
    private String tname;
    private Integer cntMovieInfo;

    @Builder
    public CinemaDto(Long cid, String cname, String ctype, Integer cseat, Long tid, String tname, Integer cntMovieInfo) {
        this.cid = cid;
        this.cname = cname;
        this.ctype = ctype;
        this.cseat = cseat;
        this.tid = tid;
        this.tname = tname;
        this.cntMovieInfo = cntMovieInfo;
    }
}






