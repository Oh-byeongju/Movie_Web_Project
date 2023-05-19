package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name= "board_like")
public class BoardLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blid;

    private boolean bllike;

    private boolean blunlike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="bid")
    private BoardEntity board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="bcid")
    private BoardCommentEntity boardcomment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private MemberEntity member;

    @Formula("(select count(boardlike.blid) from board_like boardlike where boardlike.bcid = null)")
    private Integer likethis;

    @Builder
    public BoardLikeEntity(Long blid, boolean bllike, boolean blunlike, BoardEntity board, BoardCommentEntity boardcomment,
                           MemberEntity member, Integer likethis) {
        this.blid = blid;
        this.bllike = bllike;
        this.blunlike = blunlike;
        this.board = board;
        this.boardcomment = boardcomment;
        this.member = member;
        this.likethis = likethis;
    }
}
