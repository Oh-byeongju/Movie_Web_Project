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

    @Column
    private Integer blike;

    @Column
    private Integer bunlike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="bid")
    private BoardEntity board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="bcid")
    private BoardCommentEntity comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private MemberEntity member;

    @Formula("(select count(boardlike.blid) from board_like boardlike where boardlike.bcid = null)")
    private Integer likethis;


    @Builder
    public BoardLikeEntity(Long blid, Integer blike, Integer bunlike, BoardEntity board, BoardCommentEntity comment,
                           MemberEntity member,Integer likethis){
        this.blid=blid;
        this.blike=blike;
        this.bunlike=bunlike;
        this.board=board;
        this.comment=comment;
        this.member=member;
        this.likethis=likethis;

    }
}
