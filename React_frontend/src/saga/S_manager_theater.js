/*
 23-03-29 관리자 페이지 영화관 관련 crud (강경목)
 23-04-17 상영관, 영화관 관리자 페이지 CRUD 리팩토링(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { 
	MANAGER_THEATER_REQUEST, MANAGER_THEATER_SUCCESS, MANAGER_THEATER_FAILURE,
	MANAGER_CINEMA_REQUEST, MANAGER_CINEMA_SUCCESS, MANAGER_CINEMA_FAILURE,
	MANAGER_THEATER_INSERT_REQUEST, MANAGER_THEATER_INSERT_SUCCESS, MANAGER_THEATER_INSERT_FAILURE,
	MANAGER_THEATER_DELETE_REQUEST, MANAGER_THEATER_DELETE_SUCCESS, MANAGER_THEATER_DELETE_FAILURE,


    CINEMA_INSERT_LOADING,CINEMA_INSERT_DONE,CINEMA_INSERT_ERROR,
    MOVIES_REQUEST,MOVIES_SUCCESS,MOVIES_FAILURE,
    MOVIE_INSERT_LOADING,MOVIE_INSERT_DONE,MOVIE_INSERT_ERROR
 } from "../reducer/R_manager_theater";
import { http } from "../lib/http";

// 영화관 조회 함수
function* AllTheater() {
  const result = yield call(callAllTheater);
  if (result.status === 200) {
    yield put({
      type: MANAGER_THEATER_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: MANAGER_THEATER_FAILURE
    });
  }
}

// 영화관 조회 백엔드 호출
async function callAllTheater() {
  return await http.get("/Manager/auth/allTheater")
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 영화관 추가 함수
function* InsertTheater(action) {
  const result = yield call(callInsertTheater, action.data);
  if (result.status === 204) {
    yield put({
      type: MANAGER_THEATER_INSERT_SUCCESS
    });
  } 
  else {
    yield put({
			type: MANAGER_THEATER_INSERT_FAILURE
    });
  }
}

// 영화관 추가 백엔드 호출
async function callInsertTheater(data) {
  return await http.post("/Manager/auth/insertTheater", data)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 영화관 삭제 함수
function* DeleteTheater(action) {
  const result = yield call(callDeleteTheater, action.data);
  if (result.status === 204) {
    yield put({
      type: MANAGER_THEATER_DELETE_SUCCESS
    });
  } 
  else {
    yield put({
			type: MANAGER_THEATER_DELETE_FAILURE
    });
  }
}

// 영화관 삭제 백엔드 호출
async function callDeleteTheater(data) {
  return await http.delete("/Manager/auth/deleteMovieInfo", {
    params: {
      miid: data.miid
    }
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}







// 상영관 조회 함수
function* AllCinema() {
  const result = yield call(callAllCinema);
  if (result.status === 200) {
    yield put({
      type: MANAGER_CINEMA_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: MANAGER_CINEMA_FAILURE
    });
  }
}

// 상영관 조회 백엔드 호출
async function callAllCinema() {
  return await http.get("/Manager/auth/allCinema")
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}



// 아래로 수정
//////###


  //상영관 추가 
function* cinemaInsert(action) {
    const result = yield call(CinemaInsertApi, action.data);
    if (result.status === 200) {
      yield put({
        type: CINEMA_INSERT_DONE,
      });
    } 
    else {
      yield put({
              type: CINEMA_INSERT_ERROR,
              data:result.error
      });
    }
  }
  
  // 상영관 추가 백엔드 호출
  async function CinemaInsertApi(data) {
    return await http.post("/v2/normal/insertcinema",data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  function* Movie(action) {
    const result = yield call(MovieApi, action.data);
    if (result.status === 200) {
      yield put({
        type: MOVIES_SUCCESS,
        data:result.data
      });
    } 
    else {
      yield put({
              type: MOVIES_FAILURE,
              data:result.error
      });
    }
  }
  
  // 상영관 추가 백엔드 호출
  async function MovieApi(data) {
    return await http.get("manager/auth/movieall", {
      params: {
        uid: data,
        button: 'rate',
        search: ''
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  function* MovieInsert(action) {
    const result = yield call(MovieInsertApi, action);
    if (result.status === 200) {
      yield put({
        type: MOVIE_INSERT_DONE,
      });
    } 
    else {
      yield put({
              type: MOVIE_INSERT_ERROR,
              data:result.error
      });
    }
  }
  
  // 상영관 추가 백엔드 호출
  async function MovieInsertApi(data) {
    return await http.post("manager/auth/postmovie", data.fd)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


function* THEATER_LIST() {
	yield takeLatest(MANAGER_THEATER_REQUEST, AllTheater);
}

function* THEATER_INSERT() {
	yield takeLatest(MANAGER_THEATER_INSERT_REQUEST, InsertTheater);
}

function* THEATER_DELETE() {
	yield takeLatest(MANAGER_THEATER_DELETE_REQUEST, DeleteTheater);
}

function* CINEMA_LIST() {
	yield takeLatest(MANAGER_CINEMA_REQUEST, AllCinema);
}


// 아래로 수정




function* CINEMA_INSERT() {
    yield takeLatest(CINEMA_INSERT_LOADING, cinemaInsert);
  }
  function* MOVIE_UPLOAD() {
    yield takeLatest(MOVIES_REQUEST, Movie);
  }
  function* POST_MOVIE() {
    yield takeLatest(MOVIE_INSERT_LOADING, MovieInsert);
  }

export default function* S_manager_theater() {
  yield all([fork(THEATER_LIST),
		fork(THEATER_INSERT),
		fork(THEATER_DELETE),
		fork(CINEMA_LIST),
		// 아래로 수정
		fork(CINEMA_INSERT),
		fork(MOVIE_UPLOAD),
		fork(POST_MOVIE)]);
}
