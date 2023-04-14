package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.BoardLikeEntity;
import com.movie.Spring_backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    //게시판에 글을 불러오는 컨트롤러
    @GetMapping("/normal/boardall")
    public ResponseEntity<Page<BoardDto>> BoardWrite(@RequestParam("page") String page ,@RequestParam("sort") String sort,@RequestParam("category") String category ) {

        //최신순, 전체
        if(category.equals("popular") && sort.equals("all")){
            return ResponseEntity.ok().body(boardService.PaginationBid(Integer.valueOf(page),"자유 게시판"));
        }

        //인기순, 전체
        else if(category.equals("popular") &&sort.equals("top")){
            return ResponseEntity.ok().body(boardService.PaginationIndex(Integer.valueOf(page),"자유 게시판"));
        }

        //좋아요순, 전체
        else if(category.equals("popular") &&sort.equals("like")){
            return ResponseEntity.ok().body(boardService.PaginationTop(Integer.valueOf(page),"자유 게시판"));
        }

        //전체순, 뉴스
        else if(category.equals("news") && sort.equals("all")){
            return ResponseEntity.ok().body(boardService.PaginationBid(Integer.valueOf(page),"영화 뉴스"));
        }

        //인기순, 뉴스
        else if(category.equals("news") &&sort.equals("top")){
            return ResponseEntity.ok().body(boardService.PaginationIndex(Integer.valueOf(page),"영화 뉴스"));
        }

        //좋아요순, 인기
        else if(category.equals("news") &&sort.equals("like")){
            return ResponseEntity.ok().body(boardService.PaginationTop(Integer.valueOf(page),"영화 뉴스"));
        }
        //전체순, 인터뷰
        else if(category.equals("interview") && sort.equals("all")){
            return ResponseEntity.ok().body(boardService.PaginationBid(Integer.valueOf(page),"인터뷰"));
        }

        //인기순, 인터뷰
        else if(category.equals("interview") &&sort.equals("top")){
            return ResponseEntity.ok().body(boardService.PaginationIndex(Integer.valueOf(page),"인터뷰"));
        }

        //좋아요순, 인터뷰
        else if(category.equals("interview") &&sort.equals("like")){
            return ResponseEntity.ok().body(boardService.PaginationTop(Integer.valueOf(page),"인터뷰"));
        }
        else if(category.equals("myinfo")){
            return ResponseEntity.ok().body(boardService.selectInfo(Integer.valueOf(page)));
        }
        return null;
    }

    //게시판 상세 페이지 , 주소는 id/title로 지정
    @GetMapping("/normal/content/{id}/{title}")
    public ResponseEntity <BoardDto> BoardContent(@PathVariable Long id, @PathVariable String title){

        return ResponseEntity.ok().body(boardService.findByContent(id,title));
    }

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

    //게시판에 글을 작성하는 컨트롤러
    @PostMapping("/auth/boardwrite")
    public ResponseEntity<String> BoardWrite(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        boardService.BoardWrite(requestMap, request);
        return ResponseEntity.noContent().build();
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
