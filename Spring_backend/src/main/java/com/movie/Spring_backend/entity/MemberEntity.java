//23-01-09 ~ 23-01-10 id 중복 확인 및 mysql 점검(오병주)
package com.movie.Spring_backend.entity;

import lombok.*;
import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

// 빌더패턴을 사용한 entity 파일
@Entity
@Getter
@NoArgsConstructor
@Table(name = "member")     // 디비의 테이블명과 클래스 명이 다를 경우
public class MemberEntity {

    @Id
    @Column(nullable = false, length = 20)
    private String uid;

    private String upw;

    private String uname;

    private String uemail;

    private String utel;

    private String uaddr;

    private String uaddrsecond;

    private Date ubirth;

    private Date ujoindate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Authority uauthority;

    // 일대다 관계 매핑
    @OneToMany(mappedBy = "member",
            fetch = FetchType.LAZY,
            cascade = CascadeType.REMOVE)
    private List<MovieMemberEntity> movieMembers = new ArrayList<>();

    // 일대다 관계 매핑
    @OneToMany(mappedBy = "member",
            fetch = FetchType.LAZY,
            cascade = CascadeType.REMOVE)
    private List<ReservationEntity> reservations = new ArrayList<>();

    // 일대다 관계 매핑
    @OneToMany(mappedBy = "member",
            fetch = FetchType.LAZY,
            cascade = CascadeType.REMOVE)
    private List<CommentInfoEntity> commentInfos = new ArrayList<>();

    @Builder
    public MemberEntity(String uid, String upw, String uname, String uemail, String utel, String uaddr,
                        String uaddrsecond, Date ubirth, Date ujoindate, Authority uauthority, List<MovieMemberEntity> movieMembers,
                        List<ReservationEntity> reservations, List<CommentInfoEntity> commentInfos) {
        this.uid = uid;
        this.upw = upw;
        this.uname = uname;
        this.uemail = uemail;
        this.utel = utel;
        this.uaddr = uaddr;
        this.uaddrsecond = uaddrsecond;
        this.ubirth = ubirth;
        this.ujoindate = ujoindate;
        this.uauthority = uauthority;
        this.movieMembers = movieMembers;
        this.reservations = reservations;
        this.commentInfos = commentInfos;
    }
}
