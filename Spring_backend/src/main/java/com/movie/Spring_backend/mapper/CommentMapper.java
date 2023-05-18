package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class CommentMapper {

    private Long bcid;

    private String bcdate;

    private String bccomment;


    private Long board;


    private String member;

    //계층형 구조를 위한 컬럼
    private Long parent;
    private Integer commentlike;

    private boolean likes;
    private boolean unlikes;
    List <CommentMapper> child = new ArrayList<>();
    @Builder
    public CommentMapper(Long bcid, String bcdate,String bccomment, Long board,
                              String member,Long parent,List <CommentMapper> child, Integer commentlike
    ,boolean likes, boolean unlikes) {
        this.bcid=bcid;
        this.bcdate = bcdate;
        this.bccomment=bccomment;
        this.board=board;
        this.member=member;
        this.parent=parent;
        this.child=child;
        this.commentlike=commentlike;
        this.likes=likes;
        this.unlikes=unlikes;

    }


    public CommentMapper(BoardCommentEntity com, boolean likes,boolean unlikes) {
        this.bcid=com.getBcid();
        this.bcdate = com.getBcdate();
        this.bccomment=com.getBccomment();
        this.board=com.getBoard().getBid();
        this.member=com.getMember().getUid();
        // 이거 아래 임시로 해둠
        this.parent = 0L;
        this.commentlike=com.getCommentlike();
        this.likes=likes;
        this.unlikes=unlikes;

    }
}
