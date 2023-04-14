import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import {
  BOXMOVIE_REQUEST, BOXMOVIE_SUCCESS, BOXMOVIE_FAILURE,
  ALLMOVIE_REQUEST, ALLMOVIE_SUCCESS, ALLMOVIE_FAILURE,
  SCREENMOVIE_REQUEST, SCREENMOVIE_SUCCESS, SCREENMOVIE_FAILURE,
  COMINGMOVIE_REQUEST, COMINGMOVIE_SUCCESS, COMINGMOVIE_FAILURE,
  USER_MLIKE_REQUEST, USER_MLIKE_SUCCESS, USER_MLIKE_FAILURE,
  DETAIL_MOVIE_REQUEST, DETAIL_MOVIE_SUCCESS, DETAIL_MOVIE_FAILURE,
  DETAIL_COMMENT_RECENT_REQUEST, DETAIL_COMMENT_RECENT_SUCCESS, DETAIL_COMMENT_RECENT_FAILURE,
  DETAIL_COMMENT_LIKE_REQUEST, DETAIL_COMMENT_LIKE_SUCCESS, DETAIL_COMMENT_LIKE_FAILURE,
  USER_COMMENT_LIKE_REQUEST, USER_COMMENT_LIKE_SUCCESS, USER_COMMENT_LIKE_FAILURE,
  USER_MY_MOVIE_SEARCH_REQUEST, USER_MY_MOVIE_SEARCH_SUCCESS, USER_MY_MOVIE_SEARCH_FAILURE
} from "../reducer/movie";
import { http } from "../lib/http";

// 박스 오피스 영화 불러오는 함수
function* BoxMovieLoad(action) {
  const result = yield call(LoadBoxMovie, action.data);
  if (result.status === 200) {
    yield put({
      type: BOXMOVIE_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
      type: BOXMOVIE_FAILURE,
      data: result.status,
    });
  }
}

