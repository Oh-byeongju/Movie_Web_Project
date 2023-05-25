/*
  23-05-24 ~ 25 게시물 댓글 관련 컨트롤러 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardCommentDto;
import com.movie.Spring_backend.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Board")
public class BoardCommentController {
    private final BoardCommentService boardCommentService;

    // 댓글을 불러오는 메소드
    @GetMapping("/normal/allComment")
    public ResponseEntity<HashMap<Long, BoardCommentDto>> AllComment(@RequestParam Map<String, String> requestMap) {
       return ResponseEntity.ok().body(boardCommentService.getComment(requestMap));
    }


//    // 아래로 날려
//    //댓글을 입력하는 메소드
//    @PostMapping("/auth/commentwrite")
//    public ResponseEntity<List<BoardCommentEntity>> CommentWrite(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
//        boardCommentService.CommentWrite(requestMap, request);
//        return ResponseEntity.noContent().build();
//    }
//
//    @PostMapping("/auth/deletecomment")
//    public void deleteComment(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
//        boardCommentService.deleteComment(requestMap, request);
//    }
//
//    @PostMapping("/auth/likecomment")
//    public BoardCommentDto22 Like(@RequestBody Map<String, String> requestMap, HttpServletRequest request){
//        String comment = requestMap.get("comment");
//
//        //좋아요 기능 메소드, 게시물 좋아요
//        if(comment.equals("")){
//            System.out.println("comment");
//        }
//        else{
//            return boardCommentService.like(requestMap,request);
//        }
//        return null;
//
//    }
}