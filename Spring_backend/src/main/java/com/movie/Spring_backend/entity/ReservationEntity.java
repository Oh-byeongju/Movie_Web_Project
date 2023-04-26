package com.movie.Spring_backend.entity;
import javax.persistence.*;

import lombok.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="movie_reservation")
@Getter
@NoArgsConstructor
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rid;

    private String rdate;

    private Integer rprice;

    private String rpeople;

    // 티켓 매수
    private Integer rticket;

    private String rpayid;

    private String rpaytype;

    // 예매 취소 확인용(true -> 예매한 것, false -> 취소한 것)
    private Boolean rstate;

    private String rcanceldate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="miid")
    private MovieInfoEntity movieInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private MemberEntity member;

    // 일대다 관계 매핑
    @OneToMany(mappedBy = "reserve",
            fetch = FetchType.LAZY,
            cascade = CascadeType.REMOVE)
    private List<MovieInfoSeatEntity> infoSeats = new ArrayList<>();

    @Builder
    public ReservationEntity(Long rid, String rdate, Integer rprice, String rpeople, Integer rticket, String rpayid,
                             String rpaytype, Boolean rstate, String rcanceldate, MovieInfoEntity movieInfo,
                             MemberEntity member, List<MovieInfoSeatEntity> infoSeats) {
        this.rid = rid;
        this.rdate = rdate;
        this.rprice = rprice;
        this.rpeople = rpeople;
        this.rticket = rticket;
        this.rpayid = rpayid;
        this.rpaytype = rpaytype;
        this.rstate = rstate;
        this.rcanceldate = rcanceldate;
        this.movieInfo = movieInfo;
        this.member = member;
        this.infoSeats = infoSeats;
    }
}