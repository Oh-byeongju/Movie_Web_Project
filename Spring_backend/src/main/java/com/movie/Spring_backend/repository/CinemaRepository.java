package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CinemaRepository extends JpaRepository<CinemaEntity, Long> {

    @Override
    @EntityGraph(attributePaths = {"theater"})
    List<CinemaEntity> findAll();


    public List<CinemaEntity> findByTheater(TheaterEntity id);


    //상영관 수정
    @Modifying
    @Query("update CinemaEntity set cname = :cname , ctype = :ctype , cseat = :cseat where cid=:cid")
    public void updateCinema(@Param("cname") String cname, @Param("ctype") String ctype, @Param("cseat") Integer cseat,
                             @Param("cid") Long cid);


    @Procedure("loopInsert")
    public int loopInsert(Integer count);

}
//디비접근

