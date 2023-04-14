/*
  23-02-10 영화 세부내용을 위한 메소드 설계(오병주)
  23-02-14 영화 세부내용 메소드 수정(오병주)
  23-02-20 영화 관람평 메소드 구현(오병주)
  23-03-06 전체영화 조회 및 사용자 영화 검색 메소드 수정(오병주)
*/
package com.movie.Spring_backend.service;
import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.MovieCommentNotFoundException;
import com.movie.Spring_backend.mapper.MovieCommentMapper;
import com.movie.Spring_backend.repository.*;
import com.movie.Spring_backend.util.DeduplicationUtil;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.mapper.MovieMapper;

import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMemberRepository movieMemberRepository;
    private final MovieActorRepository movieActorRepository;
    private final ActorRepository actorRepository;
    private final CommentInfoRepository commentInfoRepository;
    private final MovieMapper movieMapper;
    private final MovieCommentMapper movieCommentMapper;

    // 전체 영화 조회 메소드
    public List<MovieDto> getAllMovie(Map<String, String> requestMap) {
        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> Movies = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화들의 전체 예매 횟수(예매율 계산시 나누기 할때 사용)
        float cnt = 0;
        for (MovieEntity m : Movies) {
            cnt += m.getCntReserve();
        }

        // requestMap 안에 정보를 추출
        String User_id = requestMap.get("uid");
        String sort = requestMap.get("button");
        String title = requestMap.get("search");

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(User_id).build();

        // 사용자가 좋아요 누른 영화 목록 검색
        List<MovieMemberEntity> MovieLike = movieMemberRepository.findByUmlikeTrueAndMember(member);

        // 좋아요 누른 영화 목록을 HashSet 으로 변환
        Set<Long> MovieLikeNum = new HashSet<>();
        for (MovieMemberEntity mm : MovieLike) {
            MovieLikeNum.add(mm.getMovie().getMid());
        }

        // 검색될 영화들 변수
        List<MovieEntity> ShowMovies;
        List<MovieEntity> NotShowMovies;

        // 영화를 예매순으로 불러올 경우
        if (sort.equals("rate")) {
            // 영화 테이블에서 현재 예매가 가능한 영화들 조회(title을 매개변수로 전달, 예매순으로 내림차순)
            ShowMovies = movieRepository.findShowMoviesReserveDESC(title);

            // 영화 테이블에서 한번도 상영일정이 안잡힌 상영예정 영화 조회(title을 매개변수로 전달, 날짜순으로 오름차순)
            NotShowMovies = movieRepository.findNotShowMoviesDateASC(title);
        }
        // 영화를 공감순으로 불러올 경우
        else {
            // 영화 테이블에서 현재 예매가 가능한 영화들 조회(title을 매개변수로 전달, 공감순으로 내림차순)
            ShowMovies = movieRepository.findShowMoviesLikeDESC(title);

            // 영화 테이블에서 한번도 상영일정이 안잡힌 상영예정 영화 조회(title을 매개변수로 전달, 공감순으로 내림차순)
            NotShowMovies = movieRepository.findNotShowMoviesLikeDESC(title);
        }

        // 위에서 검색한 영화 목록과 좋아요 기록을 mapping 후 리턴
        return movieMapper.toDtoAllORComingMovie(ShowMovies, NotShowMovies, MovieLikeNum, cnt);
    }

    // 현재상영작 영화 조회 메소드
    @Transactional
    public List<MovieDto> getScreenMovie(Map<String, String> requestMap) {
        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> Movies = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화들의 전체 예매 횟수(예매율 계산시 나누기 할때 사용)
        float cnt = 0;
        for (MovieEntity m : Movies) {
            cnt += m.getCntReserve();
        }

        // requestMap 안에 정보를 추출
        String User_id = requestMap.get("uid");
        String sort = requestMap.get("button");
        String title = requestMap.get("search");

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(User_id).build();

        // 사용자가 좋아요 누른 영화 목록 검색
        List<MovieMemberEntity> MovieLike = movieMemberRepository.findByUmlikeTrueAndMember(member);

        // 좋아요 누른 영화 목록을 HashSet 으로 변환
        Set<Long> MovieLikeNum = new HashSet<>();
        for (MovieMemberEntity mm : MovieLike) {
            MovieLikeNum.add(mm.getMovie().getMid());
        }

        // 검색될 영화 변수
        List<MovieEntity> ShowMovies;

        // 영화를 예매순으로 불러올 경우
        if (sort.equals("rate")) {
            // 영화 테이블에서 현재 예매가 가능하고 개봉한 영화들 조회(title을 매개변수로 전달, 예매순으로 내림차순)
            ShowMovies = movieRepository.findScreenMoviesReserveDESC(title);
        }
        // 영화를 공감순으로 불러올 경우
        else {
            // 영화 테이블에서 현재 예매가 가능하고 개봉한 영화들 조회(title을 매개변수로 전달, 공감순으로 내림차순)
            ShowMovies = movieRepository.findScreenMoviesLikeDESC(title);
        }

        // 위에서 검색한 영화 목록과 좋아요 기록을 mapping 후 리턴
        return movieMapper.toDtoScreenMovie(ShowMovies, MovieLikeNum, cnt);
    }

    // 상영 예정작 조회 메소드
    @Transactional
    public List<MovieDto> getComingMovie(Map<String, String> requestMap) {
        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> Movies = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화들의 전체 예매 횟수(예매율 계산시 나누기 할때 사용)
        float cnt = 0;
        for (MovieEntity m : Movies) {
            cnt += m.getCntReserve();
        }

        // requestMap 안에 정보를 추출
        String User_id = requestMap.get("uid");
        String sort = requestMap.get("button");
        String title = requestMap.get("search");

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(User_id).build();

        // 사용자가 좋아요 누른 영화 목록 검색
        List<MovieMemberEntity> MovieLike = movieMemberRepository.findByUmlikeTrueAndMember(member);

        // 좋아요 누른 영화 목록을 HashSet 으로 변환
        Set<Long> MovieLikeNum = new HashSet<>();
        for (MovieMemberEntity mm : MovieLike) {
            MovieLikeNum.add(mm.getMovie().getMid());
        }

        // 검색될 영화들 변수
        List<MovieEntity> ShowMovies;
        List<MovieEntity> NotShowMovies;

        // 영화를 예매순으로 불러올 경우
        if (sort.equals("rate")) {
            // 영화 테이블에서 현재 예매가 가능한 미개봉 영화들 조회(title을 매개변수로 전달, 예매순으로 내림차순)
            ShowMovies = movieRepository.findComingMoviesReserveDESC(title);

            // 영화 테이블에서 한번도 상영일정이 안잡힌 상영예정 영화 조회(title을 매개변수로 전달, 날짜순으로 오름차순)
            NotShowMovies = movieRepository.findNotShowMoviesDateASC(title);
        }
        // 영화를 공감순으로 불러올 경우
        else {
            // 영화 테이블에서 현재 예매가 가능한 미개봉 영화들 조회(title을 매개변수로 전달, 공감순으로 내림차순)
            ShowMovies = movieRepository.findComingMoviesLikeDESC(title);

            // 영화 테이블에서 한번도 상영일정이 안잡힌 상영예정 영화 조회(title을 매개변수로 전달, 공감순으로 내림차순)
            NotShowMovies = movieRepository.findNotShowMoviesLikeDESC(title);
        }

        // 위에서 검색한 영화 목록과 좋아요 기록을 mapping 후 리턴
        return movieMapper.toDtoAllORComingMovie(ShowMovies, NotShowMovies, MovieLikeNum, cnt);
    }

    // 영화 세부내용 메소드
    @Transactional
    public MovieDto getMovieDetail(Long mid, String uid) {
        // 영화 ID를 기반으로 영화 검색
        MovieEntity movie = movieRepository.findById(mid).orElse(null);

        // 영화가 없을경우 예외처리
        if (movie == null) {
            throw new MovieNotFoundException("영화가 없습니다.");
        }

        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> Movies = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화들의 전체 예매 횟수(예매율 계산시 나누기 할때 사용)
        float cnt = 0;
        for (MovieEntity m : Movies) {
            cnt += m.getCntReserve();
        }

        // 예매가 가능한 영화들의 기본키 추출
        List<Long> Movie_id = new ArrayList<>();
        for (MovieEntity M : Movies) {
            Movie_id.add(M.getMid());
        }

        // 현재 영화가 예매가 가능 하다면 true, 아니면 false
        boolean Screen = Movie_id.contains(mid);

        // 영화에 출연하는 출연진 정보 검색
        List<MovieActorEntity> MovieActor = movieActorRepository.findByMovie(movie);

        // Actor 테이블의 기본키 추출
        Set<Long> Actor_Ids = new HashSet<>();
        for (MovieActorEntity MA : MovieActor) {
            Actor_Ids.add(MA.getActor().getAid());
        }

        // Actor 테이블의 기본키를 이용하여 정보 검색
        List<ActorEntity> Actor = actorRepository.findAllById(Actor_Ids);

        // 영화 출연진들의 이름 매핑
        List<String> Actors = new ArrayList<>();
        for (ActorEntity A : Actor) {
            Actors.add(A.getAname() + ",");
        }

        // List의 마지막 요소에 콤마를 제거
        if (!Actors.isEmpty()) {
            Actors.set(Actor.size()-1, Actors.get(Actor.size()-1).replaceAll(",$", ""));
        }

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자의 현재 영화 평가 기록 검색
        MovieMemberEntity MovieMember = movieMemberRepository.findByMovieAndMember(movie, member).orElse(null);

        // 위에서 검색한 내용들 + 사용자의 영화 평가가 없을 경우 좋아요 여부를 false 로 전달
        if (MovieMember == null) {
            return movieMapper.toDtoDetail(movie, false, Screen, Actors, cnt);
        }

        // 위에서 검색한 내용들 + 사용자의 영화 평가에서 좋아요 여부를 판단 후 return
        if (MovieMember.getUmlike() == null || !MovieMember.getUmlike()) {
            return movieMapper.toDtoDetail(movie, false, Screen, Actors, cnt);
        }
        else {
            return movieMapper.toDtoDetail(movie, true, Screen, Actors, cnt);
        }
    }
    
    // 영화 세부내용 관람평 메소드(최신순)  --> 밑에꺼랑 합쳐도 될듯
    @Transactional
    public List<CommentInfoDto> getMovieDetailCommentRecent(Long mid, String uid) {

        // 영화 id 정보를 entity 형으로 변환
        MovieEntity movie = MovieEntity.builder()
                .mid(mid).build();

        // 영화 id를 기반으로 MovieMember table 검색(최신순)
        List<MovieMemberEntity> MovieMembers = movieMemberRepository.findByMovieAndUmcommentIsNotNullOrderByUmcommenttimeDesc(movie);

        // 영화 관람평이 없는경우 예외처리
        if (MovieMembers.isEmpty()) {
            throw new MovieCommentNotFoundException("관람평이 없습니다.");
        }

        // 사용자 id 정보를 entity 형으로 변환
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자가 좋아요 누른 영화 관람평 검색
        List<CommentInfoEntity> CommentLikes = commentInfoRepository.findByMember(member);

        // 좋아요 누른 관람평 목록의 관람평 기본키를 List로 변환
        List<Long> CommentLikeList = new ArrayList<>();
        for (CommentInfoEntity CI : CommentLikes) {
            CommentLikeList.add(CI.getMoviemember().getUmid());
        }

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.stream().map(MovieMember ->
                movieCommentMapper.toDto(MovieMember, CommentLikeList.contains(MovieMember.getUmid()))).collect(Collectors.toList());
    }

    // 영화 세부내용 관람평 메소드(공감순)
    @Transactional
    public List<CommentInfoDto> getMovieDetailCommentLike(Long mid, String uid) {

        // 영화 id 정보를 entity 형으로 변환
        MovieEntity movie = MovieEntity.builder()
                .mid(mid).build();

        // 영화 id를 기반으로 MovieMember table 검색(공감순)
        List<MovieMemberEntity> MovieMembers = movieMemberRepository.findAllCommentLikeDESC(movie);

        // 영화 관람평이 없는경우 예외처리
        if (MovieMembers.isEmpty()) {
            throw new MovieCommentNotFoundException("관람평이 없습니다.");
        }

        // 사용자 id 정보를 entity 형으로 변환
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자가 좋아요 누른 영화 관람평 검색
        List<CommentInfoEntity> CommentLikes = commentInfoRepository.findByMember(member);

        // 좋아요 누른 관람평 목록을 HashSet 으로 변환
        Set<Long> CommentLikeSet = new HashSet<>();
        for (CommentInfoEntity CI : CommentLikes) {
            CommentLikeSet.add(CI.getMoviemember().getUmid());
        }

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.stream().map(MovieMember ->
                movieCommentMapper.toDto(MovieMember, CommentLikeSet.contains(MovieMember.getUmid()))).collect(Collectors.toList());
    }
}
