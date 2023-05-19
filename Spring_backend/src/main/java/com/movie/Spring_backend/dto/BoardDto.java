package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@NoArgsConstructor
public class BoardDto {
    private Long bid;
    private String btitle;
    private String bdetail;
    private Date bdate;
    private Integer bclickindex;
    private String bcategory;
    private String bthumbnail;
    private String uid;
    private Integer likes;
    private Integer unlikes;
    private Integer commentcount;
    private boolean blike;
    private boolean bunlike;

    @Builder
    public BoardDto(Long bid, String btitle, String bdetail, Date bdate, Integer bclickindex, String bcategory, String bthumbnail,
                    String uid, Integer likes, Integer unlikes, Integer commentcount, boolean blike, boolean bunlike) {
        this.bid = bid;
        this.btitle = btitle;
        this.bdetail = bdetail;
        this.bdate = bdate;
        this.bclickindex = bclickindex;
        this.bcategory = bcategory;
        this.bthumbnail = bthumbnail;
        this.uid = uid;
        this.likes = likes;
        this.unlikes = unlikes;
        this.commentcount = commentcount;
        this.blike = blike;
        this.bunlike = bunlike;
    }
}
