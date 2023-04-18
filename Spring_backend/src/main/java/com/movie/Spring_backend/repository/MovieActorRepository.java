package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieActorEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieActorRepository extends JpaRepository<MovieActorEntity, Long> {
    // 특정 영화에 출연하는 배우 검색하는 메소드
    @EntityGraph(attributePaths = {"actor"})
    List<MovieActorEntity> findByMovie(MovieEntity movie);

    // 배우의 정보까지 묶어서 불러오는 메소드
    @Override
    @EntityGraph(attributePaths = {"actor"})
    List<MovieActorEntity> findAll();





    @Query("select mv from MovieActorEntity as mv where mv.actor.aname in :name and mv.movie.mid = :mid" +
            " and mv.marole = :type")
    List<MovieActorEntity> findByMovieActor (@Param("name")String[] name, @Param("mid") Long mid, @Param("type") String type);


    @Query("select mv from MovieActorEntity as mv where mv.actor.aname = :name and mv.movie.mid = :mid" +
            " and mv.marole = :type")
    MovieActorEntity removeFor (@Param("name")String name, @Param("mid") Long mid, @Param("type") String type);

}
