# 📽 영화 웹페이지 프로젝트

## **📗 목차**

<b>

- 📝 [프로젝트 개요](#-프로젝트-개요)
- 🛠 [기술 및 도구](#-기술-및-도구)
- 📦 [ERD 설계](#-ERD-설계)
- 💻 [프로젝트 수행 과정](#-프로젝트-수행-과정)
- 🔎 [기능 소개 Wiki](#기능-소개-Wiki)
- 📰 [API 명세서](#-API-명세서)

</b>

## **📝 프로젝트 개요**
#### `1. 프로젝트 소개`
- Spring-Boot와 React를 이용하여 개발한 영화 웹페이지 입니다.

#### `2. 개발 기간`
- Demo-Version : 2023.01.08 ~ 2023.04.05
- Refactoring : 2023.04.10 ~ 2023.05.30

#### `3. 개발 인원`
- 오병주 : Demo-Version 프로젝트 개발, 코드 리팩토링 및 배포
- 강경목 : Demo-Version 프로젝트 개발

## **🛠 기술 및 도구**
#### `Front-end`
- React
- Styled-components
- Axios
- Redux
- Redux-Saga
#### `Back-end`
- Java 11
- Spring-Boot
- Spring Data JPA
- Spring-Security
- MySQL
- Redis
#### `DevOps`	
- AWS (EC2, RDS)
- Nginx
- Gradle
- Docker
- GitHub
#### `Security`
- JWT
- HTTPS
#### `API`
- Swagger (Springdoc)

## **📦 ERD 설계**
<img width="100%" alt="ERD" src="https://user-images.githubusercontent.com/96694919/246102323-3dbcef99-3e0a-47cc-8fa5-55926d9d65f8.png"/>

## **💻 프로젝트 수행 과정**
### * 시스템 구성도
<img width="100%" alt="Sys" src="https://user-images.githubusercontent.com/96694919/246202776-83847a3b-d272-4157-b927-f175c96f8f70.jpg"/>

	- 프로젝트의 전체적인 시스템 구성도입니다.
	사용자가 웹페이지의 URL을 요청하면 ec2 인스턴스를 거쳐 Docker 컨테이너 환경에 존재하는 NGINX(Web Server)로 요청이 전달되며 NGINX는 요청들을 https 요청으로 리다이렉트함과 동시에 정적요소는 빌드된 index.html 파일로부터 데이터를 가져와 사용자에게 전달하고, 동적요소는 Spring-Boot 서버에게 요청을 전달한 뒤 Spring-Boot 서버가 RDS에 접근하여 가져온 데이터를 사용자에게 전달합니다.


### * NGINX의 백엔드 요청과 DB 접근 순서도
### 0️⃣ 전체흐름
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246448896-f923d5de-9b31-4a23-9485-08d234e0a5a5.jpg"/>

### 1️⃣ NGINX
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246402430-297d2b2b-9c88-449a-b313-80adad1f546c.jpg"/>

- **URL Rewrite 처리** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/d7b4b0869aa213ec557497b573ad51bcfb3cf0ba/Docker_nginx/conf.d/default.conf#L36)
	- 사용자가 요청한 URL에서 백엔드 요청에 필요없는 ~/APICALL/ 부분을 NGINX 내부에서 제거한 뒤 URL을 재정의합니다.
- **Reverse Proxy 처리** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/d7b4b0869aa213ec557497b573ad51bcfb3cf0ba/Docker_nginx/conf.d/default.conf#L37)
	- 사용자의 요청을 백엔드 서버에게 전달합니다. Reverse Proxy 덕분에 사용자는 DB의 데이터가 필요할 때 프록시 서버 URL로만 접근할 수 있으며 백엔드 서버에 직접적으로 접근이 불가능하게 됩니다.
- **결과 응답** 
	- 백엔드 서버에서 전달받은 데이터를 사용자에게 전달합니다.
	

### 2️⃣ jwtFilter
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246399743-f2dc2997-acea-4e27-bb60-f303bcb95c95.jpg"/>

- **토큰 존재 여부 파악** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/5ff68aa372daa08db4a777cf06da9cac3f9a310f/Spring_backend/src/main/java/com/movie/Spring_backend/jwt/JwtFilter.java#L51)
	- REST API 요청에서 AcessToken이 필요한 요청인 경우 AceesToken의 존재 여부를 파악합니다. (토큰에 대한 검증은 Service단에서 실행)
- **CSRF 공격 방지** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/5ff68aa372daa08db4a777cf06da9cac3f9a310f/Spring_backend/src/main/java/com/movie/Spring_backend/util/CsrfCheckUtil.java#L38)
	- REST API 요청이 POST, DELETE, PUT, PATCH인 경우 CSRF 공격을 방지하기 위하여 Double submit cookie를 통한 검사를 실행합니다.

### 3️⃣ Controller
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246411239-2f83e6ce-83c5-4104-834d-ced93f0d64f7.jpg"/>

- **요청 처리** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/0a289c2b34760287beb0476d494fd245c33ccd77/Spring_backend/src/main/java/com/movie/Spring_backend/controller/MyPageMovieController.java#L43)
	- Controller 계층에서는 NGINX 서버에서 넘어온 요청을 받고, Service 계층에 데이터 처리를 위임합니다.
	- 로그인이 필요한 요청인 경우 Cookie 형태로 저장된 Token이 존재하는 HttpServletRequest 객체를 Service 계층에 전달합니다.
- **결과 응답** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/0a289c2b34760287beb0476d494fd245c33ccd77/Spring_backend/src/main/java/com/movie/Spring_backend/controller/MyPageMovieController.java#L44)
	- Service 계층에서 전달받은 로직 처리 결과를 ResponseEntity 객체에 담아 NGINX 서버로 전달합니다.

### 4️⃣ Service
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246419708-ca4f187c-d865-4d7e-8201-e6af540f2899.jpg"/>

- **토큰 검증** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/master/Spring_backend/src/main/java/com/movie/Spring_backend/jwt/TokenProvider.java#L114)
	- HttpServletRequest 객체를 전달 받았을경우 토큰 검증을 진행하고 토큰이 올바르지 않을경우에는 예외처리를 합니다.
- **데이터 요청** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/d781e9638e74169fef05e131c2d28401f62c1daa/Spring_backend/src/main/java/com/movie/Spring_backend/service/MyPageMovieService.java#L61)
	- 현재 메소드에서 필요한 데이터 정보를 Repository 계층에게 전달하여 Entity형 데이터를 요청합니다.
- **데이터 가공 및 반환** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/d781e9638e74169fef05e131c2d28401f62c1daa/Spring_backend/src/main/java/com/movie/Spring_backend/service/MyPageMovieService.java#L64)
	- Entity형의 데이터와 이외에 필요한 정보들을 Dto형태의 데이터로 가공한 뒤 Controller 계층에게 전달합니다.

### 5️⃣ Repository
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246445292-7ecf64a4-3971-4848-a9de-eca1071cf8e7.jpg"/>

- **쿼리 수행** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/master/Spring_backend/src/main/java/com/movie/Spring_backend/repository/ReservationRepository.java#L23)
	- Entity에 의해 생성된 DB에 접근하는 메소드들을 사용하기 위한 계층으로써 JpaRepository를 상속받아 사용합니다.
	- JPA가 제공하는 쿼리 메소드를 이용하거나 @Query 어노테이션을 활용하여 JPQL 쿼리를 직접 작성한 뒤 쿼리를 수행합니다.

## **🔎기능 소개 Wiki**
### 로그인 관련 - [**상세보기**](https://github.com/Oh-byeongju/Movie_Project/wiki/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5#-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5)
	- 회원가입
	- JWT를 이용한 로그인 (로그인 유지하기 포함)
	- 아이디 / 비밀번호 찾기

### 영화 관련 - [**상세보기**](https://github.com/Oh-byeongju/Movie_Project/wiki/%EC%98%81%ED%99%94-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5#-%EC%98%81%ED%99%94-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5)
	- 분류별 영화 목록 조회
	- 영화 상세내용 조회
	- 버튼 클릭시 빠른 예매 기능
	- 영화 공감 및 관람평 작성 기능

### 상영시간표 관련 - [**상세보기**](https://github.com/Oh-byeongju/Movie_Project/wiki/%EC%83%81%EC%98%81%EC%8B%9C%EA%B0%84%ED%91%9C-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5#-%EC%83%81%EC%98%81%EC%8B%9C%EA%B0%84%ED%91%9C-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5)
	- 영화를 중심으로 상영정보 목록 조회
	- 극장을 중심으로 상영정보 목록 조회
	- 버튼 클릭시 빠른 예매 기능

### 영화예매 관련 - [**상세보기**](https://github.com/Oh-byeongju/Movie_Project/wiki/%EC%98%81%ED%99%94%EC%98%88%EB%A7%A4-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5#-%EC%98%81%ED%99%94%EC%98%88%EB%A7%A4-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5)
	- 예매가 가능한 영화, 극장, 날짜 조회
	- 조건에 맞는 상영정보 목록 조회
	- 좌석조회 및 선택 기능
	- 결제 기능

### 게시판 관련 - [**상세보기**](https://github.com/Oh-byeongju/Movie_Project/wiki/%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5#-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B4%80%EB%A0%A8-%EA%B8%B0%EB%8A%A5)
	- 게시물 조회, 작성, 수정, 삭제 기능
	- 댓글 및 답글 작성, 삭제 기능
	- 게시물 및 댓글 공감 기능

### 마이페이지 관련
- 예매내역, 예매 취소내역, 지난 관람내역 목록 조회
- 예매내역, 예매 취소내역, 지난 관람내역 상세 조회
- 예매내역 취소 기능
- 사용자가 공감한 영화 목록 조회
- 관람평 작성이 가능한 영화 및 작성한 관람평 목록 조회
- 회원정보 수정 및 탈퇴

### 관리자 관련
- 영화 및 배우 조회, 작성, 수정, 삭제 기능
- 상영정보 조회, 작성, 수정, 삭제 기능
- 극장 및 상영관 조회, 작성, 수정, 삭제 기능
- 회원 조회, 삭제 기능
- 영화 또는 극장에 따른 예매내역 조회 기능
- 관람평 및 게시물 조회, 삭제 기능

## **📰 API 명세서**
### API 명세서 - [**바로가기**](https://www.moviebnb.com/APICALL/swagger-ui/index.html)
	- REST API 자동 문서화를 위한 Springdoc-openapi-ui를 사용한 Swagger
	- 프로젝트 개발 및 유지보수에 활용



<!-- 개발하면서 아쉬웠던점(기억나는거 다적기) -> jwt필터단에서  access토큰 유효성 검사를 하지 못하고 service단에서 실행한것 (이유는 axios interceptor를 쓰려고 하는데 jwt필터단에서 Custom 예외처리를 적용시킬 수 있었으나 토큰 만료, 불일치, 형식오류등 각종 상황에 따른 다른 예외처리가 불가능하여서 service단에서 처리 ) -->
<!-- 
cors 이슈 -> 리액트와 스프링부트를 이용해서 개발은 진행하다보니 서로의 서버간 port번호가 달라 cors 이슈가 있었다. 그치만 이걸 spring-boot의 전역설정으로 해결하였고 Cookie까지 받아오려고 widhtㄱ크래셜?? 그거까지 설정했다.

from dis cash 이슈 -> 배포 과정에서 발견한 트러블이슈인데 설명좀 추가해서 적고 ~~~ 일이 있었다. 그래서 프론트단에서 백엔드를 요청할때 axios 헤더에 무슨무슨 값을 설정해서 해결했다. -->
<!-- 
예매율 계산을 위해 Forumla를 처음에 썼는데 임의의 데이터를 많이 넣다보니 DB 연산속도가 너무 느려지는 이슈가 있었다 
그래서 MYSQL내부에서 트리거로 구현을 해놨다~~ -->