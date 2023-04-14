package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name="movie_infoseat")
@Entity
@Getter
@NoArgsConstructor
public class MovieInfoSeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long misid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sid") //조인할 컬럼 이름
    private SeatEntity seat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="miid") //조인할 컬럼 이름
    private MovieInfoEntity info;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="rid") //조인할 컬럼 이름
    private ReservationEntity reserve;

    @Builder
    public MovieInfoSeatEntity(Long misid, SeatEntity seat, MovieInfoEntity info, ReservationEntity reserve) {
        this.misid= misid;
        this.seat=seat;
        this.info=info;
        this.reserve=reserve;
    }

}
