/*
	23-04-03 관리자 페이지 게시물 crud (강경목)
	23-05-30 관리자 게시물 페이지 수정(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";


import { 
	MANAGER_BOARD_LIST_REQUEST, MANAGER_BOARD_LIST_SUCCESS, MANAGER_BOARD_LIST_FAILURE,
	MANAGER_BOARD_SEARCH_REQUEST, MANAGER_BOARD_SEARCH_SUCCESS, MANAGER_BOARD_SEARCH_FAILURE,
	
	// 아래로 날려
	BOARD_DELETE_DONE, BOARD_DELETE_ERROR, BOARD_DELETE_LOADING,  M_COMMENT_READ_FAILURE, M_COMMENT_READ_REQUEST, M_COMMENT_READ_SUCCESS } from "../reducer/R_manager_board";
import { http } from "../lib/http";

// 게시물 조회 함수
function* AllBoard() {
  const result = yield call(callAllBoard);
  if (result.status === 200) {
    yield put({
      type: MANAGER_BOARD_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: MANAGER_BOARD_LIST_FAILURE
    });
  }
}

// 게시물 조회 백엔드 호출
async function callAllBoard() {
	return await http.get("/Manager/auth/allBoard")
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 게시물 검색 함수
function* BoardSearch(action) {
  const result = yield call(callBoardSearch, action.data);
  if (result.status === 200) { 
    yield put({
      type: MANAGER_BOARD_SEARCH_SUCCESS,
      data: result.data
    });
  } 
	else {
    yield put({
      type: MANAGER_BOARD_SEARCH_FAILURE
    });   
  }
}

// 게시물 검색 백엔드 호출
async function callBoardSearch(data) {
  return await http.get("/Manager/auth/boardSearch", {
    params: {
			category: data.category,
			title: data.title
    }
	})
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return error.response;
	});
}









// 아래로 날려


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
// 위로 날려




function* MANAGER_BOARD_LIST() {
	yield takeLatest(MANAGER_BOARD_LIST_REQUEST, AllBoard);
}

function* MANAGER_BOARD_SEARCH() {
	yield takeLatest(MANAGER_BOARD_SEARCH_REQUEST, BoardSearch);
}






//아래로 날려

function* BOARD_DELETE() {
    yield takeLatest(BOARD_DELETE_LOADING, boarddelete);
  }
  function* COMMENT_ALL() {
    yield takeLatest(M_COMMENT_READ_REQUEST, commentread);
  }
// 위로 날려



export default function* S_manager_board() {
  yield all([fork(MANAGER_BOARD_LIST), fork(MANAGER_BOARD_SEARCH)
		
		
		// 아래로 날려
		,fork(BOARD_DELETE),fork(COMMENT_ALL)]);
}
