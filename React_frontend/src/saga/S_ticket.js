/*
	23-04-27 ~ 28 예매 페이지 수정(오병주)
*/
import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import { 
	TICKET_MOVIE_LIST_REQUEST, TICKET_MOVIE_LIST_SUCCESS, TICKET_MOVIE_LIST_FAILURE,
	TICKET_THEATER_LIST_REQUEST, TICKET_THEATER_LIST_SUCCESS, TICKET_THEATER_LIST_FAILURE,
	TICKET_DAY_LIST_REQUEST, TICKET_DAY_LIST_SUCCESS, TICKET_DAY_LIST_FAILURE,
	TICKET_MOVIEINFO_LIST_REQUEST, TICKET_MOVIEINFO_LIST_SUCCESS, TICKET_MOVIEINFO_LIST_FAILURE 
} from "../reducer/R_ticket";



import {
  SELECT_SCHEDULE_SUCCESS,
  SELECT_SCHEDULE_FAILURE,
  SELECT_SCHEDULE_REQUEST,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
} from "../reducer/R_ticket";
import { http } from "../lib/http";

// 영화 조회 함수
function* MovieSearch(action) {
  const result = yield call(callMovieSearch, action.data);
  if (result.status === 200) {
    yield put({
      type: TICKET_MOVIE_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: TICKET_MOVIE_LIST_FAILURE
    });
  }
}

// 영화 조회 백엔드 호출
async function callMovieSearch(data) {
  return await http.get("/movie/normal/TicketReserveDESC", {
    params: {
			miday: data.miday,
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

// 극장 조회 함수
function* TheaterSearch(action) {
  const result = yield call(callTheaterSearch, action.data);
  if (result.status === 200) {
    yield put({
      type: TICKET_THEATER_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: TICKET_THEATER_LIST_FAILURE
    });
  }
}

// 극장 조회 백엔드 호출
async function callTheaterSearch(data) {
  return await http.get("/Theater/normal/Ticket", {
    params: {
			miday: data.miday,
      mid: data.mid
		}
  })
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
      type: TICKET_DAY_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: TICKET_DAY_LIST_FAILURE
    });
  }
}

// 날짜 조회 백엔드 호출
async function callDaySearch(data) {
  return await http.get("/MovieInfo/normal/Ticket", {
    params: {
			tid: data.tid,
      mid: data.mid
		}
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 상영정보 조회 함수
function* MovieInfoSearch(action) {
  const result = yield call(callMovieInfoSearch, action.data);
  if (result.status === 200) {
    yield put({
      type: TICKET_MOVIEINFO_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: TICKET_MOVIEINFO_LIST_FAILURE
    });
  }
}

// 상영정보 조회 백엔드 호출
async function callMovieInfoSearch(data) {
  return await http.get("/MovieInfo/normal/Schedule", {
    params: {
			miday: data.miday,
			mid: data.mid,
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








// 절취선
async function selectScheduleApi(data) {
  return await http
    .get("/MovieInfo/normal/Schedule", {
      params: {
        miday: data.miday,
        mid: data.mid,
        tid: data.tid,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* selectSchedule(action) {
  const result = yield call(selectScheduleApi, action.data);
  if (result.status === 200) {
    yield put({
      type: SELECT_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_SCHEDULE_FAILURE,
      data: result.status,
    });
  }
}

async function paymentApi(data) {
  return await http
    .post("/payment/auth/payment", data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* payment(action) {
  const result = yield call(paymentApi, action.data);
  if (result.status === 200) {
    yield put({
      type: PAYMENT_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: PAYMENT_FAILURE,
      data: result.status,
    });
  }
}
// 절취선


function* MOVIE_LIST() {
  yield takeLatest(TICKET_MOVIE_LIST_REQUEST, MovieSearch);
}

function* THEATER_LIST() {
  yield takeLatest(TICKET_THEATER_LIST_REQUEST, TheaterSearch);
}

function* DAY_LIST() {
  yield takeLatest(TICKET_DAY_LIST_REQUEST, DaySearch);
}

function* MOVIEINFO_LIST() {
  yield takeLatest(TICKET_MOVIEINFO_LIST_REQUEST, MovieInfoSearch);
}



//// 절취선
function* selectScheduleSaga() {
  yield takeLatest(SELECT_SCHEDULE_REQUEST, selectSchedule);
}
function* paymentSaga() {
  yield takeLatest(PAYMENT_REQUEST, payment);
}
// 절취선




export default function* S_ticket() {
  yield all([
		fork(MOVIE_LIST),
		fork(THEATER_LIST),
		fork(DAY_LIST),
		fork(MOVIEINFO_LIST),


		// 절취선
    fork(selectScheduleSaga),
    fork(paymentSaga),
  ]);
}
