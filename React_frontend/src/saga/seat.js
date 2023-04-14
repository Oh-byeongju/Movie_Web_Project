import {
  SELECT_SEAT_SUCCESS,
  SELECT_SEAT_FAILURE,
  SELECT_SEAT_REQUEST,
  CHECK_SEAT_REQUEST,
  CHECK_SEAT_SUCCESS,
  CHECK_SEAT_FAILURE,
} from "../reducer/seat";
import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import { http } from "../lib/http";
async function selectSeatApi(data) {
  return await http
    .get("/seat/normal/infoseat", {
      params: {
        id: data.id,
        miid: data.miid,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* selectSeat(action) {
  const result = yield call(selectSeatApi, action.data);
  if (result.status === 200) {
    yield put({
      type: SELECT_SEAT_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_SEAT_FAILURE,
      data: result.status,
    });
  }
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
function* selectSeatSaga() {
  yield takeLatest(SELECT_SEAT_REQUEST, selectSeat);
}

function* checkSeatSaga() {
  yield takeLatest(CHECK_SEAT_REQUEST, checkSeat);
}
export default function* seatSaga() {
  yield all([fork(selectSeatSaga), fork(checkSeatSaga)]);
}
