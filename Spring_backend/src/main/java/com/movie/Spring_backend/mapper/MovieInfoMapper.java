package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TimeTableDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MovieInfoMapper {
    // 극장별로 상영관 및 상영정보를 매핑해주는 메소드(상영시간표에 사용)
    public List<TimeTableDto> MappingTimeTableByTheater(List<String> TheaterNameList, List<CinemaDto> entityList) {

        List<TimeTableDto> timeTables = new ArrayList<>();
        // 반복문 시작하는 위치
        int start = 0;

        // 극장 이름의 개수만큼 반복
        for (String name : TheaterNameList) {
            List<CinemaDto> cinema = new ArrayList<>();

            // 매개변수로 전달받은 CinemaDto 리스트 크기만큼 반복
            for (int i = start; i < entityList.size(); i++) {
                // 반복되고 있는 리스트들의 극장 이름이 같을경우
                if (entityList.get(i).getTname().equals(name)) {
                    // 상영관 배열에 값 추가
                    cinema.add(entityList.get(i));
                    // 반복문의 시작위치 조정을 위해 변수값 조정
                    start++;
                }
                // 극장 이름이 다를경우 break
                else {
                    break;
                }
            }
            // 가공된 정보 삽입
            timeTables.add(TimeTableDto.builder().theaterName(name).cinemaDtoList(cinema).build());
        }
        return timeTables;
    }

    // 영화별로 상영관 및 상영정보를 매핑해주는 메소드(상영시간표에 사용)
    public List<TimeTableDto> MappingTimeTableByMovie(List<Long> MovieIDList, List<CinemaDto> entityList) {

        List<TimeTableDto> timeTables = new ArrayList<>();
        // 반복문 시작하는 위치
        int start = 0;

        // 영화의 개수만큼 반복
        for (Long mid : MovieIDList) {
            List<CinemaDto> cinema = new ArrayList<>();

            // 매개변수로 전달받은 CinemaDto 리스트 크기만큼 반복
            for (int i = start; i < entityList.size(); i++) {
                // 반복되고 있는 리스트들의 영화 ID가 같을경우
                if (entityList.get(i).getMid().equals(mid)) {
                    // 상영관 배열에 값 추가
                    cinema.add(entityList.get(i));
                    // 반복문의 시작위치 조정을 위해 변수값 조정
                    start++;
                }
                // 영화 ID가 다를경우 break
                else {
                    break;
                }
            }
            // 가공된 정보 삽입
            timeTables.add(TimeTableDto.builder()
                    .mid(mid)
                    .mtitle(entityList.get(start-1).getMtitle())
                    .mtime(entityList.get(start-1).getMtime())
                    .mrating(entityList.get(start-1).getMrating())
                    .cinemaDtoList(cinema).build());
        }
        return timeTables;
    }







    public MovieInfoDto CountDto(MovieInfoEntity entity,Long cid,String name, String type,Integer count,Integer allcount) {
        // 예외처리
        if (entity == null) {
            return null;
        }
        return  MovieInfoDto.builder().miid(entity.getMiid()).miday(entity.getMiday()).mistarttime(entity.getMistarttime()).miendtime(entity.getMiendtime()).
        cid(cid).name(name).type(type)  .count(count).allcount(allcount)
                .build();
    }

    public MovieInfoDto Test(MovieInfoEntity entity,Long cid,String name, String type,Integer count,Integer allcount, String area,String title ,Long mid,Long tid
    ,Integer time, String rating,String image) {
        // 예외처리
        if (entity == null) {
            return null;
        }
        return  MovieInfoDto.builder().miid(entity.getMiid()).miday(entity.getMiday()).mistarttime(entity.getMistarttime()).miendtime(entity.getMiendtime()).
                cid(cid).name(name).type(type).count(count).allcount(allcount).area(entity.getCinema().getTheater().getTname()).title(entity.getMovie().getMtitle())
                .mid(entity.getMovie().getMid()).tid(entity.getCinema().getTheater().getTid())
                .time(entity.getMovie().getMtime()).rating(entity.getMovie().getMrating()).image(entity.getMovie().getMimagepath())
                .build();
    }


}
