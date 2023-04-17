package com.movie.Spring_backend.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

@Entity
@Table(name="movie_seat")
@Getter
@NoArgsConstructor
public class SeatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sid;

    @Column(nullable = false, length = 20)
    private String sname;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cid")
    private CinemaEntity cinema;

    @Builder
    public SeatEntity(Long sid, String sname, CinemaEntity cinema) {
        this.sid = sid;
        this.sname = sname;
        this.cinema = cinema;
    }
}