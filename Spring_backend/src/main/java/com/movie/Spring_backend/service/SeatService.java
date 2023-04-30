/*
  23-04-30 예매 좌석 페이지 수정(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.SeatOccupyException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.SeatMapper;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import com.movie.Spring_backend.repository.RedisSeatRepository;
import com.movie.Spring_backend.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.*;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SeatService {
    private final RedisTemplate redisTemplate; //redis
    private final JwtValidCheck jwtValidCheck;
    private final RedisSeatRepository redisSeatRepository;
    private final SeatRepository seatRepository;
    private final MovieInfoSeatRepository movieInfoSeatRepository;
    private final SeatMapper seatMapper;

    // 특정 상영정보에 좌석정보를 가져오는 메소드
    @Transactional
    public List<SeatDto> getSeatMovieInfo(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 안에 정보를 추출
        Long cid = Long.valueOf(requestMap.get("cid"));
        long miid = Long.parseLong(requestMap.get("miid"));

        // 좌석정보 조회에 필요한 정보 Entity로 변환
        CinemaEntity cinema = CinemaEntity.builder().cid(cid).build();
        MovieInfoEntity movieInfo = MovieInfoEntity.builder().miid(miid).build();

        // 상영관에 모든 좌석 및 점유좌석들 조회
        List<SeatEntity> Seats = seatRepository.findByCinema(cinema);
        List<MovieInfoSeatEntity> movieInfoSeats = movieInfoSeatRepository.findByMovieInfo(movieInfo);
        List<RedisSeatEntity> redisSeats = redisSeatRepository.findAll();

        // 점유좌석번호 변수
        List<Long> occupyNum = new ArrayList<>();

        // mysql에 있는 상영정보에 대한 점유좌석번호 추출
        for (MovieInfoSeatEntity mis : movieInfoSeats) {
            occupyNum.add(mis.getSeat().getSid());
        }

        // 레디스에 있는 상영정보에 대한 점유좌석번호 추출
        for (RedisSeatEntity rs : redisSeats) {
            // rs가 널이 아닐경우
            if (rs != null) {
                // 레디스 데이터 매핑
                String [] SeatNumber = rs.getKey().split(",");

                // 사용자가 예매하려는 상영정보의 점유좌석일경우 좌석번호를 추출
                if (Long.parseLong(SeatNumber[0].trim()) == miid) {
                    occupyNum.add(Long.parseLong(SeatNumber[1].trim()));
                }
            }
        }
        // 정보를 매핑후 리턴
        return Seats.stream().map(seat -> seatMapper.toDtoReserve(seat, occupyNum)).collect(Collectors.toList());
    }


    // 유저이름 뽑을때 atk안에 있는거 뽑아서 쓰삼
    @Transactional
    public void setValues(String name, String age ,String user, HttpServletRequest request) {
        //name : miid , age : seatid
        jwtValidCheck.JwtCheck(request, "ATK");
        boolean check = false;
        System.out.println(age);
        age = age.substring(0, age.length()-1);
        String[] SeatNumber = age.split(",");
        List<RedisSeatEntity> datad = redisSeatRepository.findAll();
        //구조를 변경해야함

        if (datad.isEmpty()) {//
            //무조건 삽입을 해야함 데이터가 없으니까
            //get()으로 검색이 가능함
            for (String k : SeatNumber) {
                System.out.println(k);
                String keys = "";
                keys = name + "," + k;
                System.out.println(keys);
                RedisSeatEntity redisSeatEntity = new RedisSeatEntity(keys, user);
                //레디스에 데이터가 아무것도 없으니까 다른 검사 없이 삽입해준다.
                redisSeatRepository.save(redisSeatEntity);

            }
        }
        else if (!datad.isEmpty()) {
            //여기서부턴 검사가 필요함
            //레디스에 값이 있음
            for (String k : SeatNumber) {
                String keys = "";
                keys = name + "," + k;
                System.out.println(keys);
                RedisSeatEntity redisSeatEntity = new RedisSeatEntity(keys, user);
                //레디스 데이터를 키값으로 검사
                Optional<RedisSeatEntity> seated = redisSeatRepository.findById(redisSeatEntity.getKey());
                //seated가 null이면
                if (seated.isEmpty()) {
                    System.out.println("키가 없다");
                }
                else {
                    //seated가 있는데 아이디값이 같으면 예외처리를 하지않고
                    if (user.equals(seated.get().getUser())) {
                        check=true;
                    }
                    else {
                        //아이디값이 다르면 예외를 던진다.
                        check=true;
                        throw new SeatOccupyException("점유된 자리입니다.");
                    }
                }
            }
        }

        if(check==false) {
            for (String k : SeatNumber) {
                String keys = "";
                keys = name + "," + k;
                System.out.println(keys);
                RedisSeatEntity redisSeatEntity = new RedisSeatEntity(keys, user);
                redisSeatRepository.save(redisSeatEntity);
            }
        }
    }
    // 데이터 가져오기
    public String getValues(){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        return setOperations.toString();
    }

}