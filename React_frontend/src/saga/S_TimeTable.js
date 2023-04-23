import { DAY_REQUEST, DAY_SUCCESS, MOVIE_FAILURE, MOVIE_REQUEST, MOVIE_SUCCESS, MOVIE_DATAS,SELECT_SC_THEATER_FAILURE, SELECT_SC_THEATER_REQUEST, SELECT_SC_THEATER_SUCCESS } from "../reducer/R_TimeTable";
// 위에꺼 나중에 날리기
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { 
	TIMETABLE_MOVIE_LIST_REQUEST, TIMETABLE_MOVIE_LIST_SUCCESS, TIMETABLE_MOVIE_LIST_FAILURE,
	TIMETABLE_THEATER_LIST_REQUEST, TIMETABLE_THEATER_LIST_SUCCESS, TIMETABLE_THEATER_LIST_FAILURE,
	TIMETABLE_DAY_LIST_REQUEST, TIMETABLE_DAY_LIST_SUCCESS, TIMETABLE_DAY_LIST_FAILURE 
} from "../reducer/R_TimeTable";
import { http } from "../lib/http";

// 예매 가능한 영화 조회 함수
function* MovieSearch() {
  const result = yield call(callMovieSearch);
  if (result.status === 200) {
    yield put({
      type: TIMETABLE_MOVIE_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: TIMETABLE_MOVIE_LIST_FAILURE
    });
  }
}

// 예매 가능한 영화 조회 백엔드 호출
async function callMovieSearch() {
  return await http.get("/movie/normal/ReservePossibleDESC")
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 예매 가능한 극장 조회 함수
function* TheaterSearch() {
  const result = yield call(callTheaterSearch);
  if (result.status === 200) {
    yield put({
      type: TIMETABLE_THEATER_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: TIMETABLE_THEATER_LIST_FAILURE
    });
  }
}

// 예매 가능한 극장 조회 백엔드 호출
async function callTheaterSearch() {
  return await http.get("/Theater/normal/ReservePossible")
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 날짜 조회 함수
function* DaySearch(action) {
  const result = yield call(callDaySearch, action.data);
  if (result.status === 200) {
    yield put({
      type: TIMETABLE_DAY_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: TIMETABLE_DAY_LIST_FAILURE
    });
  }
}

// 날짜 조회 백엔드 호출
async function callDaySearch(data) {
  return await http.get("/infomovie/normal/findDay", {
    params: {
      mid: data.mid,
      tarea: data.tarea,
			tid: data.tid
    }
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}










// 아래로 수정
async function selectTheaterApi(data) {
    return await http
      .get("/infomovie/normal/findtest", {params:{
        mid:data.mid,
        miday:data.miday,
        area:data.area,
        tid:data.tid,
        message:data.message
      }})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
  function* selectTheater(action) {
    console.log('gg')
    const result = yield call(selectTheaterApi, action.data);
    console.log(result);
  
    if (result.status === 200) { 
      yield put({
        type: SELECT_SC_THEATER_SUCCESS,
        data:result.data,
      });
    } else {
      yield put({
        type: SELECT_SC_THEATER_FAILURE,
        data: result.status,
      });   
    }
  }
  async function selectDayApi(data) {
    return await http
      .get("/infomovie/normal/timeselect", {params:{
        mid:data.mid,
        tid:data.tid,
        message:data.message
      }})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
  function* selectDay(action) {
    const result = yield call(selectDayApi, action.data);
  
    console.log('day datya')
    console.log(result);
    
    if (result.status === 200) { 
      yield put({
        type: DAY_SUCCESS,
        data:result.data,
      });
  
    } else {
      yield put({
        type: DAY_REQUEST,
        data: result.status,
      });
    }
  }
  function* AllMovieLoad(action) {
    const result = yield call(LoadAllMovie, action.data);
    const allmoviedata = result.data.map((mv) => ({
      id: mv.mid, 
      dir: mv.mdir, 
      date: mv.mdate, 
      time: mv.mtime, 
      genre: mv.mgenre, 
      story: mv.mstory,
      title: mv.mtitle, 
      rating: mv.mrating, 
      imagepath: mv.mimagepath,
      likes: mv.mlikes,
      score: mv.mscore,
      like: mv.mlike,
      reserve: mv.reserve,
      reserveRate: mv.reserveRate
    }));
    if (result.status === 200) {
      yield put({
        type: MOVIE_SUCCESS,
        data: allmoviedata,
      });
      yield put({
        type:MOVIE_DATAS,
        data: allmoviedata[0]
      })
    } else {
      yield put({
        type: MOVIE_FAILURE,
        data: result.status,
      });
    }
  }
  
  // 백엔드 호출
  async function LoadAllMovie(data) {
    return await http.get("/movie/normal/allmovie", {
      params: {
        uid: data.uid,
        button: data.button,
        search: data.search
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  function* selectTheaterSaga() {
    yield takeLatest(SELECT_SC_THEATER_REQUEST, selectTheater);
  }
  function* selectDaySaga() {
    yield takeLatest(DAY_REQUEST, selectDay);
  }
  function* movieSaga() {
    yield takeLatest(MOVIE_REQUEST, AllMovieLoad);
  }
// 위로 수정



function* MOVIE_LIST() {
  yield takeLatest(TIMETABLE_MOVIE_LIST_REQUEST, MovieSearch);
}

function* THEATER_LIST() {
  yield takeLatest(TIMETABLE_THEATER_LIST_REQUEST, TheaterSearch);
}

function* DAY_LIST() {
  yield takeLatest(TIMETABLE_DAY_LIST_REQUEST, DaySearch);
}

export default function* S_TimeTable() {
	yield all([fork(MOVIE_LIST),
		fork(THEATER_LIST),
		fork(DAY_LIST),

		// 아래로 수정
		
		fork(selectTheaterSaga),fork(selectDaySaga),fork(movieSaga)]);
}