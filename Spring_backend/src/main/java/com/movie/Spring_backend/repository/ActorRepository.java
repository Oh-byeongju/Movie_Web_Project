package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.ActorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepository extends JpaRepository<ActorEntity, Long>{

    @Query("select actor from ActorEntity as actor where actor.aname= :actor")
    public ActorEntity findByActor(@Param("actor")String actor);
}
