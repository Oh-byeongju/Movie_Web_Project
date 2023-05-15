package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "board")
@DynamicUpdate      //더티 체킹
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bid;

    @Column(nullable = false)
    private String btitle;

    @Column(nullable = false)
    private String bdetail;

    @Column(nullable = false)
    private Date bdate;

    private Integer bclickindex;

    @Column(nullable = false)
    private String bcategory;

    private String bthumbnail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private MemberEntity member;

    // 이게 blike 되야할듯
    @Formula("(select count(boardlike.blid) from board_like boardlike where boardlike.bid = bid and boardlike.bllike = true " +
            "and boardlike.bcid is null)")
    private Integer like;

    @Formula("(select count(boardlike.blid) from board_like boardlike where boardlike.bid = bid and boardlike.blunlike = true " +
            "and boardlike.bcid is null)")
    private Integer bunlike;

    @Formula("(select count(comment.bcid) from board_comment comment where comment.bid = bid)")
    private Integer commentcount;

    @OneToMany(mappedBy = "board",
            fetch = FetchType.LAZY,
            cascade = CascadeType.REMOVE)
    private List<BoardCommentEntity> comment = new ArrayList<>();

    @OneToMany(mappedBy = "board",
            fetch = FetchType.LAZY,
            cascade = CascadeType.REMOVE)
    private List<BoardLikeEntity> likes = new ArrayList<>();

    @Builder
    public BoardEntity(Long bid, String btitle, String bdetail, Date bdate, Integer bclickindex, String bcategory,
                       String bthumbnail, MemberEntity member, Integer like, Integer bunlike, Integer commentcount,
                       List<BoardCommentEntity> comment, List<BoardLikeEntity> likes) {
        this.bid = bid;
        this.btitle = btitle;
        this.bdetail = bdetail;
        this.bdate = bdate;
        this.bclickindex = bclickindex;
        this.bcategory = bcategory;
        this.bthumbnail = bthumbnail;
        this.member = member;
        this.like = like;
        this.bunlike = bunlike;
        this.commentcount = commentcount;
        this.comment = comment;
        this.likes = likes;
    }

    public void updateBoard(Long bid, String btitle, String bdetail, Date bdate, String bcategory, String bthumbnail){
        this.bid=bid;
        this.btitle=btitle;
        this.bdetail=bdetail;
        this.bdate=bdate;
        this.bcategory=bcategory;
        this.bthumbnail = bthumbnail;
    }
}
