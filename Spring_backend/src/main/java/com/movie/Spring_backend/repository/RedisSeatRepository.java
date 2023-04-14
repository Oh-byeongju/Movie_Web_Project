package com.movie.Spring_backend.repository;
import com.movie.Spring_backend.entity.RedisSeatEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RedisSeatRepository extends CrudRepository<RedisSeatEntity, String> {
    @Override
    List<RedisSeatEntity> findAll();

}
