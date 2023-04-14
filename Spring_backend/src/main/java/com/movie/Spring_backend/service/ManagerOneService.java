/*
  23-04-03 ~ 23-04-05 관리자 페이지 상영정보관리 구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.MovieInfoExistException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.*;
import com.movie.Spring_backend.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.sql.Array;
import java.sql.Date;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagerOneService {
    private final JwtValidCheck jwtValidCheck;
    private final MovieRepository movieRepository;
    private final MovieInfoRepository movieInfoRepository;
    private final ReservationRepository reservationRepository;
    private final MovieActorRepository movieActorRepository;
    private final ActorRepository actorRepository;
    private final CinemaRepository cinemaRepository;
    private final EntityManagerFactory entityManagerFactory;
    private final BoardRepository boardRepository;
    String POSTER_PATH = "/Users/mok/Desktop/Movie_Project/React_frontend/public/img/ranking";


    // 전체 영화 조회 메소드
    public List<MovieDto> getAllMovie(Map<String, String> requestMap) {

        List<MovieEntity> datas = movieRepository.findAll();


        List<MovieDto> movie= new ArrayList<>();
        for(MovieEntity dd : datas){
            List<String > mainactor = new ArrayList<>();
            List<String > subactor = new ArrayList<>();
            List<String > voiceactor = new ArrayList<>();
            List<MovieActorEntity> main = movieActorRepository.findByActor(dd,"주연");
            if(main !=null){
                for(MovieActorEntity aa : main) {
                    mainactor.add(aa.getActor().getAname());
                }
            }
            List<MovieActorEntity> sub = movieActorRepository.findByActor(dd,"조연");
            if(sub !=null){
                for(MovieActorEntity aa : sub) {
                    subactor.add(aa.getActor().getAname());
                }
            }
            List<MovieActorEntity> voice = movieActorRepository.findByActor(dd,"성우");
            if(voice !=null){
                for(MovieActorEntity aa : voice) {
                    voiceactor.add(aa.getActor().getAname());
                }
            }

            movie.add(MovieDto.builder().mid(dd.getMid()).mtitle(dd.getMtitle()).mdir(dd.getMdir()).mdate(dd.getMdate())
                    .mgenre(dd.getMgenre()).mtime(dd.getMtime()).mrating(dd.getMrating()).mimagepath(dd.getMimagepath())
                            .mainactor(mainactor).subactor(subactor).voiceactor(voiceactor)
                    .mstory(dd.getMstory()).build());
        }
        return movie;

    }



    //영화 INSERT
    @Transactional
    public void postMovie(Map<String, String> requestMap, HttpServletRequest request,MultipartFile multipartFiles) throws SQLException {

        jwtValidCheck.JwtCheck(request, "ATK");
        String id = requestMap.get("id").trim();
        String name = requestMap.get("name").trim();  //이름
        String dir = requestMap.get("dir").trim();    //감독
        String genre = requestMap.get("genre").trim();//장르
        String time = requestMap.get("time").trim();  //상영시간
        String date = requestMap.get("date").trim();  //날짜
        String rating = requestMap.get("rating").trim(); //래잉
        String story = requestMap.get("story").trim();//줄거리
        String state = requestMap.get("state").trim();//줄거리
        String imagepath = null;
        if (multipartFiles != null) {
            String path = AxiosFileTest(multipartFiles);  //이미지 주소
            imagepath = path.substring(path.lastIndexOf("img/")); //sql에 저장하는 이름을 지정해주기 위함
        }


        EntityManager entityManager = entityManagerFactory.createEntityManager();


        String main = requestMap.get("main").trim();//주연배우
        String[] mainactor = main.split(",");
        String sub = requestMap.get("sub").trim();//조연배우
        String[] subactor = sub.split(",");
        String voice = requestMap.get("voice").trim();//성우
        String[] voiceactor = voice.split(",");


        if (state.equals("insert")) {
            MovieEntity movieEntity;
            movieEntity = MovieEntity.builder().
                    mtitle(name)
                    .mdir(dir)
                    .mgenre(genre)
                    .mtime(Integer.parseInt(time))
                    .mdate(Date.valueOf(date))
                    .mrating(rating)
                    .mstory(story)
                    .mimagepath(imagepath).build();


            movieRepository.save(movieEntity);
            MovieEntity movies = movieRepository.findByMovie(movieEntity);

            if (mainactor.length > 0) {
                for (String mm : mainactor) {
                    ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                    ActorEntity empty;
                    if (actor == null) {                        //actor가 없으면
                        empty = ActorEntity.builder()
                                .aname(mm)
                                .abirthplace("서울")
                                .build();
                        actorRepository.save(empty);                               //배우추가
                        ActorEntity actorid = actorRepository.findByActor(mm);  //추가한 id를 찾는다.

                        MovieActorEntity movieActorEntity = null;                   //영화와 배우로 주연배우 추가
                        movieActorEntity = movieActorEntity.builder()
                                .marole("주연")
                                .actor(actorid)
                                .movie(movies)
                                .build();

                        movieActorRepository.save(movieActorEntity);
                    } else {                                                            //배우가 있으면
                        ActorEntity actorid = actorRepository.findByActor(mm);    //배우 아이디를 찾은 후

                        MovieActorEntity movieActorEntity = null;                     //영화와 배우로 주연배우 추가
                        movieActorEntity = movieActorEntity.builder()
                                .marole("주연")
                                .actor(actorid)
                                .movie(movies)
                                .build();

                        movieActorRepository.save(movieActorEntity);
                    }
                }
            }


            if (subactor.length > 0) {
                for (String mm : subactor) {
                    ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                    ActorEntity empty;
                    if (actor == null) {                        //actor가 없으면
                        empty = ActorEntity.builder()
                                .aname(mm)
                                .abirthplace("서울")
                                .build();
                        actorRepository.save(empty);                               //배우추가
                        ActorEntity actorid = actorRepository.findByActor(mm);  //추가한 id를 찾는다.

                        MovieActorEntity movieActorEntity = null;                   //영화와 배우로 주연배우 추가
                        movieActorEntity = movieActorEntity.builder()
                                .marole("조연")
                                .actor(actorid)
                                .movie(movies)
                                .build();

                        movieActorRepository.save(movieActorEntity);
                    } else {                                                            //배우가 있으면
                        ActorEntity actorid = actorRepository.findByActor(mm);    //배우 아이디를 찾은 후

                        MovieActorEntity movieActorEntity = null;                     //영화와 배우로 주연배우 추가
                        movieActorEntity = movieActorEntity.builder()
                                .marole("조연")
                                .actor(actorid)
                                .movie(movies)
                                .build();

                        movieActorRepository.save(movieActorEntity);
                    }
                }
            }

            if (voiceactor.length > 0) {
                for (String mm : voiceactor) {
                    ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                    ActorEntity empty;
                    if (actor == null) {                        //actor가 없으면
                        empty = ActorEntity.builder()
                                .aname(mm)
                                .abirthplace("서울")
                                .build();
                        actorRepository.save(empty);                               //배우추가
                        ActorEntity actorid = actorRepository.findByActor(mm);  //추가한 id를 찾는다.

                        MovieActorEntity movieActorEntity = null;                   //영화와 배우로 주연배우 추가
                        movieActorEntity = movieActorEntity.builder()
                                .marole("성우")
                                .actor(actorid)
                                .movie(movies)
                                .build();

                        movieActorRepository.save(movieActorEntity);
                    } else {                                                            //배우가 있으면
                        ActorEntity actorid = actorRepository.findByActor(mm);    //배우 아이디를 찾은 후

                        MovieActorEntity movieActorEntity = null;                     //영화와 배우로 주연배우 추가
                        movieActorEntity = movieActorEntity.builder()
                                .marole("성우")
                                .actor(actorid)
                                .movie(movies)
                                .build();

                        movieActorRepository.save(movieActorEntity);
                    }
                }

            }
        } else if (state.equals("update")) {
            //변경된 부부만 교체하는 메소드
            MovieEntity movies = MovieEntity.builder().mid(Long.valueOf(id)).build();
            entityManager.getTransaction().begin();
            MovieEntity transmovie = movieRepository.findByMovie(movies);
            if(imagepath == null){
                imagepath= transmovie.getMimagepath();
            }
            transmovie.updateMovie(Long.valueOf(id), name, dir, genre, Integer.valueOf(time), Date.valueOf(date), rating, story, imagepath);
            entityManager.getTransaction().commit();  //트렌잭션이 끝나도 아무런 업데이트가 일어나지 않는다.
            System.out.println("update");
            //영화 수정 끄읕

            //배우 수정
            //주연
            //없는 배우들은 넣어줘야한다.
            if (mainactor.length != 0) {
                {
                    for (String mm : mainactor) {
                        ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                        ActorEntity empty;
                        if (actor == null) {                        //actor가 없으면
                            empty = ActorEntity.builder()
                                    .aname(mm)
                                    .abirthplace("서울")
                                    .build();
                            actorRepository.save(empty);                               //배우추가
                        }
                        System.out.println("주연배우추가ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
                    }
                    //기존 배우
                    List<String> originactor = new ArrayList<>();
                    List<MovieActorEntity> movieActor = movieActorRepository.findByActor(movies, "주연"); //영화로 검색한 배우
                    for (MovieActorEntity mapped : movieActor) {
                        originactor.add(mapped.getActor().getAname());
                    }
                    //new 배우
                    List<String> newactor = new ArrayList<>(Arrays.asList(mainactor));
                    //검색 된 배우
                    originactor.removeAll(newactor);  // 제거 리스트
                    newactor.removeAll(originactor);  // 추가 리스트
                    System.out.println(originactor.toString());
                    System.out.println(newactor.toString());
                    for (String aacc : originactor) {
                        MovieActorEntity removeactor = movieActorRepository.removeFor(aacc, Long.valueOf(id), "주연");
                        movieActorRepository.delete(removeactor);
                    }

                    for (String aacc : newactor) {
                        MovieActorEntity removeactor = movieActorRepository.removeFor(aacc, Long.valueOf(id), "주연");
                        if (removeactor == null) {
                            MovieActorEntity newactors = null;
                            newactors = MovieActorEntity.builder()
                                    .marole("주연")
                                    .movie(MovieEntity.builder().mid(Long.valueOf(id)).build())
                                    .actor(actorRepository.findByActor(aacc))
                                    .build();

                            movieActorRepository.save(newactors);
                        }

                    }
                }
            }
                //-------------------------------------------------------조연
                if (subactor.length != 0) {
                    for (String mm : subactor) {
                        ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                        ActorEntity empty;
                        if (actor == null) {                        //actor가 없으면
                            empty = ActorEntity.builder()
                                    .aname(mm)
                                    .abirthplace("서울")
                                    .build();
                            actorRepository.save(empty);
                            System.out.println("조연배우추가ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");//배우 추가
                        }
                    }
                    //조연
                    //기존 조연 배우
                    List<String> originsubactor = new ArrayList<>();
                    List<MovieActorEntity> moviesubActor = movieActorRepository.findByActor(movies, "조연"); //영화로 검색한 배우
                    for (MovieActorEntity mapped : moviesubActor) {
                        originsubactor.add(mapped.getActor().getAname());
                    }
                    //new 배우
                    List<String> newsubactor = new ArrayList<>(Arrays.asList(subactor));
                    //검색 된 배우
                    originsubactor.removeAll(newsubactor);  // 제거 리스트
                    newsubactor.removeAll(originsubactor);  // 추가 리스트
                    for (String aacc : originsubactor) {
                        MovieActorEntity removeactor = movieActorRepository.removeFor(aacc, Long.valueOf(id), "조연");
                        movieActorRepository.delete(removeactor);
                    }

                    for (String aacc : newsubactor) {
                        MovieActorEntity removeactor = movieActorRepository.removeFor(aacc, Long.valueOf(id), "조연");
                        if (removeactor == null) {
                            MovieActorEntity newactors = null;
                            newactors = MovieActorEntity.builder()
                                    .marole("조연")
                                    .movie(MovieEntity.builder().mid(Long.valueOf(id)).build())
                                    .actor(actorRepository.findByActor(aacc))
                                    .build();
                            movieActorRepository.save(newactors);
                        }
                    }
                }
                //-------------------------------------------------------성우
                if (voiceactor.length != 0) {
                    for (String mm : voiceactor) {
                        ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                        ActorEntity empty;
                        if (actor == null) {                        //actor가 없으면
                            empty = ActorEntity.builder()
                                    .aname(mm)
                                    .abirthplace("서울")
                                    .build();
                            actorRepository.save(empty);
                            System.out.println("성웇푸가ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");//배우 추가
                        }
                    }

                    //조연
                    //기존 조연 배우
                    List<String> originvoiceactor = new ArrayList<>();
                    List<MovieActorEntity> movievoiceActor = movieActorRepository.findByActor(movies, "성우"); //영화로 검색한 배우
                    for (MovieActorEntity mapped : movievoiceActor) {
                        originvoiceactor.add(mapped.getActor().getAname());
                    }
                    //new 배우
                    List<String> newvoiceactor = new ArrayList<>(Arrays.asList(voiceactor));
                    //검색 된 배우
                    originvoiceactor.removeAll(newvoiceactor);  // 제거 리스트
                    newvoiceactor.removeAll(originvoiceactor);  // 추가 리스트
                    for (String aacc : originvoiceactor) {
                        MovieActorEntity removeactor = movieActorRepository.removeFor(aacc, Long.valueOf(id), "성우");
                        movieActorRepository.delete(removeactor);
                    }

                    for (String aacc : newvoiceactor) {
                        MovieActorEntity removeactor = movieActorRepository.removeFor(aacc, Long.valueOf(id), "성우");
                        if (removeactor == null) {
                            MovieActorEntity newactors = null;
                            newactors = MovieActorEntity.builder()
                                    .marole("성우")
                                    .movie(MovieEntity.builder().mid(Long.valueOf(id)).build())
                                    .actor(actorRepository.findByActor(aacc))
                                    .build();
                            movieActorRepository.save(newactors);
                        }

                    }
                }
            }
        }

    //포스터를 저장
    public String AxiosFileTest (MultipartFile multipartFiles) throws SQLException {


        Map<String,Object> resultMap = new HashMap<String,Object>();
        String FileNames ="";
        System.out.println("paramMap =>"+multipartFiles);


            String originFileName = multipartFiles.getOriginalFilename(); // 원본 파일 명
            long fileSize = multipartFiles.getSize(); // 파일 사이즈
            System.out.println("originFileName : " + originFileName);
            System.out.println("fileSize : " + fileSize);

            String safeFile =System.currentTimeMillis() + originFileName;

            FileNames =safeFile;
            try {
                File f1 = new File(POSTER_PATH,safeFile);
                //업로드 주소 , 파일명
                multipartFiles.transferTo(f1);
                //저장
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

        Map<String, Object> paramMap = new HashMap<String, Object>();
        System.out.println("FileNames =>"+ FileNames);
        resultMap.put("JavaData", paramMap);
        return POSTER_PATH +"/" + FileNames;
    }

    //전체 게시판 불러오기
    public List<BoardDto> ReadBoard (){

        List<BoardEntity> boardEntities =boardRepository.findAll();
        return boardEntities.stream().map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .thumb(data.getThumb()).uid(data.getMember().getUid()).
                build()).collect(Collectors.toList());

    }

    //페이지내 이름으로 검색하는 메소드
    @Transactional
    public List<BoardDto> SearchUid(String text, String state) {
        if(state.equals("uid")) {
            List<BoardEntity> datas = boardRepository.ManagerUid(text);
            return datas.stream().map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                    .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                    .thumb(data.getThumb()).uid(data.getMember().getUid()).
                    build()).collect(Collectors.toList());
        }

        else if(state.equals("title")){
            List<BoardEntity> datas = boardRepository.ManagerTitle(text);
            return datas.stream().map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                    .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                    .thumb(data.getThumb()).uid(data.getMember().getUid()).
                    build()).collect(Collectors.toList());
        }
        return null;
    }

    @Transactional
    public void boarddelete(Map<String, String> requestMap, HttpServletRequest request){
        String bid = requestMap.get("bid");
        boardRepository.deleteById(Long.valueOf(bid));
    }

    // 전체 상영관 불러오는 메소드
    public List<CinemaDto> AllCinemaSearch(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 모든 상영관 검색
        List<CinemaEntity> Cinemas = cinemaRepository.findAll();

        // 검색한 상영관 리턴
        return Cinemas.stream().map(cinema -> CinemaDto.builder()
                .cid(cinema.getCid())
                .cname(cinema.getCname() + " (" + cinema.getCtype() + ", " + cinema.getCseat() + "좌석)")
                .tid(cinema.getTheater().getTid())
                .build()).collect(Collectors.toList());
    }

    // 상영정보를 불러오는 메소드
    public Page<MovieInfoDto> MovieInfoSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        String mid = requestMap.get("mid");
        String tarea = requestMap.get("tarea");
        String tid = requestMap.get("tid");
        String startDay = requestMap.get("startDay");
        String endDay = requestMap.get("endDay");
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // 프론트단에서 영화를 선택 안했을경우 파라미터를 null로 주기위한 과정
        MovieEntity movie = null;
        if (mid != null) {
            movie = MovieEntity.builder().mid(Long.valueOf(mid)).build();
        }

        // 프론트단에서 극장을 선택 안했을경우 파라미터를 null로 주기위한 과정
        Long theater = null;
        if (tid != null) {
            theater = Long.valueOf(tid);
        }

        // 프론트단에서 날짜를 선택 안했을경우 파라미터를 null로 주기위한 과정
        Date Start = null;
        Date End = null;
        if (startDay != null) {
            Start = Date.valueOf(startDay);
        }
        if (endDay != null) {
            End = Date.valueOf(endDay);
        }

        // 프론트단에서 보낸 조건을 이용해서 상영정보 검색
        Page<MovieInfoEntity> MovieInfos = movieInfoRepository.findManagerMovieInfo(movie, Start, End, theater, tarea, PageInfo);

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = MovieInfos.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            MovieInfos = movieInfoRepository.findManagerMovieInfo(movie, Start, End, theater, tarea, PageInfo);
        }

        return MovieInfos.map(movieInfo -> MovieInfoDto.builder()
                .mid(movieInfo.getMovie().getMid())
                .miid(movieInfo.getMiid())
                .mtitle(movieInfo.getMovie().getMtitle())
                .mdate(movieInfo.getMovie().getMdate())
                .tid(movieInfo.getCinema().getTheater().getTid())
                .cid(movieInfo.getCinema().getCid())
                .tarea(movieInfo.getCinema().getTheater().getTarea())
                .tname(movieInfo.getCinema().getTheater().getTname())
                .cname(movieInfo.getCinema().getCname())
                .miday(movieInfo.getMiday())
                .mistarttime(movieInfo.getMistarttime())
                .miendtime(movieInfo.getMiendtime())
                .allcount(movieInfo.getCinema().getCseat())
                .count(movieInfo.getCntSeatInfo()).build());
    }

    // 상영정보를 추가하는 메소드
    @Transactional
    public void MovieInfoInsert(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long mid = Long.valueOf(requestMap.get("mid"));
        Long cid = Long.valueOf(requestMap.get("cid"));
        String insertStartDay = requestMap.get("insertStartDay");
        String insertEndDay = requestMap.get("insertEndDay");

        // 상영정보 추가에 필요한 정보 Entity로 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();
        CinemaEntity cinema = CinemaEntity.builder().cid(cid).build();

        // 상영정보간 시간 확인
        String CheckStart = DateUtil.ChangeDate(insertStartDay+":00", -1799);
        String CheckEnd = DateUtil.ChangeDate(insertEndDay+":00", +1799);
        List<MovieInfoEntity> CheckInfo = movieInfoRepository.findExistMovieInfo(cinema, CheckStart, CheckEnd);

        // 상영정보를 추가 못할경우 예외처리
        if (!CheckInfo.isEmpty()) {
            throw new MovieInfoExistException("상영정보간 시간 간격이 너무 짧습니다.");
        }

        // 상영정보 추가
        movieInfoRepository.save(MovieInfoEntity.builder()
                .miday(Date.valueOf(insertStartDay.substring(0, 10)))
                .mistarttime(insertStartDay+":00")
                .miendtime(insertEndDay+":00")
                .movie(movie)
                .cinema(cinema).build());
    }

    // 상영정보를 삭제하는 메소드
    @Transactional
    public void MovieInfoDelete(HttpServletRequest request, Long miid) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // JPA 사용을 위한 형 변환
        MovieInfoEntity movieInfo = MovieInfoEntity.builder().miid(miid).build();

        // 상영정보 삭제전 상영정보에 대한 예매기록 조회
        List<ReservationEntity> reservation = reservationRepository.findByMovieInfo(movieInfo);

        // 예매기록이 존재할경우 예외처리
        if(!reservation.isEmpty()) {
            throw new MovieInfoExistException("상영정보에 예매 기록이 존재합니다.");
        }

        // 상영정보 삭제
        movieInfoRepository.deleteById(miid);
    }

    // 상영정보를 수정하는 메소드
    @Transactional
    public void MovieInfoUpdate(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long miid = Long.valueOf(requestMap.get("miid"));
        Long mid = Long.valueOf(requestMap.get("mid"));
        Long cid = Long.valueOf(requestMap.get("cid"));
        String updateStartDay = requestMap.get("updateStartDay");
        String updateEndDay = requestMap.get("updateEndDay");

        // 상영정보 수정에 필요한 정보 Entity로 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();
        CinemaEntity cinema = CinemaEntity.builder().cid(cid).build();
        MovieInfoEntity movieInfo = MovieInfoEntity.builder().miid(miid).build();

        // 상영정보간 시간 확인
        String CheckStart = DateUtil.ChangeDate(updateStartDay+":00", -1799);
        String CheckEnd = DateUtil.ChangeDate(updateEndDay+":00", +1799);
        List<MovieInfoEntity> CheckInfo = movieInfoRepository.findExistMovieInfo(cinema, CheckStart, CheckEnd);

        // 상영정보를 수정 못할경우 예외처리
        for (MovieInfoEntity MI : CheckInfo) {
            if (!Objects.equals(MI.getMiid(), miid)) {
                throw new MovieInfoExistException("상영정보간 시간 간격이 너무 짧습니다.");
            }
        }

        // 상영정보 수정전 상영정보에 대한 예매기록 조회
        List<ReservationEntity> reservation = reservationRepository.findByMovieInfo(movieInfo);

        // 예매기록이 존재할경우 예외처리
        if(!reservation.isEmpty()) {
            throw new MovieInfoExistException("상영정보에 예매 기록이 존재합니다.");
        }

        // 상영정보 수정
        movieInfoRepository.MovieInfoUpdate(miid, Date.valueOf(updateStartDay.substring(0, 10)),
                updateStartDay+":00", updateEndDay+":00", movie, cinema);
    }
}
