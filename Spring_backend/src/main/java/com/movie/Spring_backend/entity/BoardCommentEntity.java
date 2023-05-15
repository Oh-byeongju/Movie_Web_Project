package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "board_comment")
public class BoardCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bcid;

    @Column(nullable = false)
    private String bccomment;

    @Column(nullable = false)
    private String bcdate;

    // 계층형 구조를 위한 컬럼
    private Integer bcparent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="bid")
    private BoardEntity board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private MemberEntity member;

    @Formula("(select count(comment.bcid) from board_comment comment where comment.bid = bid)")
    private Integer commentcount;

    @Formula("(select count(boardlike.blid) from board_like boardlike where boardlike.bid= bid and boardlike.bcid = bcid " +
            "and boardlike.bllike = true)")
    private Integer commentlike;

    @Formula("(select count(boardlike.blid) from board_like boardlike where boardlike.bid= bid and boardlike.bcid = bcid " +
            "and boardlike.blunlike = true)")
    private Integer commentUnlike;

    @OneToMany(mappedBy = "comment",
            fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardLikeEntity> likes = new ArrayList<>();

    @Builder
    public BoardCommentEntity(Long bcid, String bccomment, String bcdate, Integer bcparent, BoardEntity board, MemberEntity member,
                              Integer commentcount, Integer commentlike, Integer commentUnlike, List<BoardLikeEntity> likes) {
        this.bcid = bcid;
        this.bccomment = bccomment;
        this.bcdate = bcdate;
        this.bcparent = bcparent;
        this.board = board;
        this.member = member;
        this.commentcount = commentcount;
        this.commentlike = commentlike;
        this.commentUnlike = commentUnlike;
        this.likes = likes;
    }
}
