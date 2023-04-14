package com.movie.Spring_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MovieServerApplication {

	public static void main(String[] args) throws InterruptedException {
		SpringApplication.run(MovieServerApplication.class, args);

		while(true) {
			System.out.println("작동중");
			Thread.sleep(16000);
		}
	}

}
