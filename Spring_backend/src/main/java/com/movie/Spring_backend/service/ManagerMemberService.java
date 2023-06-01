/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
  23-03-28 ~ 30 관리자 페이지 사용자 예매 현황 구현(오병주)
  23-03-31 ~ 23-04-01 관리자 페이지 관람평 관리 구현(오병주)
  23-05-30 ~ 23-06-01 관리자 페이지 게시물 관리 구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.MovieCommentMapper;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagerMemberService {
    private final MemberRepository memberRepository;
    private final MovieRepository movieRepository;
    private final ReservationRepository reservationRepository;
    private final MovieMemberRepository movieMemberRepository;
    private final CommentInfoRepository commentInfoRepository;
    private final BoardRepository boardRepository;
    private final BoardCommentRepository boardCommentRepository;
    private final MovieMapper movieMapper;
    private final MovieCommentMapper movieCommentMapper;
    private final JwtValidCheck jwtValidCheck;

    // 유저 조회 메소드
    @Transactional
    public Page<MemberDto> AllMemberSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        String search = requestMap.get("search");
        String sort = requestMap.get("sort");
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        Page<MemberEntity> Members;
        // 사용자를 이름순으로 정렬후 조회(검색된 단어 포함)
        if (sort.equals("name")) {
            Members = memberRepository.findByUidContainingOrderByUnameAsc(search, PageInfo);
        }
        // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
        else {
            Members = memberRepository.findByUidContainingOrderByUjoindateAsc(search, PageInfo);
        }

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = Members.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            if (sort.equals("name")) {
                Members = memberRepository.findByUidContainingOrderByUnameAsc(search, PageInfo);
            }
            // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
            else {
                Members = memberRepository.findByUidContainingOrderByUjoindateAsc(search, PageInfo);
            }
        }

        // 필요한 정보를 dto로 매핑 후 리턴
        return Members.map(member -> MemberDto.builder()
                        .uid(member.getUid())
                        .uname(member.getUname())
                        .uemail(member.getUemail())
                        .utel(member.getUtel())
                        .uaddr(member.getUaddr())
                        .uaddrsecond(member.getUaddrsecond())
                        .ubirth(member.getUbirth())
                        .ujoindate(member.getUjoindate()).build());
    }

    // 유저 추방 메소드
    @Transactional
    public Page<MemberDto> DropMember(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        String uid = requestMap.get("uid");
        String search = requestMap.get("search");
        String sort = requestMap.get("sort");
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 사용자 테이블에서 사용자 제거(연관된 DB 내용은 CascadeType.REMOVE 때문에 연쇄 삭제)
        memberRepository.deleteById(uid);

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        Page<MemberEntity> Members;
        // 사용자를 이름순으로 정렬후 조회(검색된 단어 포함)
        if (sort.equals("name")) {
            Members = memberRepository.findByUidContainingOrderByUnameAsc(search, PageInfo);
        }
        // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
        else {
            Members = memberRepository.findByUidContainingOrderByUjoindateAsc(search, PageInfo);
        }

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = Members.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            if (sort.equals("name")) {
                Members = memberRepository.findByUidContainingOrderByUnameAsc(search, PageInfo);
            }
            // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
            else {
                Members = memberRepository.findByUidContainingOrderByUjoindateAsc(search, PageInfo);
            }
        }

        // 필요한 정보를 dto로 매핑 후 리턴
        return Members.map(member -> MemberDto.builder()
                .uid(member.getUid())
                .uname(member.getUname())
                .uemail(member.getUemail())
                .utel(member.getUtel())
                .uaddr(member.getUaddr())
                .uaddrsecond(member.getUaddrsecond())
                .ubirth(member.getUbirth())
                .ujoindate(member.getUjoindate()).build());
    }

    // 예매기록 페이지에서 전체 영화 불러오는 메소드
    @Transactional
    public List<MovieDto> AllMovieSearch(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 영화 테이블에 존재하는 모든 영화 검색(개봉일순으로 오름차순)
        List<MovieEntity> Movies = movieRepository.findAllByOrderByMdateAsc();

        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> MoviePossible = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화의 기본키를 List로 변환
        List<Long> MoviePossibleList = new ArrayList<>();
        for (MovieEntity m : MoviePossible) {
            MoviePossibleList.add(m.getMid());
        }

        // 위에서 검색한 영화 목록과 예매 가능 여부, 전체 예매 횟수를 mapping 후 리턴
        return Movies.stream().map(movie ->
                movieMapper.toDtoManagerReserve(movie, MoviePossibleList.contains(movie.getMid()))).collect(Collectors.toList());
    }

    // 특정 영화의 예매기록을 불러오는 메소드
    @Transactional
    public Page<ReservationDto> MovieReserveSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long mid = Long.valueOf(requestMap.get("mid"));
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // JPA 사용을 위한 형 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();

        // 특정 영화의 모든 예매기록 검색(예매일 순으로 내림차순)
        Page<ReservationEntity> Reservations = reservationRepository.findManagerReserveMovie(movie, PageInfo);

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = Reservations.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            Reservations = reservationRepository.findManagerReserveMovie(movie, PageInfo);
        }

        // 예매기록을 매핑 후 리턴
        return Reservations.map(reservation -> ReservationDto.builder()
                .rid(reservation.getRid())
                .uid(reservation.getMember().getUid())
                .rdate(reservation.getRdate())
                .tarea(reservation.getMovieInfo().getCinema().getTheater().getTarea())
                .tname(reservation.getMovieInfo().getCinema().getTheater().getTname())
                .cname(reservation.getMovieInfo().getCinema().getCname())
                .mistarttime(reservation.getMovieInfo().getMistarttime())
                .rpeople(reservation.getRpeople())
                .rticket(reservation.getRticket())
                .rpaytype(reservation.getRpaytype())
                .rprice(reservation.getRprice()).build());
    }

    // 특정 극장의 예매기록을 불러오는 메소드
    @Transactional
    public Page<ReservationDto> TheaterReserveSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long tid = Long.valueOf(requestMap.get("tid"));
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // JPA 사용을 위한 형 변환
        TheaterEntity theater = TheaterEntity.builder().tid(tid).build();

        // 특정 극장의 예매기록 검색(예매일 순으로 내림차순)
        Page<ReservationEntity> Reservations = reservationRepository.findManagerReserveTheater(theater, PageInfo);

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = Reservations.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            Reservations = reservationRepository.findManagerReserveTheater(theater, PageInfo);
        }

        // 예매기록을 매핑 후 리턴
        return Reservations.map(reservation -> ReservationDto.builder()
                .rid(reservation.getRid())
                .uid(reservation.getMember().getUid())
                .mtitle(reservation.getMovieInfo().getMovie().getMtitle())
                .rdate(reservation.getRdate())
                .tarea(reservation.getMovieInfo().getCinema().getTheater().getTarea())
                .tname(reservation.getMovieInfo().getCinema().getTheater().getTname())
                .cname(reservation.getMovieInfo().getCinema().getCname())
                .mistarttime(reservation.getMovieInfo().getMistarttime())
                .rpeople(reservation.getRpeople())
                .rticket(reservation.getRticket())
                .rpaytype(reservation.getRpaytype())
                .rprice(reservation.getRprice()).build());
    }

    // 특정 영화에 있는 관람평을 가져오는 메소드
    @Transactional
    public List<CommentInfoDto> MovieCommentSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long mid = Long.valueOf(requestMap.get("mid"));

        // 영화 id 정보를 entity 형으로 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();

        // 영화 id를 기반으로 MovieMember table 검색(최신순)
        List<MovieMemberEntity> MovieMembers = movieMemberRepository.findByMovieAndUmcommentIsNotNullOrderByUmcommenttimeDesc(movie);

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.stream().map(movieMember -> movieCommentMapper.toDto(movieMember, false)).collect(Collectors.toList());
    }

    // 특정 영화에 있는 관람평을 삭제하는 메소드
    @Transactional
    public void MovieCommentDelete(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long umid = Long.valueOf(requestMap.get("umid"));

        // 관람평 id를 이용해서 관람평 튜플 검색
        MovieMemberEntity MovieMember = movieMemberRepository.findById(umid).orElse(null);

        // 영화에 대한 좋아요 기록이 있으면 튜플 update
        if (MovieMember != null && MovieMember.getUmlike() != null && MovieMember.getUmlike()) {
            // 튜플 update 시 필요한 entity 생성
            MemberEntity Member = MemberEntity.builder().uid(MovieMember.getMember().getUid()).build();
            MovieEntity Movie = MovieEntity.builder().mid(MovieMember.getMovie().getMid()).build();

            // 관람평에 대한 내용을 모두 null 로 교체
            movieMemberRepository.MovieCommentNull(Member, Movie);
            // 관람평에 적용됐던 좋아요 모두 삭제
            commentInfoRepository.deleteByMoviemember(MovieMember);
        }
        // 영화에 대한 좋아요 기록이 없을경우 바로 MovieMember 튜플 제거
        else {
            movieMemberRepository.deleteById(umid);
        }
    }

    // 게시물 조회 메소드
    public List<BoardDto> getBoard(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 게시물 조회 후 리턴
        List<BoardEntity> Boards = boardRepository.findAll();

        return Boards.stream().map(board -> BoardDto.builder()
                .bid(board.getBid())
                .btitle(board.getBtitle())
                .bdetail(board.getBdetail())
                .bdate(board.getBdate())
                .bclickindex(board.getBclickindex())
                .bcategory(board.getBcategory())
                .uid(board.getMember().getUid())
                .likes(board.getLikes())
                .unlikes(board.getUnlikes())
                .commentCounts(board.getCommentCounts()).build()).collect(Collectors.toList());
    }

    // 게시물 검색 메소드
    public List<BoardDto> getSearchBoard(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 안에 정보를 추출
        String category = requestMap.get("category");
        String title = requestMap.get("title").trim();

        // 게시물 검색
        List<BoardEntity> Boards;
        if (category.equals("title")) {
            Boards = boardRepository.findByBtitleContainsOrderByBidAsc(title);
        }
        else {
            Boards = boardRepository.findByMemberUidContainsOrderByBidAsc(title);
        }

        return Boards.stream().map(board -> BoardDto.builder()
                .bid(board.getBid())
                .btitle(board.getBtitle())
                .bdetail(board.getBdetail())
                .bdate(board.getBdate())
                .bclickindex(board.getBclickindex())
                .bcategory(board.getBcategory())
                .uid(board.getMember().getUid())
                .likes(board.getLikes())
                .unlikes(board.getUnlikes())
                .commentCounts(board.getCommentCounts()).build()).collect(Collectors.toList());
    }

    // 게시물 삭제 메소드
    @Transactional
    public void BoardDelete(HttpServletRequest request, Long bid){
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 게시물 삭제
        boardRepository.deleteById(bid);
    }

    // 댓글 조회하는 메소드
    @Transactional
    public CountCommentDto getComment(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 안에 정보를 추출
        Long bid = Long.valueOf(requestMap.get("bid"));
        String sort = requestMap.get("sort");

        // 댓글 조회에 필요한 정보 Entity형으로 변환
        BoardEntity board = BoardEntity.builder().bid(bid).build();

        // 정렬에 따른 최상위 부모 댓글 조회
        List<BoardCommentEntity> boardComments;
        if (sort.equals("like")) {
            boardComments = boardCommentRepository.findByCommentLike(board);
        }
        else {
            boardComments = boardCommentRepository.findByBoardAndBcrootIsNullOrderByBcidDesc(board);
        }

        // 전체 답글조회(작성 시간순으로 최신순)
        List<BoardCommentEntity> boardReply = boardCommentRepository.findByBoardAndBcrootIsNotNullOrderByBcrootAscBcparentAscBcidDesc(board);

        // 댓글 개수 count
        int count = 0;

        // 최상위 부모 댓글 매핑
        HashMap<Long, BoardCommentDto> result = new LinkedHashMap<>();
        for (BoardCommentEntity BC : boardComments) {
            result.put(BC.getBcid(), BoardCommentDto.builder()
                    .bcid(BC.getBcid())
                    .bccomment(BC.getBccomment())
                    .bcdate(BC.getBcdate())
                    .likes(BC.getLikes())
                    .unlikes(BC.getUnlikes())
                    .uid(BC.getMember().getUid())
                    .child(new ArrayList<>()).build());
            count++;
        }

        // 답글 매핑
        for (BoardCommentEntity BC : boardReply) {
            // 답글 중 최상위 답글일경우 답글을 그냥 삽입
            if (BC.getBcroot().equals(BC.getBcparent())) {
                result.get(BC.getBcroot()).getChild().add(0, BoardCommentDto.builder()
                        .bcid(BC.getBcid())
                        .bccomment(BC.getBccomment())
                        .bcdate(BC.getBcdate())
                        .bcroot(BC.getBcroot())
                        .uid(BC.getMember().getUid()).build());
            }
            else {
                // 최상위 부모 댓글의 자식들을 추출
                List<BoardCommentDto> temp = result.get(BC.getBcroot()).getChild();

                // 현재 답글 리스트중 자신의 부모를 찾은 뒤 다음 인덱스에 정보 삽입
                for (int i = 0; i < temp.size(); i++) {
                    if (temp.get(i).getBcid().equals(BC.getBcparent())) {
                        temp.add(i + 1, BoardCommentDto.builder()
                                .bcid(BC.getBcid())
                                .bccomment(BC.getBccomment())
                                .bcdate(BC.getBcdate())
                                .bcroot(BC.getBcroot())
                                .uid(BC.getMember().getUid())
                                .parentUid(temp.get(i).getUid()).build());
                    }
                }
            }
            count++;
        }

        // 댓글의 총개수 + 댓글내용을 리턴
        return CountCommentDto.builder().count(count).content(new ArrayList<>(result.values())).build();
    }

    // 댓글 삭제 메소드
    @Transactional
    public void CommentDelete(HttpServletRequest request, Long bcid){
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 댓글 및 답글 모두 제거
        boardCommentRepository.deleteByBcroot(bcid);
        boardCommentRepository.deleteById(bcid);
    }

    // 답글 삭제 메소드
    @Transactional
    public void ReplyDelete(HttpServletRequest request, Long bcid) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 현재 답글과 관련된 모든 답글들을 제거하기위해 List선언 및 현재답글의 id값 삽입
        List<Long> delList = new ArrayList<>();
        delList.add(bcid);

        // List가 비어 있을때 까지 반복
        while (!delList.isEmpty()) {
            // List의 제일 앞 인덱스 값 추출 후 자식 답글들 검색
            long delNum = delList.get(0);
            List<BoardCommentEntity> boardComments = boardCommentRepository.findByBcparent(delNum);

            // 자식들의 id값 리스트에 삽입
            for (BoardCommentEntity BC : boardComments) {
                delList.add(BC.getBcid());
            }

            // 제일 앞 인덱스 값 답글 삭제 및 List에서 제거
            boardCommentRepository.deleteById(delNum);
            delList.remove(0);
        }
    }
}
