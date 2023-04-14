import { call, all, takeLatest, fork, put, select, delay } from "redux-saga/effects";
import { http } from "../lib/http";
import { useNavigate } from "react-router-dom";
import { BOARD_READ_FAILURE, BOARD_READ_REQUEST, BOARD_READ_SUCCESS, 
  BOARD_WRITE_FAILURE, BOARD_WRITE_REQUEST, BOARD_WRITE_SUCCESS, 
  CONTENT_READ_FAILURE, CONTENT_READ_REQUEST, CONTENT_READ_SUCCESS 
,BOARD_SEARCH_REQUEST, BOARD_SEARCH_SUCCESS, BOARD_SEARCH_FAILURE
, CONTENT_DELETE_REQUEST,CONTENT_DELETE_SUCCESS,CONTENT_DELETE_FAILURE, COMMENT_WRITE_REQUEST, COMMENT_WRITE_SUCCESS, COMMENT_WRITE_FAILURE, COMMENT_READ_SUCCESS, COMMENT_READ_FAILURE, COMMENT_READ_REQUEST
,LIKE_REQUEST,LIKE_FAILURE,LIKE_SUCCESS, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_FAILURE, COMMENT_DELETE_REQUEST, COMMENT_LIKE_SUCCESS, COMMENT_LIKE_FAILURE, COMMENT_LIKE_REQUEST} from "../reducer/Board";
import { M_COMMENT_READ_REQUEST } from "../reducer/R_manager_board";

//게시판 읽기
async function BoardReadApi(data) {
  return await http
    .get(`/board/normal/boardall?category=${data.category}&sort=${data.sort}&page=${data.page}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* BoardRead(action) {
  console.log(action)
  const result = yield call(BoardReadApi, action.data);

  if (result.status === 200) { 
    yield put({
      type: BOARD_READ_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: BOARD_READ_FAILURE,
      data: result.status,
    });   
  }
}

//게시판 검색
async function BoardSearchApi(data) {
  return await http
    .get("/board/normal/search",{
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

//게시판 상세 페이지
async function ContentReadApi(data) {
  return await http
    .get(`/board/normal/content/${data.id}/${data.title}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* ContentRead(action) {
  console.log(action)
  const result = yield call(ContentReadApi, action.data);
  console.log(result)
  if (result.status === 200) { 
    yield put({
      type: CONTENT_READ_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: CONTENT_READ_FAILURE,
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
//게시판 쓰기
async function BoardWriteApi(data) {
    return await http
      .post("/board/auth/boardwrite",data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
  function* BoardWrite(action) {
    console.log(action)
    const result = yield call(BoardWriteApi, action.data);
  
    if (result.status === 204) { 
      yield put({
        type: BOARD_WRITE_SUCCESS,
      });
      alert("수정완료되었습니다.")
    } else {
      yield put({
        type: BOARD_WRITE_FAILURE,
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
  

  function* BoardWriteSaga() {
    yield takeLatest(BOARD_WRITE_REQUEST, BoardWrite);
  }

  function* BoardSearchSaga() {
    yield takeLatest(BOARD_SEARCH_REQUEST, BoardSearch);
  }
  
  function* ContentWriteSaga() {
    yield takeLatest(CONTENT_READ_REQUEST, ContentRead);
  }

  function* ContentDeleteSaga() {
    yield takeLatest(CONTENT_DELETE_REQUEST, ContentDelete);
  }

  function* BoardReadSaga() {
    yield takeLatest(BOARD_READ_REQUEST, BoardRead);
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
  
  export default function* BoardSaga() {
    yield all([fork(BoardWriteSaga),fork(BoardReadSaga),fork(ContentWriteSaga),fork(BoardSearchSaga),fork(ContentDeleteSaga),
    fork(CommentWriteSaga),fork(CommentReadSaga),fork(LikeSaga),fork(DeleteSaga),fork(CommentLikeSaga)]);
  }