package com.movie.Spring_backend.service;

import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.error.exception.EntityNotFoundException;
import com.movie.Spring_backend.error.exception.ErrorCode;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.payment.Payment;
import com.movie.Spring_backend.repository.MemberRepository;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import com.movie.Spring_backend.repository.RedisSeatRepository;
import com.movie.Spring_backend.repository.ReservationRepository;
import com.movie.Spring_backend.util.RemoveLastChar;
import com.movie.Spring_backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@RequiredArgsConstructor
@Service
public class PaymentService {

    private final Payment payment;
    private final MemberRepository memberRepository;
    private final MovieInfoSeatRepository movieInfoSeatRepository;
    private final JwtValidCheck jwtValidCheck;
    private final ReservationRepository reservationRepository;
    private final RedisSeatRepository redisSeatRepository;

    @Transactional
    public ResponseEntity<?> getPayment(Map<String, String> requestMap,
                                             HttpServletRequest request, HttpSession session) throws IOException
{

        jwtValidCheck.JwtCheck(request, "ATK");

        String token = payment.getToken();
        String User_id = SecurityUtil.getCurrentMemberId();
        String impUid = requestMap.get("impUid"); //결제 정보
        String miid = requestMap.get("miid");     //movieinfo_id
        String pay = requestMap.get("amount");    //pay
        String people = requestMap.get("people");
        String ticket = requestMap.get("ticket");

    String people2= RemoveLastChar.removeLast(people);
        String rpeople= RemoveLastChar.removeLast(people2);

    int payamount = Integer.parseInt(pay);  //비교를 위한 형변환
        MemberEntity member = MemberEntity.builder().uid(User_id).build();   //entity형태로 변환
        MovieInfoEntity info = MovieInfoEntity.builder().miid(Long.valueOf(miid)).build(); //entity형태로 변환
        Date nowDate = new Date();

        // 현재 시간을 sql에 사용할 수 있게 매핑
        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String day = DateFormat.format(nowDate);
        String[] SeatNumber = requestMap.get("sid").split(",");
        List<Long> sid = new ArrayList<>();
        for(String s: SeatNumber){
            sid.add(Long.parseLong(s));
        }
        //결제 정보 저장
        int amount = payment.paymentInfo(impUid, token);  //토큰과 결제정보로 추출한 amount
        ReservationEntity reservationEntity;

        try{
            //아이디가 있어야 함
            if(memberRepository.existsById(User_id)){
                if(payamount==amount){ //리턴된 페이와 프론트 리턴 페이 보냄

                    reservationEntity = ReservationEntity.builder()
                            .rdate(day)
                            .rprice(payamount)
                            .rpeople(rpeople)
                            .rticket(Integer.valueOf(ticket))
                            .rpayid(impUid)
                            .rpaytype("카드결제")
                            .rstate(true)
                            .movieInfo(info)
                            .member(member)
                            .build();
                    reservationRepository.save(reservationEntity);

                    ReservationEntity data= reservationRepository.findByRpayid(impUid);

                   List<MovieInfoSeatEntity> infoseat = new ArrayList<>();
                   for(Long ss :sid){
                       MovieInfoSeatEntity movieInfoSeatEntity= MovieInfoSeatEntity.builder()
                               .seat(SeatEntity.builder().sid(ss).build())
                               .info(info)
                               .reserve(data)
                               .build();
                       infoseat.add(movieInfoSeatEntity);
                       String keys =miid + ", " + ss;
                       System.out.println(keys);
                       RedisSeatEntity redisSeatEntity = new RedisSeatEntity(keys, User_id);
                       redisSeatRepository.delete(redisSeatEntity);
                   }


                   movieInfoSeatRepository.saveAll(infoseat);
                    // MovieMember = MovieMemberEntity.builder()
                    //    .umlike(true)
                    //      .movie(movie)
                    //        .member(member).build();
                    System.out.println("3333333333333");

                    return new ResponseEntity<>(data.getRid(), HttpStatus.OK);
                }
                else {
                    payment.paymentCancel(token, impUid, amount, "결제 에러");
                    return new ResponseEntity<String>("결제 오류!", HttpStatus.BAD_REQUEST);
                }
            }
            else{

                payment.paymentCancel(token, impUid, amount, "결제 에러");
                return new ResponseEntity<String>("결제 오류!", HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e){
            payment.paymentCancel(token, impUid, amount, "결제 에러");
            return new ResponseEntity<String>("결제 오류!", HttpStatus.BAD_REQUEST);
        }
    }

    // 예매 취소 요청시 실행되는 메소드
    // 디비에 paytoken 필요없는데 나중에 빼기 디비에서 --> PAYTOKEN은 제거함
    @Transactional
    public void CancelPayment(Long rid, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 예매 번호를 이용하여 예매기록 검색
        ReservationEntity Reservation = reservationRepository.findById(rid).orElseThrow(
                () -> new EntityNotFoundException("예매 기록이 존재하지 않습니다.", ErrorCode.RESERVE_IS_NONE));

        // 임의의 데이터가 아닌경우에만 결제취소 진행
        if (!Reservation.getRpayid().equals("temporary_value")) {
            // 이거 메소드 단에서 throw 던지는거 바꿔야할듯 (get, set 바꾸면서)
            // 아래꺼 로그로 바꾸고 나중에 뺄꺼면 빼기
            // 결제 취소 실행
            try {
                String token = payment.getToken();
                payment.paymentCancel(token, Reservation.getRpayid() , Reservation.getRprice(), "예매 취소");
            } catch (IOException e) {
                System.out.println("결제 정보가 올바르지 않습니다.");
                throw new RuntimeException("결제 정보가 올바르지 않습니다.");
            }
        }
        // 사용자가 예매했던 좌석정보 삭제
        movieInfoSeatRepository.deleteByReserve(Reservation);

        // 사용자가 취소한 예매정보를 변경
        reservationRepository.UserReservationCancel(Reservation.getRid());
    }
}




