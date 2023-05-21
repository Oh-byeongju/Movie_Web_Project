/*
  23-05-19 ~ 21 게시물 관련 컨트롤러 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.BoardLikeEntity;
import com.movie.Spring_backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Board")
public class BoardController {
    private final BoardService boardService;

    // 게시물 조회 컨트롤러
    @GetMapping("/normal/allBoard")
    public ResponseEntity<Page<BoardDto>> AllBoard(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(boardService.getBoard(requestMap));
    }

    // 게시판 상세조회 컨트롤러
    @GetMapping("/normal/content")
    public ResponseEntity<BoardDto> BoardContent(@RequestParam Map<String, String> requestMap){
        return ResponseEntity.ok().body(boardService.getBoardDetail(requestMap));
    }

    // 이미지를 저장하는 컨트롤러
    @PostMapping("/auth/uploadImage")
    public ResponseEntity<BoardDto> BoardImage(HttpServletRequest request, @RequestPart(required = false) MultipartFile multipartFiles) {
        return  ResponseEntity.ok().body(boardService.ImageUpload(request, multipartFiles));
    }

    // 게시판에 글을 작성하는 컨트롤러
    @PostMapping("/auth/boardWrite")
    public ResponseEntity<String> BoardWrite(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        boardService.BoardWrite(request, requestMap);
        return ResponseEntity.noContent().build();
    }






    // 아래로 날려

    //게시판내에서 검색하는 메소드
    @GetMapping("/normal/search")
    public ResponseEntity<Page<BoardDto>> Search(@RequestParam("page") String page, @RequestParam("title") String title,@RequestParam("category") String category){
        System.out.println(page);
        System.out.println(title);
        System.out.println(category);

        if(category.equals("title")) {
            return ResponseEntity.ok().body(boardService.SearchTitle(Integer.valueOf(page), title));
        }
        else if(category.equals("name")){
            return ResponseEntity.ok().body(boardService.SearchUid(Integer.valueOf(page), title));

        }
        return null;
    }


    //게시물 삭제 기능
    @PostMapping("/auth/delete")
    public void DeleteBoard(@RequestBody Map<String, String> requestMap, HttpServletRequest request)  {
        boardService.deleteBoard(requestMap,request);
    }

    //좋아요 기능 구현
    @PostMapping("/auth/like")
    public BoardDto Like(@RequestBody Map<String, String> requestMap, HttpServletRequest request){

            return boardService.like(requestMap, request);


    }
}
