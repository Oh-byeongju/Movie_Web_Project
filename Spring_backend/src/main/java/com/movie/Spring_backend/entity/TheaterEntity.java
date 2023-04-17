package com.movie.Spring_backend.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.Formula;

@Entity
@Table(name="movie_theater")
@Getter
@NoArgsConstructor
public class TheaterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tid;

    @Column(nullable = false, length = 30)
    private String tname;

    @Column(nullable = false, length = 50)
    private String taddr;

    @Column(nullable = false, length = 30)
    private String tarea;

    // 현재 영화관에 있는 상영관 개수
    @Formula("(SELECT COUNT(*) FROM movie_cinema mc WHERE mc.tid = tid)")
    private Integer cntCinema;

    @Builder
    public TheaterEntity(Long tid ,String tname, String taddr, String tarea, Integer cntCinema) {
        this.tid = tid;
        this.tname = tname;
        this.taddr = taddr;
        this.tarea = tarea;
        this.cntCinema = cntCinema;
    }
}