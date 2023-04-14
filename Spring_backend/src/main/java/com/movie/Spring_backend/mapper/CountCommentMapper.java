package com.movie.Spring_backend.mapper;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CountCommentMapper {
    List<CommentMapper> mapper;
    private Integer count;

    @Builder
    public CountCommentMapper(List<CommentMapper> mapper,Integer count
     ){
        this.mapper=mapper;
        this.count=count;
    }

}
