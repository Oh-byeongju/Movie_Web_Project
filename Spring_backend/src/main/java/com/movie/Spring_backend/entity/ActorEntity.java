package com.movie.Spring_backend.entity;

import lombok.*;
import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "actor")
public class ActorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aid;

    @Column(nullable = false)
    private String aname;

    @Column(nullable = false, length = 20)
    private String abirthplace;

    @Builder
    public ActorEntity(Long aid, String aname, String abirthplace) {
        this.aid = aid;
        this.aname = aname;
        this.abirthplace = abirthplace;
    }
}
