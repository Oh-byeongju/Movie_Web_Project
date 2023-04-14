package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import lombok.Builder;

import java.util.List;

public class ChildMapper {

    private Long bcid;

    private String bcdate;

    private String bccomment;

    private Long board;

    private String member;

    private Long parent;

    @Builder
    public ChildMapper(Long bcid, String bcdate, String bccomment, Long board,
                       String member, Long parent ) {
        this.bcid=bcid;
        this.bcdate = bcdate;
        this.bccomment=bccomment;
        this.board=board;
        this.member=member;
        this.parent=parent;
    }
}
