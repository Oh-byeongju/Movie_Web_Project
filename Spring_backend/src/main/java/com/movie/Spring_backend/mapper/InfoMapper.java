package com.movie.Spring_backend.mapper;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
public class InfoMapper {
    Long cid;
    Integer people;
    String type;
    String area;
    String name;
    Long tid;
    private List<Map<String, Object>> history;
    @Builder
    public InfoMapper(Long cid,
    Integer people,
    String type, String area,String name,Long tid,
                      List<Map<String, Object>> history ) {
        this.cid=cid;
        this.people=people;
        this.type=type;
        this.area=area;
        this.name=name;
        this.tid=tid;
        this.history=history;
    }

}
