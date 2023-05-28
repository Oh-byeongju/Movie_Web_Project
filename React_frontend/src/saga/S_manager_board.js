/*

 23-04-03 관리자 페이지 게시물 crud (강경목)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";

import { http } from "../lib/http";
import { BOARD_DELETE_DONE, BOARD_DELETE_ERROR, BOARD_DELETE_LOADING, BOARD_READ_DONE, BOARD_READ_ERROR, BOARD_READ_LOADING, BOARD_SELECT_DONE, BOARD_SELECT_ERROR, BOARD_SELECT_LOADING, M_COMMENT_READ_FAILURE, M_COMMENT_READ_REQUEST, M_COMMENT_READ_SUCCESS } from "../reducer/R_manager_board";

// 게시물 조회 함수
function* boardread(action) {
  const result = yield call(boardReadApi, action.data);
  console.log(result);
  if (result.status === 200) {
    yield put({
      type: BOARD_READ_DONE,
      data: result.data
    });
  } 
  else {
    yield put({
		type: BOARD_READ_ERROR,
        data:result.error
    });
  }
}

// 상영관 조회 백엔드 호출
async function boardReadApi() {
  return await http.get("/Manager/auth/boardread")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
} 

// 조회 함수
function* boardselect(action) {
    const result = yield call(boardSelectApi, action.data);
    console.log(result);
    if (result.status === 200) {
      yield put({
        type: BOARD_SELECT_DONE,
        data: result.data
      });
    } 
    else {
      yield put({
          type: BOARD_SELECT_ERROR,
          data:result.error
      });
    }
  }
  
  //조회 백엔드 호출
  async function boardSelectApi(data) {
    return await http.get("/Manager/auth/boardselect",{
        params:{
            text:data.text,
            state:data.state
        }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 


// 삭제 함수
function* boarddelete(action) {
    const result = yield call(boardDeleteApi, action.data);
    console.log(result);
    if (result.status === 200) {
      yield put({
        type: BOARD_DELETE_DONE,
      });
    } 
    else {
      yield put({
          type: BOARD_DELETE_ERROR,
          data:result.error
      });
    }
  }
  
  //조회 백엔드 호출
  async function boardDeleteApi(data) {
    return await http.post("/Manager/auth/deleteboard",data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 


// 조회 함수
function* commentread(action) {
    const result = yield call(commentReadApi, action.data);
    console.log(result);
    if (result.status === 200) {
      yield put({
        type: M_COMMENT_READ_SUCCESS,
        data:result.data
      });
    } 
    else {
      yield put({
          type: M_COMMENT_READ_FAILURE,
          data:result.error
      });
    }
  }
  
  //조회 백엔드 호출
  async function commentReadApi(data) {
    return await http.get("/Manager/auth/commentread",
    {
      params:{
        bid: data.bid,
        type:data.type
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 

function* BOARD_ALL() {
    yield takeLatest(BOARD_READ_LOADING, boardread);
  }
function* BOARD_SELECT() {
    yield takeLatest(BOARD_SELECT_LOADING, boardselect);
  }
function* BOARD_DELETE() {
    yield takeLatest(BOARD_DELETE_LOADING, boarddelete);
  }
  function* COMMENT_ALL() {
    yield takeLatest(M_COMMENT_READ_REQUEST, commentread);
  }
export default function* S_manager_board() {
  yield all([fork(BOARD_ALL),fork(BOARD_SELECT),fork(BOARD_DELETE),fork(COMMENT_ALL)]);
}
