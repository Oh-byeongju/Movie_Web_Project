package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
// 점유좌석 제한시간은 6분으로 지정
@RedisHash(value = "seat", timeToLive = 360)
@NoArgsConstructor
public class RedisSeatEntity {

    @Id
    private String key;
    private String user;

    @Builder
    public RedisSeatEntity(String key, String user) {
        this.key = key;
        this.user = user;
    }
}