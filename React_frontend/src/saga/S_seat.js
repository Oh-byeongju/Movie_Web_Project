/*
  23-04-30 예매 좌석 페이지 수정(오병주)
*/
import {
	SEAT_LIST_REQUEST, SEAT_LIST_SUCCESS, SEAT_LIST_FAILURE,

  CHECK_SEAT_REQUEST,
  CHECK_SEAT_SUCCESS,
  CHECK_SEAT_FAILURE,
} from "../reducer/R_seat";
import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import { http } from "../lib/http";

// 좌석 조회 함수
function* SeatSearch(action) {
  const result = yield call(callSeatSearch, action.data);
  if (result.status === 200) {
    yield put({
      type: SEAT_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: SEAT_LIST_FAILURE
    });
  }
}

// 좌석 조회 백엔드 호출
async function callSeatSearch(data) {
  return await http.get("/seat/auth/MovieInfo", {
    params: {
			cid: data.cid,
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





async function checkSeatApi(data) {
  return await http
    .post("/seat/normal/rediss", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* checkSeat(action) {
  const result = yield call(checkSeatApi, action.data);
  console.log(result);

  if (result.status === 200) {
    yield put({
      type: CHECK_SEAT_SUCCESS,
    });
  } else {
    alert("점유된 좌석입니다.");
    console.log(action.data);
    yield put({
      type: CHECK_SEAT_FAILURE,
      data: result.status,
    });
  }
}
function* checkSeatSaga() {
  yield takeLatest(CHECK_SEAT_REQUEST, checkSeat);
}

function* SEAT_LIST() {
  yield takeLatest(SEAT_LIST_REQUEST, SeatSearch);
}


export default function* S_seat() {
  yield all([fork(SEAT_LIST), fork(checkSeatSaga)]);
}
