package com.movie.Spring_backend.controller;


import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.MemberEntity;


import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.payment.Payment;
import com.movie.Spring_backend.repository.MemberRepository;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import com.movie.Spring_backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")

public class PaymentController {

    private final PaymentService paymentService;

    //결제 완료 시
    @PostMapping("/auth/payment")
    public ResponseEntity<?> paymentComplete(@RequestBody Map<String, String> requestMap,
                                                  HttpServletRequest request, HttpSession session) throws IOException {
        // 1. 아임포트 API 키와 SECRET키로 토큰을 생성
        return paymentService.getPayment(requestMap, request,session);

    }

    // 예매 취소를 위한 메소드
    // update매핑으로 바꿔야할듯
    @PostMapping("/auth/cancel/ReserveDetail/{rid}")
    public ResponseEntity<String> PaymentCancel(@PathVariable("rid") Long rid, HttpServletRequest request) {
        paymentService.CancelPayment(rid, request);
        return ResponseEntity.noContent().build();
    }
}
