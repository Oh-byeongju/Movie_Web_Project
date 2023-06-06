/*
  23-05-19 ~ 23 게시물 관련 컨트롤러 수정(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
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

    // 게시물 검색 컨트롤러
    @GetMapping("/normal/boardSearch")
    public ResponseEntity<Page<BoardDto>> BoardSearch(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(boardService.getSearchBoard(requestMap));
    }

    // 게시물 상세조회 컨트롤러
    @GetMapping("/normal/boardContent")
    public ResponseEntity<BoardDto> BoardContent(@RequestParam Map<String, String> requestMap){
        return ResponseEntity.ok().body(boardService.getBoardDetail(requestMap));
    }

    // 이미지를 저장하는 컨트롤러
    @PostMapping("/auth/uploadImage")
    public ResponseEntity<BoardDto> BoardImage(HttpServletRequest request, @RequestPart(required = false) MultipartFile multipartFiles) {
        return ResponseEntity.ok().body(boardService.ImageUpload(request, multipartFiles));
    }

    // 게시물 작성 컨트롤러
    @PostMapping("/auth/boardWrite")
    public ResponseEntity<String> BoardWrite(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        boardService.BoardWrite(request, requestMap);
        return ResponseEntity.noContent().build();
    }

    // 게시물 수정 컨트롤러
    @PatchMapping("/auth/boardUpdate")
    public ResponseEntity<String> BoardUpdate(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        boardService.BoardUpdate(request, requestMap);
        return ResponseEntity.noContent().build();
    }

    // 게시물 삭제 컨트롤러
    @DeleteMapping("/auth/boardDelete")
    public ResponseEntity<String> BoardDelete(HttpServletRequest request, @RequestParam("bid") Long bid)  {
        boardService.BoardDelete(request, bid);
        return ResponseEntity.noContent().build();
    }

    // 좋아요 기능을 구현한 컨트롤러
    @PostMapping("/auth/boardLike")
    public ResponseEntity<BoardDto> BoardLike(HttpServletRequest request, @RequestBody Map<String, String> requestMap){
        return ResponseEntity.ok().body(boardService.onLike(request, requestMap));
    }
}
