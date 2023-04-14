import { DAY_REQUEST, DAY_SUCCESS, MOVIE_FAILURE, MOVIE_REQUEST, MOVIE_SUCCESS, MOVIE_DATAS,SELECT_SC_THEATER_FAILURE, SELECT_SC_THEATER_REQUEST, SELECT_SC_THEATER_SUCCESS, DAY_DATAS } from "../reducer/TimeTable";
import { call, all, takeLatest, fork, put, select } from "redux-saga/effects";
import { http } from "../lib/http";
import { useSelector } from "react-redux";
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
  export default function* timeTableSaga() {
    yield all([fork(selectTheaterSaga),fork(selectDaySaga),fork(movieSaga)]);
  }