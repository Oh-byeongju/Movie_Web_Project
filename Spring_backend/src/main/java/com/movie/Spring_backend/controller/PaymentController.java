/*
  23-05-02 결제 페이지 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.ReservationDto;
import com.movie.Spring_backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Payment")
public class PaymentController {

    private final PaymentService paymentService;

    // 결제 검증을 위한 메소드
    @PostMapping("/auth/Check")
    public ResponseEntity<ReservationDto> PaymentCheck(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        return ResponseEntity.ok().body(paymentService.CheckPayment(requestMap, request));
    }

    // 예매 취소를 위한 메소드
    @PatchMapping("/auth/cancel/ReserveDetail/{rid}")
    public ResponseEntity<String> PaymentCancel(@PathVariable("rid") Long rid, HttpServletRequest request) {
        paymentService.CancelPayment(rid, request);
        return ResponseEntity.noContent().build();
    }
}
