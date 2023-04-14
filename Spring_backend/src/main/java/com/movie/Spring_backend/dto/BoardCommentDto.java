package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
public class BoardCommentDto  {
    private Long bcid;

    private String bcdate;

    private String bccomment;

    private BoardEntity board;

    private MemberEntity member;
    private String uid;
    private Long bid;
    private Long parent;
    private Integer commentcount;
    private Integer commentlike;
    private Integer commentUnlike;
    private boolean likes;
    private boolean unlikes;


    @Builder
    public BoardCommentDto(Long bcid, String bcdate,String bccomment, BoardEntity board,Long bid,
                              MemberEntity member, String uid, Long parent,
                           Integer commentcount,Integer commentlike,Integer commentUnlike,boolean likes,
                           boolean unlikes

) {
        this.bcid=bcid;
        this.bcdate = bcdate;
        this.bccomment=bccomment;
        this.board=board;
        this.member=member;
        this.bid=bid;
        this.uid=uid;
        this.parent=parent;
        this.commentcount=commentcount;
        this.commentlike=commentlike;
        this.commentUnlike=commentUnlike;
        this.likes=likes;
        this.unlikes=unlikes;
    }


    @Builder
    public BoardCommentDto(BoardCommentEntity com) {
        this.bcid=com.getBcid();
        this.bcdate = com.getBcdate();
        this.bccomment=com.getBccomment();
        this.bid=com.getBoard().getBid();
        this.uid=com.getMember().getUid();
        this.parent=com.getParent();
        this.commentcount=com.getCommentcount();
    }
}
