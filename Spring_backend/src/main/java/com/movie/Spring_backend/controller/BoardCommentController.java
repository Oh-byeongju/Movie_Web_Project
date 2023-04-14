package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardCommentDto;
import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.mapper.CommentMapper;
import com.movie.Spring_backend.mapper.CountCommentMapper;
import com.movie.Spring_backend.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardCommentController {
    private final BoardCommentService boardCommentService;

    //댓글을 불러오는 메소드
    @GetMapping("/normal/comment")
    public ResponseEntity<CountCommentMapper> commentAll(@RequestParam("bid") Long bid, @RequestParam("type") String type) {

       if(type.equals("new")) {
           return ResponseEntity.ok().body(boardCommentService.findByComment(bid));
       }
       else if (type.equals("top")) {
           return ResponseEntity.ok().body(boardCommentService.commentLike(bid));
        }
        return null;
    }

    //댓글을 입력하는 메소드
    @PostMapping("/auth/commentwrite")
    public ResponseEntity<List<BoardCommentEntity>> CommentWrite(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        boardCommentService.CommentWrite(requestMap, request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/auth/deletecomment")
    public void deleteComment(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        boardCommentService.deleteComment(requestMap, request);
    }

    @PostMapping("/auth/likecomment")
    public BoardCommentDto Like(@RequestBody Map<String, String> requestMap, HttpServletRequest request){
        String comment = requestMap.get("comment");

        //좋아요 기능 메소드, 게시물 좋아요
        if(comment.equals("")){
            System.out.println("comment");
        }
        else{
            return boardCommentService.like(requestMap,request);
        }
        return null;

    }
}