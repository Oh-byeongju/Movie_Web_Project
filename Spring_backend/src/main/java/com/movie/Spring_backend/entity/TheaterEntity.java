package com.movie.Spring_backend.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

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

    @Builder
    public TheaterEntity(Long tid ,String tname, String taddr, String tarea) {
        this.tid=tid;
        this.tname=tname;
        this.taddr=taddr;
        this.tarea= tarea;
    }
}