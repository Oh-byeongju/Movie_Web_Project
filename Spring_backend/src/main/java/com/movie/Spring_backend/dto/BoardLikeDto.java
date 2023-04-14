package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import lombok.Builder;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class BoardLikeDto {
    private Long blid;

    private Integer blike;

    private Integer bunlike;

    private BoardEntity board;


    private BoardCommentEntity comment;


    private MemberEntity member;

    @Builder
    public BoardLikeDto(Long blid, Integer blike, Integer bunlike, BoardEntity board, BoardCommentEntity comment,
                           MemberEntity member){
        this.blid=blid;
        this.blike=blike;
        this.bunlike=bunlike;
        this.board=board;
        this.comment=comment;
        this.member=member;

    }
}
