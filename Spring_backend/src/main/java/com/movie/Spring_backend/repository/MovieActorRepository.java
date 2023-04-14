package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieActorEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieActorRepository extends JpaRepository<MovieActorEntity, Long> {

    // movie id로 엔티디 값 들고오는 메소드
    List<MovieActorEntity> findByMovie(MovieEntity movie);



    @Query("select mv from MovieActorEntity as mv where mv.movie = :movie and mv.marole = :type ")
    @EntityGraph(attributePaths = {"actor"})
    List <MovieActorEntity> findByActor(@Param("movie") MovieEntity movie , @Param("type") String type);


    @Query("select mv from MovieActorEntity as mv where mv.actor.aname in :name and mv.movie.mid = :mid" +
            " and mv.marole = :type")
    List<MovieActorEntity> findByMovieActor (@Param("name")String[] name, @Param("mid") Long mid, @Param("type") String type);


    @Query("select mv from MovieActorEntity as mv where mv.actor.aname = :name and mv.movie.mid = :mid" +
            " and mv.marole = :type")
    MovieActorEntity removeFor (@Param("name")String name, @Param("mid") Long mid, @Param("type") String type);

}
