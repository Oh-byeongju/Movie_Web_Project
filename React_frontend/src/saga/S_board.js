/*
	23-05-19 ~ 23 게시물 페이지 수정(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { 
	BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS, BOARD_LIST_FAILURE,
	BOARD_SEARCH_REQUEST, BOARD_SEARCH_SUCCESS, BOARD_SEARCH_FAILURE,
	BOARD_CONTENT_REQUEST, BOARD_CONTENT_SUCCESS, BOARD_CONTENT_FAILURE,
	BOARD_WRITE_REQUEST, BOARD_WRITE_SUCCESS, BOARD_WRITE_FAILURE,
	BOARD_UPDATE_REQUEST, BOARD_UPDATE_SUCCESS, BOARD_UPDATE_FAILURE,
	BOARD_DELETE_REQUEST, BOARD_DELETE_SUCCESS, BOARD_DELETE_FAILURE,
	BOARD_LIKE_REQUEST, BOARD_LIKE_SUCCESS, BOARD_LIKE_FAILURE,
	

	// 아래로 날리기
  COMMENT_WRITE_REQUEST, COMMENT_WRITE_SUCCESS, COMMENT_WRITE_FAILURE, COMMENT_READ_SUCCESS, COMMENT_READ_FAILURE, COMMENT_READ_REQUEST,COMMENT_DELETE_SUCCESS, COMMENT_DELETE_FAILURE, COMMENT_DELETE_REQUEST, COMMENT_LIKE_SUCCESS, COMMENT_LIKE_FAILURE, COMMENT_LIKE_REQUEST
} from "../reducer/R_board";
import { http } from "../lib/http";

// 게시물 조회 함수
function* AllBoard(action) {
  const result = yield call(callAllBoard, action.data);
  if (result.status === 200) {
    yield put({
      type: BOARD_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: BOARD_LIST_FAILURE
    });
  }
}

// 게시물 조회 백엔드 호출
async function callAllBoard(data) {
	return await http.get("/Board/normal/allBoard", {
    params: {
			category: data.category,
      sort: data.sort,
			uid: data.uid,
			page: data.page
		}
	})
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
      type: BOARD_SEARCH_SUCCESS,
      data: result.data
    });
  } 
	else {
    yield put({
      type: BOARD_SEARCH_FAILURE
    });   
  }
}

// 게시물 검색 백엔드 호출
async function callBoardSearch(data) {
  return await http.get("/Board/normal/search", {
    params: {
			category: data.category,
			title: data.title,
      page: data.page
    }
	})
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return error.response;
	});
}

// 게시물 상세조회 함수
function* BoardContent(action) {
  const result = yield call(callBoardContent, action.data);
  if (result.status === 200) {
    yield put({
      type: BOARD_CONTENT_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: BOARD_CONTENT_FAILURE
    });
  }
}

// 게시물 상세조회 백엔드 호출
async function callBoardContent(data) {
	return await http.get("/Board/normal/content", {
    params: {
			bid: data.bid,
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

// 게시물 작성 함수
function* BoardWrite(action) {
	const result = yield call(callBoardWrite, action.data);
	if (result.status === 204) { 
		yield put({
			type: BOARD_WRITE_SUCCESS
		});
	} 
	else {
		yield put({
			type: BOARD_WRITE_FAILURE
		});   
	}
}

// 게시물 작성 백엔드 호출
async function callBoardWrite(data) {
	return await http.post("/Board/auth/boardWrite", data)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return error.response;
	});
}

// 게시물 수정 함수
function* BoardUpdate(action) {
	const result = yield call(callBoardUpdate, action.data);
	if (result.status === 204) { 
		yield put({
			type: BOARD_UPDATE_SUCCESS
		});
	} 
	else {
		yield put({
			type: BOARD_UPDATE_FAILURE
		});   
	}
}

// 게시물 수정 백엔드 호출
async function callBoardUpdate(data) {
	return await http.patch("/Board/auth/boardUpdate", data)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return error.response;
	});
}

// 게시물 삭제 함수
function* BoardDelete(action) {
  const result = yield call(callBoardDelete, action.data);
  if (result.status === 204) {
    yield put({
      type: BOARD_DELETE_SUCCESS
    });
  } 
  else {
    yield put({
			type: BOARD_DELETE_FAILURE
    });
  }
}

// 게시물 삭제 백엔드 호출
async function callBoardDelete(data) {
	return await http.delete("/Board/auth/boardDelete", {
    params: {
			bid: data.bid
		}
	})
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 게시물 좋아요 함수
function* BoardLike(action) {
	const result = yield call(callBoardLike, action.data);
	if (result.status === 200) { 
		yield put({
			type: BOARD_LIKE_SUCCESS,
			data: result.data
		});
	} 
	else {
		yield put({
			type: BOARD_LIKE_FAILURE
		});   
	}
}

// 게시물 좋아요 백엔드 호출
async function callBoardLike(data) {
	return await http.post("/Board/auth/like", data)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return error.response;
	});
}









// 아래로 날리기
   //댓글 쓰기
async function CommentReadApi(data) {
  return await http
    .get("/board/normal/comment",{params:{
      bid:data.bid,
      type:data.type
    }})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* CommentRead(action) {
  console.log(action)
  const result = yield call(CommentReadApi, action.data);

  if (result.status === 200) { 
    yield put({
      type: COMMENT_READ_SUCCESS,
      data:result.data
    });
   
  } else {
    yield put({
      type: COMMENT_READ_FAILURE,
      data: result.status,
    });   
  }
}


  //댓글 쓰기
async function CommentWriteApi(data) {
  return await http
    .post("/board/auth/commentwrite",data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* CommentWrite(action) {
  console.log(action)
  const result = yield call(CommentWriteApi, action.data);

  if (result.status === 204) { 
    yield put({
      type: COMMENT_WRITE_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: COMMENT_WRITE_FAILURE,
      data: result.status,
    });   
  }
}
 

   //게시물, 댓글 좋아요
   async function CommentLikeApi(data) {
    return await http
      .post("/board/auth/likecomment",data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
  function* CommentLike(action) {
    console.log(action)
    const result = yield call(CommentLikeApi, action.data);
  
    if (result.status === 200) { 
      yield put({
        type: COMMENT_LIKE_SUCCESS,
        data:result.data
      });
    } else {
      yield put({
        type: COMMENT_LIKE_FAILURE,
        data: result.status,
      });   
    }
  }

    //댓글지우기
    async function DeleteApi(data) {
      return await http
        .post("/board/auth/deletecomment",data)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
    }
    
    function* Delete(action) {
      console.log(action)
      const result = yield call(DeleteApi, action.data);
    
      if (result.status === 200) { 
        yield put({
          type: COMMENT_DELETE_SUCCESS,
        });
        alert("삭제완료되었습니다.")
      } else {
        yield put({
          type: COMMENT_DELETE_FAILURE,
          data: result.status,
        });   
      }
    }
// 위로 날리기



function* BOARD_LIST() {
	yield takeLatest(BOARD_LIST_REQUEST, AllBoard);
}

function* BOARD_SEARCH() {
	yield takeLatest(BOARD_SEARCH_REQUEST, BoardSearch);
}

function* BOARD_CONTENT() {
	yield takeLatest(BOARD_CONTENT_REQUEST, BoardContent);
}

function* BOARD_WRITE() {
	yield takeLatest(BOARD_WRITE_REQUEST, BoardWrite);
}

function* BOARD_UPDATE() {
	yield takeLatest(BOARD_UPDATE_REQUEST, BoardUpdate);
}

function* BOARD_DELETE() {
	yield takeLatest(BOARD_DELETE_REQUEST, BoardDelete);
}

function* BOARD_LIKE() {
	yield takeLatest(BOARD_LIKE_REQUEST, BoardLike);
}







// 아래로 날리기

  function* CommentReadSaga() {
    yield takeLatest(COMMENT_READ_REQUEST, CommentRead);
  }
  
  function* CommentWriteSaga() {
    yield takeLatest(COMMENT_WRITE_REQUEST, CommentWrite);
  }

  function* CommentLikeSaga() {
    yield takeLatest(COMMENT_LIKE_REQUEST, CommentLike);
  }
  function* DeleteSaga() {
    yield takeLatest(COMMENT_DELETE_REQUEST, Delete);
  }
  
  export default function* S_board() {
    yield all([fork(BOARD_LIST), fork(BOARD_CONTENT), fork(BOARD_WRITE), fork(BOARD_SEARCH), fork(BOARD_LIKE), fork(BOARD_DELETE),
			fork(BOARD_UPDATE),

			//아래로 날리기
			
			
			
    fork(CommentWriteSaga),fork(CommentReadSaga),fork(DeleteSaga),fork(CommentLikeSaga)]);
  }