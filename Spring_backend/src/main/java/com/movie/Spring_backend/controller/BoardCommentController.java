/*
  23-05-24 ~ 26 게시물 댓글 관련 컨트롤러 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardCommentDto;
import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.dto.CountCommentDto;
import com.movie.Spring_backend.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Board")
public class BoardCommentController {
    private final BoardCommentService boardCommentService;

    // 댓글을 불러오는 컨트롤러
    @GetMapping("/normal/allComment")
    public ResponseEntity<CountCommentDto> AllComment(@RequestParam Map<String, String> requestMap) {
       return ResponseEntity.ok().body(boardCommentService.getComment(requestMap));
    }

    // 댓글을 입력하는 컨트롤러
    @PostMapping("/auth/commentWrite")
    public ResponseEntity<String> CommentWrite(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        boardCommentService.CommentWrite(request, requestMap);
        return ResponseEntity.noContent().build();
    }

    // 댓글을 삭제하는 컨트롤러
    @DeleteMapping("/auth/commentDelete")
    public ResponseEntity<String> CommentDelete(HttpServletRequest request, @RequestParam("bcid") Long bcid) {
        boardCommentService.CommentDelete(request, bcid);
        return ResponseEntity.noContent().build();
    }

    // 댓글 좋아요 기능을 구현한 컨트롤러
    @PostMapping("/auth/commentLike")
    public ResponseEntity<BoardCommentDto> CommentLike(HttpServletRequest request, @RequestBody Map<String, String> requestMap){
        return ResponseEntity.ok().body(boardCommentService.onLike(request, requestMap));
    }
}