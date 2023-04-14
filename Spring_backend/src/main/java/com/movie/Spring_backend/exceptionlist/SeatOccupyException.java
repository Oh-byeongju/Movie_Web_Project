package com.movie.Spring_backend.exceptionlist;

import com.movie.Spring_backend.error.exception.BusinessException;
import com.movie.Spring_backend.error.exception.EntityNotFoundException;
import com.movie.Spring_backend.error.exception.ErrorCode;
import com.movie.Spring_backend.error.exception.InvalidValueException;

public class SeatOccupyException extends BusinessException {
    public SeatOccupyException( String message){
        super(message, ErrorCode.OCCUPY_SEAT_NONE);
    }
}
