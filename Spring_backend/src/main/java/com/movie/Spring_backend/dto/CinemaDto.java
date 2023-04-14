package com.movie.Spring_backend.dto;


import com.movie.Spring_backend.entity.Authority;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.*;
import org.springframework.http.ResponseEntity;

import java.sql.Date;
import java.util.List;
//DTO DB에서 데이터를 얻어 Service나  Controller등으로 보낼때 사용하는 객체
//@Builder //클래스 레벨에 붙이거나 생성자에 붙여주면 파라미터를 활용하여 빌더 패턴을 자동으로 생성해준다
//객체지향에서는 메소드를 통해 데이터를 변경하는것을 선호한다. 무결성!

@Getter
@NoArgsConstructor
public class CinemaDto { //값을 가공 후 전달.

        private Long cid;
        private String cname;
        private String ctype;
        private Integer cseat;
        private TheaterEntity theater;
        private String tname;

        private Long tid;
        @Builder
        public CinemaDto(Long cid, String cname, String ctype, Integer cseat ,TheaterEntity theater,String tname,Long tid) {
            this.cid = cid;
            this.cname = cname;
            this.ctype = ctype;
            this.cseat = cseat;
            this.theater=theater;
            this.tname=tname;
            this.tid=tid;
        }



}