// 백엔드 호출
async function LoadBoxMovie(data) {
  // 박스오피스 영화는 전체 영화중 예매순으로 내림차순
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

// 전체 영화 불러오는 함수
function* AllMovieLoad(action) {
  const result = yield call(LoadAllMovie, action.data);
  if (result.status === 200) {
    yield put({
      type: ALLMOVIE_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
      type: ALLMOVIE_FAILURE,
      data: result.status
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

// 현재 상영작 영화 불러오는 함수
function* ScreenMovieLoad(action) {
  const result = yield call(LoadScreenMovie, action.data);
  if (result.status === 200) {
    yield put({
      type: SCREENMOVIE_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
      type: SCREENMOVIE_FAILURE,
      data: result.status,
    });
  }
}

// 백엔드 호출
async function LoadScreenMovie(data) {
  return await http.get("/movie/normal/screenmovie", {
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

// 상영 예정작 영화 불러오는 함수
function* ComingMovieLoad(action) {
  const result = yield call(LoadComingMovie, action.data);
  if (result.status === 200) {
    yield put({
      type: COMINGMOVIE_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
      type: COMINGMOVIE_FAILURE,
      data: result.status,
    });
  }
}

// 백엔드 호출
async function LoadComingMovie(data) {
  return await http.get("/movie/normal/comingmovie", {
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

// 영화 좋아요 toggle 함수
function* MovieLikeToggle(action) {
  const result = yield call(CallMovieLikeToggle, action.data);
  if (result.status === 200) {
    yield put({
      type: USER_MLIKE_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
      type: USER_MLIKE_FAILURE,
      data: action.data.mid
    });
  }
}

// 유저 정보를 전달한 뒤 좋아요 기록 변경(백엔드 연결)
async function CallMovieLikeToggle(data) {
  return await http.post("/MovieMember/auth/LikeToggle", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 영화 세부내용 검색을 위한 함수
function* DetailMovieLoad(action) {
  const result = yield call(DetailMovie, action.data);
  if (result.status === 200) {
    yield put({
      type: DETAIL_MOVIE_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: DETAIL_MOVIE_FAILURE,
      data: result.data,
    });
  }
}

// 백엔드 호출
async function DetailMovie(data) {
  return await http
    .get(`/movie/normal${data.pathname}`, {
      params: {
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 영화 관람평을 최신순으로 들고오는 함수
function* DetailCommentRecentLoad(action) {
  const result = yield call(CommentRecent, action.data);
  
  if (result.status === 200) {
    yield put({
      type: DETAIL_COMMENT_RECENT_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
      type: DETAIL_COMMENT_RECENT_FAILURE,
      data: result.data
    });
  }
}

// 관람평 최신순 백엔드 호출
async function CommentRecent(data) {
  return await http
    .get(`/movie/normal/recentcomment${data.pathname}`, {
      params: {
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 영화 관람평을 공감순으로 들고오는 함수
function* DetailCommentLikeLoad(action) {
  const result = yield call(CommentLike, action.data);

  if (result.status === 200) {
    yield put({
      type: DETAIL_COMMENT_LIKE_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
      type: DETAIL_COMMENT_LIKE_FAILURE,
      data: result.data
    });
  }
}

// 관람평 공감순 백엔드 호출
async function CommentLike(data) {
  return await http
    .get(`/movie/normal/likecomment${data.pathname}`, {
      params: {
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 관람평 좋아요 toggle 함수
function* CommentLikeToggle(action) {
  const result = yield call(CallCommentLikeToggle, action.data);
  if (result.status === 200) {
    yield put({
      type: USER_COMMENT_LIKE_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
      type: USER_COMMENT_LIKE_FAILURE,
      data: action.data
    });
  }
}

// 유저 정보를 전달한 뒤 관람평 좋아요 기록 변경(백엔드 연결)
async function CallCommentLikeToggle(data) {
  return await http.post("/MovieMember/auth/CommentLikeToggle", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 사용자가 좋아요 누른 영화 조회하는 함수
function* LikeMovieLoad() {
  const result = yield call(LikeMovie);
  if (result.status === 200) {
    yield put({
      type: USER_MY_MOVIE_SEARCH_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: USER_MY_MOVIE_SEARCH_FAILURE
    });
  }
}

// 백엔드 호출
async function LikeMovie() {
  return await http.get("/MyPageMovie/auth/movieLike")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* boxMovie() {
  yield takeLatest(BOXMOVIE_REQUEST, BoxMovieLoad);
}

function* allMovie() {
  yield takeLatest(ALLMOVIE_REQUEST, AllMovieLoad);
}

function* screenMovie() {
  yield takeLatest(SCREENMOVIE_REQUEST, ScreenMovieLoad);
}

function* comingMovie() {
  yield takeLatest(COMINGMOVIE_REQUEST, ComingMovieLoad);
}

function* USER_MLIKE_TOGGLE() {
  yield takeLatest(USER_MLIKE_REQUEST, MovieLikeToggle);
}

function* detailMovie() {
  yield takeLatest(DETAIL_MOVIE_REQUEST, DetailMovieLoad);
}

function* detailCommentRecent() {
  yield takeLatest(DETAIL_COMMENT_RECENT_REQUEST, DetailCommentRecentLoad);
}

function* detailCommentLike() {
  yield takeLatest(DETAIL_COMMENT_LIKE_REQUEST, DetailCommentLikeLoad);
}

function* USER_COMMENT_LIKE_TOGGLE() {
  yield takeLatest(USER_COMMENT_LIKE_REQUEST, CommentLikeToggle);
}

function* likeMovie() {
  yield takeLatest(USER_MY_MOVIE_SEARCH_REQUEST, LikeMovieLoad);
}

export default function* movieSaga() {
  yield all([fork(boxMovie), fork(allMovie), fork(screenMovie), fork(comingMovie), fork(USER_MLIKE_TOGGLE), 
            fork(detailMovie), fork(detailCommentRecent), fork(detailCommentLike), fork(USER_COMMENT_LIKE_TOGGLE), fork(likeMovie)]);
}
