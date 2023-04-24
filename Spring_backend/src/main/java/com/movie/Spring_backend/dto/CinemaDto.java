package com.movie.Spring_backend.dto;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
public class CinemaDto {
    private Long cid;
    private String cname;
    private String ctype;
    private Integer cseat;
    private Long tid;
    private String tname;
    private Long mid;
    private String mtitle;
    private Integer mtime;
    private String mrating;
    private Integer cntMovieInfo;
    private List<MovieInfoDto> movieInfoDtoList;

    @Builder
    public CinemaDto(Long cid, String cname, String ctype, Integer cseat, Long tid, String tname, Long mid, String mtitle,
                     Integer mtime, String mrating, Integer cntMovieInfo, List<MovieInfoDto> movieInfoDtoList) {
        this.cid = cid;
        this.cname = cname;
        this.ctype = ctype;
        this.cseat = cseat;
        this.tid = tid;
        this.tname = tname;
        this.mid = mid;
        this.mtitle = mtitle;
        this.mtime = mtime;
        this.mrating = mrating;
        this.cntMovieInfo = cntMovieInfo;
        this.movieInfoDtoList = movieInfoDtoList;
    }
}






