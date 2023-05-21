/*
	23-05-19 ~ 21 게시물 페이지 수정(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { 
	BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS, BOARD_LIST_FAILURE,
	BOARD_CONTENT_REQUEST, BOARD_CONTENT_SUCCESS, BOARD_CONTENT_FAILURE,
	BOARD_WRITE_REQUEST, BOARD_WRITE_SUCCESS, BOARD_WRITE_FAILURE,

	// 아래로 날리기

 BOARD_SEARCH_REQUEST, BOARD_SEARCH_SUCCESS, BOARD_SEARCH_FAILURE, CONTENT_DELETE_REQUEST,CONTENT_DELETE_SUCCESS,CONTENT_DELETE_FAILURE, COMMENT_WRITE_REQUEST, COMMENT_WRITE_SUCCESS, COMMENT_WRITE_FAILURE, COMMENT_READ_SUCCESS, COMMENT_READ_FAILURE, COMMENT_READ_REQUEST,LIKE_REQUEST,LIKE_FAILURE,LIKE_SUCCESS, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_FAILURE, COMMENT_DELETE_REQUEST, COMMENT_LIKE_SUCCESS, COMMENT_LIKE_FAILURE, COMMENT_LIKE_REQUEST
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

// 게시판 작성 함수
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

// 게시판 작성 백엔드 호출
async function callBoardWrite(data) {
	return await http.post("/Board/auth/boardWrite", data)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return error.response;
	});
}












// 아래로 날리기



//게시판 검색
async function BoardSearchApi(data) {
  return await http
    .get("/Board/normal/search",{
    params:{
      page:data.page,
      category:data.category,
      title:data.title
    }})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* BoardSearch(action) {
  console.log(action)
  const result = yield call(BoardSearchApi, action.data);

  if (result.status === 200) { 
    yield put({
      type: BOARD_SEARCH_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: BOARD_SEARCH_FAILURE,
      data: result.status,
    });   
  }
}


//게시판 삭제
async function ContentDeleteApi(data) {
  return await http
    .post("/board/auth/delete",data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* ContentDelete(action) {
  console.log(action)
  const result = yield call(ContentDeleteApi, action.data);
  console.log(result)
  
  if (result.status === 200) { 
    yield put({
      type: CONTENT_DELETE_SUCCESS,
      
    });

  } else {
    yield put({
      type: CONTENT_DELETE_FAILURE,
      data: result.status,
    });   
  }
}

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
  async function LikeApi(data) {
    return await http
      .post("/board/auth/like",data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
  function* Like(action) {
    console.log(action)
    const result = yield call(LikeApi, action.data);
  
    if (result.status === 200) { 
      yield put({
        type: LIKE_SUCCESS,
        data:result.data
      });
    } else {
      yield put({
        type: LIKE_FAILURE,
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

function* BOARD_CONTENT() {
	yield takeLatest(BOARD_CONTENT_REQUEST, BoardContent);
}

function* BOARD_WRITE() {
	yield takeLatest(BOARD_WRITE_REQUEST, BoardWrite);
}








// 아래로 날리기

  function* BoardSearchSaga() {
    yield takeLatest(BOARD_SEARCH_REQUEST, BoardSearch);
  }
  
 

  function* ContentDeleteSaga() {
    yield takeLatest(CONTENT_DELETE_REQUEST, ContentDelete);
  }

 

  function* CommentReadSaga() {
    yield takeLatest(COMMENT_READ_REQUEST, CommentRead);
  }
  

  function* CommentWriteSaga() {
    yield takeLatest(COMMENT_WRITE_REQUEST, CommentWrite);
  }

  function* LikeSaga() {
    yield takeLatest(LIKE_REQUEST, Like);
  }
  function* CommentLikeSaga() {
    yield takeLatest(COMMENT_LIKE_REQUEST, CommentLike);
  }
  function* DeleteSaga() {
    yield takeLatest(COMMENT_DELETE_REQUEST, Delete);
  }
  
  export default function* S_board() {
    yield all([fork(BOARD_LIST), fork(BOARD_CONTENT), fork(BOARD_WRITE),

			//아래로 날리기
			
			
			fork(BoardSearchSaga),fork(ContentDeleteSaga),
    fork(CommentWriteSaga),fork(CommentReadSaga),fork(LikeSaga),fork(DeleteSaga),fork(CommentLikeSaga)]);
  }