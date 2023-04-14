package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.MemberEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class BoardDto {


    private Long bid;

    private String btitle;

    private String bdetail;

    private String bdate;

    private String bcategory;
    private Integer bclickindex;

    private Integer blike;

    private Integer bunlike;

    private MemberEntity member;

    private String uid;

    private Integer commentcount;

    private String thumb;

    private boolean likes;
    private boolean unlikes;


    @Builder //클래스 레벨에 붙이거나 생성자에 붙여주면 파라미터를 활용하여 빌더 패턴을 자동으로 생성해준다
    public BoardDto(Long bid, String btitle, String bdetail, String bdate, String bcategory,Integer bclickindex, Integer blike, Integer bunlike,
                    Integer commentcount,MemberEntity member,String uid,boolean likes,boolean unlikes,String thumb) {
        this.bid=bid;
        this.btitle=btitle;
        this.bdetail=bdetail;
        this.bdate=bdate;
        this.bcategory=bcategory;
        this.bclickindex=bclickindex;
        this.blike=blike;
        this.bunlike=bunlike;
        this.commentcount=commentcount;
        this.member=member;
        this.uid=uid;
        this.likes=likes;
        this.unlikes=unlikes;
        this.thumb=thumb;
    }
}
