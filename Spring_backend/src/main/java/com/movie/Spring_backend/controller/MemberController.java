/*
  23-01-13 아이디 중복 검사 메소드구현(오병주)
  23-01-16 회원가입 및 로그인 메소드구현(오병주)
  23-01-18 토큰 재발급 관련 메소드구현(오병주)
  23-03-15 ~ 16 회원정보 수정 및 탈퇴 메소드구현(오병주)
  23-04-15 아이디, 비밀번호 찾기 메소드구현(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.service.MemberService;
import com.movie.Spring_backend.util.SecurityUtil;
import com.movie.Spring_backend.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    // 아이디 중복 검사를 위한 메소드, 중복된 아이디가 없을경우 noContent 리턴
    @GetMapping("/normal/id")
    public ResponseEntity<String> existsId(@RequestParam("uid") String id) {
        memberService.existsId(id);
        return ResponseEntity.noContent().build();
    }

    // 이메일 중복 검사를 위한 메소드, 중복된 이메일이 없을경우 noContent 리턴
    @GetMapping("/normal/email")
    public ResponseEntity<String> existsEmail(@RequestParam("uemail") String email) {
        memberService.existsEmail(email);
        return ResponseEntity.noContent().build();
    }

    // 회원가입을 위한 메소드, 회원가입을 성공할 경우 noContent 리턴
    @PostMapping("/normal/signup")
    public ResponseEntity<String> signup(@RequestBody MemberDto requestDto) {
        memberService.signup(requestDto);
        return ResponseEntity.noContent().build();
    }

    // 아이디 찾기에 사용되는 메소드
    @GetMapping("/normal/findId")
    public ResponseEntity<MemberDto> findId(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(memberService.findId(requestMap));
    }

    // 비밀번호 찾기에 사용되는 메소드
    @GetMapping("/normal/findPw")
    public ResponseEntity<MemberDto> findPw(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(memberService.findPw(requestMap));
    }

    // 로그인을 위한 메소드, id와 pw가 일치할 경우 Token을 생성하여 리턴
    @PostMapping("/normal/login")
    public ResponseEntity<MemberDto> login_check(@RequestBody MemberDto requestDto, HttpServletResponse response) {
        return ResponseEntity.ok().body(memberService.login(requestDto, response));
    }

    // 로그인 상태를 확인하는 메소드
    @GetMapping("/normal/login_status")
    public ResponseEntity<MemberDto> getMyInfoBySecurity(HttpServletRequest request) {
        return ResponseEntity.ok(memberService.getMyInfoBySecurity(request));
    }

    // 리프레시 토큰을 이용한 토큰 재발급 메소드
    @PostMapping("/normal/reissue")
    public ResponseEntity<String> reissue(HttpServletResponse response, HttpServletRequest request) {
        memberService.reissue(response, request);
        return ResponseEntity.noContent().build();
    }

    // 로그아웃 메소드
    @PostMapping("/normal/logout")
    public ResponseEntity<String> logoutUser(HttpServletResponse response, HttpServletRequest request) {
        memberService.logout(response, request);
        return ResponseEntity.noContent().build();
    }

    // 회원정보 수정 페이지 패스워드 확인 메소드
    @GetMapping("/auth/checkPw")
    public ResponseEntity<String> checkPw(HttpServletRequest request, @RequestParam("upw") String pw) {
        memberService.CheckPw(request, pw);
        return ResponseEntity.noContent().build();
    }

    // 회원정보 수정 페이지 회원정보 수정 메소드
    @PatchMapping("/auth/memberUpdate")
    public ResponseEntity<String> memberUpdate(HttpServletRequest request, @RequestBody MemberDto requestDto) {
        memberService.MemberUpdate(request, requestDto);
        return ResponseEntity.noContent().build();
    }

    // 회원탈퇴 메소드
    @DeleteMapping("/auth/memberDrop")
    public ResponseEntity<String> memberDrop(HttpServletResponse response, HttpServletRequest request) {
        memberService.MemberDrop(response, request);
        return ResponseEntity.noContent().build();
    }
}