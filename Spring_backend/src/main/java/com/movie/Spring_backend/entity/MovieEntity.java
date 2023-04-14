/*
  23-02-06 MovieEntity 좋아요, 평점 추출을 위한 수정(오병주)
 */
package com.movie.Spring_backend.entity;
import javax.persistence.*;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import java.sql.Date;

@Table(name="movie")
@Entity
@Getter
@NoArgsConstructor
@DynamicUpdate      //더티 체킹
public class MovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mid;

    @Column(nullable = false,length = 30)
    private String mtitle;

    @Column(nullable = false, length = 30)
    private String mdir;

    @Column(nullable = false, length = 30)
    private String mgenre;

    @Column(nullable = false)
    private int mtime;

    @Column(nullable = false, length = 30)
    private Date mdate;

    @Column(nullable = false, length = 30)
    private String mrating;

    @Column(nullable = false, length = 30)
    private String mstory;

    @Column(nullable = false, length = 50)
    private String mimagepath;

    // 좋아요 개수 추출
    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(*) from movie_member mm where mm.umlike = true and mm.mid = mid)")
    private Integer cntMovieLike;

    // 평점 추출
    @Basic(fetch = FetchType.LAZY)
    @Formula("(select avg(mm.umscore) from movie_member mm where mm.mid = mid)")
    private Float avgScore; // 평점의 평균

    // 영화의 예매기록 갯수 (예매 취소 제외)
    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(*) from movie_reservation mr where mr.rstate = 1 and mr.miid in " +
             "(select mi.miid from movie_information mi where mi.mid = mid))")
    private Integer cntReserve;

    @Builder
    public MovieEntity(Long mid, String mtitle, String mdir, String mgenre, int mtime, Date mdate, String mrating,
                       String mstory, String mimagepath, Integer cntMovieLike, Float avgScore, Integer cntReserve) {
        this.mid = mid;
        this.mtitle = mtitle;
        this.mdir = mdir;
        this.mgenre = mgenre;
        this.mtime = mtime;
        this.mdate = mdate;
        this.mrating = mrating;
        this.mstory = mstory;
        this.mimagepath = mimagepath;
        this.cntMovieLike = cntMovieLike;
        this.avgScore = avgScore;
        this.cntReserve = cntReserve;
    }

    public void updateMovie(Long mid, String mtitle, String mdir, String mgenre, int mtime, Date mdate, String mrating,
                            String mstory, String mimagepath){
        this.mid = mid;
        this.mtitle = mtitle;
        this.mdir = mdir;
        this.mgenre = mgenre;
        this.mtime = mtime;
        this.mdate = mdate;
        this.mrating = mrating;
        this.mstory = mstory;
        this.mimagepath = mimagepath;
    }
}

