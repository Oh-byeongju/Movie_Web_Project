package com.movie.Spring_backend.util;
//마지막 글자 제거
public class RemoveLastChar {
    public static String removeLast(String str) {
        if (str == null || str.length() == 0) {
            return str;
        }
        return str.substring(0, str.length() - 1);
    }

}
