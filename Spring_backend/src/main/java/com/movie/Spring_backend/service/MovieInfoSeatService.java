package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.MovieInfoSeatDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.MovieInfoSeatEntity;
import com.movie.Spring_backend.mapper.MovieInfoMapper;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieInfoSeatService {
    private final MovieInfoSeatRepository movieInfoSeatRepository;

}
