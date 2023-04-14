package com.movie.Spring_backend.mapper;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ScheduleMapper {



    String theater;
    Long mid;
    Integer time;
    String rating;
    String image;
    List<InfoMapper>infoMapper;

    @Builder
    public ScheduleMapper( String theater,
    List<InfoMapper>infoMapper)
    {
        this.theater=theater;
        this.infoMapper=infoMapper;
    }

    @Builder
    public ScheduleMapper( String theater,Long mid,Integer time, String rating,String image,
                           List<InfoMapper>infoMapper)
    {
        this.theater=theater;
        this.mid=mid;
        this.time=time;
        this.rating=rating;
        this.image=image;
        this.infoMapper=infoMapper;
    }
}
