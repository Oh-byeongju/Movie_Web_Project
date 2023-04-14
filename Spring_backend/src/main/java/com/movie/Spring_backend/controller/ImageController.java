package com.movie.Spring_backend.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Random;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")

public class ImageController {


    String UPLOAD_PATH = "/Users/mok/Desktop/Movie_Project/Spring_backend/image";
    String POSTER_PATH = "/Users/mok/Desktop/Movie_Project/React_frontend/public/img/ranking";
    //이미지 불러오는 메소드
    @GetMapping("/normal/getImage/{fileId}/{fileType}")
    public ResponseEntity<byte[]> getImageFile(@PathVariable("fileId") String fileId, @PathVariable("fileType") String fileType) {
        try {
            System.out.println("ㅇㅣ미지 불러오기");
            FileInputStream imageStream = new FileInputStream(UPLOAD_PATH + "/" + fileId + "." + fileType);
            //업로드 파일에서 InputStream으로 읽음
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            System.out.println(imageStream);
            byte buffer[] = new byte[1024];
            int length = 0;

            while ((length = imageStream.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
            //바이트 형태로 인코딩 후 보냄
            //프론트에서 주소를 img src= 에 넣게 되면 이미지와 주소를 가져올수있음.

            return new ResponseEntity<byte[]>(baos.toByteArray(), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<byte[]>(new byte[]{}, HttpStatus.CONFLICT);
        }
    }

    //이미지를 폴더에 저장하는 메소드
    @PostMapping("/normal/uploadImage")
    public ResponseEntity<Object> uploadImage(MultipartFile multipartFiles[]) {

        try {
            MultipartFile file = multipartFiles[0];
            System.out.println(file);

            
            String fileId = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
            // 현재 날짜와 랜덤 정수값으로 새로운 파일명 만들기
            String originName = file.getOriginalFilename(); // ex) 파일.jpg
            String fileExtension = originName.substring(originName.lastIndexOf(".") + 1); // ex) jpg
            originName = originName.substring(0, originName.lastIndexOf(".")); // ex) 파일
            long fileSize = file.getSize(); // 파일 사이즈
            System.out.println(fileSize);

            File fileSave = new File(UPLOAD_PATH, fileId + "." + fileExtension); // ex) fileId.jpg
            if(!fileSave.exists()) { // 폴더가 없을 경우 폴더 만들기
                fileSave.mkdirs();
            }

            file.transferTo(fileSave); // fileSave의 형태로 파일 저장

            System.out.println("fileId= " + fileId);
            System.out.println("originName= " + originName);
            System.out.println("fileExtension= " + fileExtension);
            System.out.println("fileSize= " + fileSize);

            return new ResponseEntity<Object>("http://localhost:8080/v2/normal/getImage/" + fileId + "/" + fileExtension, HttpStatus.OK);

        } catch(IOException e) {
            return new ResponseEntity<Object>(null, HttpStatus.CONFLICT);
        }
    }
}
