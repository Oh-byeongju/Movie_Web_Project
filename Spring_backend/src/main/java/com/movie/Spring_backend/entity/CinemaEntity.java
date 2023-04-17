package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "movie_cinema")
public class CinemaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cid;

    @Column(nullable = false)
    private String cname;

    @Column(nullable = false)
    private String ctype;

    @Column(nullable = false)
    private Integer cseat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="tid")
    private TheaterEntity theater;
    
    @Builder
    public CinemaEntity(Long cid, String cname, String ctype, Integer cseat ,TheaterEntity theater) {
        this.cid = cid;
        this.cname = cname;
        this.ctype = ctype;
        this.cseat = cseat;
        this.theater = theater;
    }
}

