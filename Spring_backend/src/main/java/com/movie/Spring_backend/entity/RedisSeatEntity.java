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
// 사용자가 좌석을 선택하고 결제를 할때 좌석을 잠시 점유하기 위한 entity
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