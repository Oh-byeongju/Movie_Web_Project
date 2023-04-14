package com.movie.Spring_backend.util;

import com.movie.Spring_backend.dto.SeatDto;

import java.util.Comparator;

public class SortUtil implements Comparator<SeatDto> {

    @Override
    public int compare(SeatDto a,SeatDto b){
        if(a.getSid()>b.getSid()) return 1;
        if(a.getSid()<b.getSid()) return -1;
        return 0;
    }


}