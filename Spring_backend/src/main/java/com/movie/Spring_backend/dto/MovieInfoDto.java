package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@NoArgsConstructor
public class MovieInfoDto {

    private Long miid;

    private Date miday;
    private String mistarttime;

    private String miendtime;

    private MovieEntity movie;

    private CinemaEntity cinema;

    private Long cid;
    private String type;
    private String name;
    private Integer allcount; //전체 좌석
    private Integer count;   // 점유 좌석
    private String area;
    private String title;
    private Long mid;

    private Long tid;
    private Integer time;
    private String rating;
    private String image;


    private String mtitle;
    private String tarea;
    private String tname;
    private String cname;
    private Date mdate;

    @Builder
    public MovieInfoDto(Long miid, Date miday, String mistarttime, String miendtime, MovieEntity movie, CinemaEntity cinema,
                        Long cid,  String name,      String type,  Integer allcount,  Integer count ,String area,String title,Long mid,
                        Long tid,Integer time,String rating,String image, String mtitle, String tarea, String tname, String cname, Date mdate) {
        this.miid= miid;
        this.miday=miday;
        this.mistarttime=mistarttime;
        this.miendtime=miendtime;
        this.movie=movie;
        this.cinema=cinema;
        this.cid=cid;
        this.name=name;
        this.type=type;
        this.allcount=allcount;
        this.count=count;
        this.area=area;
        this.title=title;
        this.mid=mid;
        this.tid=tid;
        this.time=time;
        this.rating=rating;
        this.image=image;
        this.mtitle = mtitle;
        this.tarea = tarea;
        this.mdate = mdate;



        this.tname = tname;
        this.cname = cname;
    }


}
