package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.SeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<SeatEntity,Long> {
    List<SeatEntity> findByCinemaCid(Long id);
    List<SeatEntity> findAll();


}
