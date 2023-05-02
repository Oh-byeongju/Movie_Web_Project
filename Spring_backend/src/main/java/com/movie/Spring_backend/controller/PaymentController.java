/*
  23-05-02 결제 페이지 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Payment")

public class PaymentController {

    private final PaymentService paymentService;

    // 아래꺼 리턴 해줘야함 예매번호!

    // 결제 검증을 위한 메소드
    @PostMapping("/auth/Check")
    public ResponseEntity<?> paymentComplete(@RequestBody Map<String, String> requestMap,
                                                  HttpServletRequest request, HttpSession session) throws IOException {
        // 1. 아임포트 API 키와 SECRET키로 토큰을 생성
        return paymentService.getPayment(requestMap, request,session);

    }

    // 예매 취소를 위한 메소드
    @PatchMapping("/auth/cancel/ReserveDetail/{rid}")
    public ResponseEntity<String> PaymentCancel(@PathVariable("rid") Long rid, HttpServletRequest request) {
        paymentService.CancelPayment(rid, request);
        return ResponseEntity.noContent().build();
    }
}
