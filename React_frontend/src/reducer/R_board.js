/*
	23-05-19 ~ 23 게시물 페이지 리듀서 수정(오병주)
*/
// 게시물 조회 리스트
export const BOARD_LIST_REQUEST = "BOARD_LIST_REQUEST";
export const BOARD_LIST_SUCCESS = "BOARD_LIST_SUCCESS";
export const BOARD_LIST_FAILURE = "BOARD_LIST_FAILURE";

// 게시물 검색 리스트
export const BOARD_SEARCH_REQUEST = "BOARD_SEARCH_REQUEST"
export const BOARD_SEARCH_SUCCESS = "BOARD_SEARCH_SUCCESS"
export const BOARD_SEARCH_FAILURE = "BOARD_SEARCH_FAILURE"

// 게시물 상세조회 리스트
export const BOARD_CONTENT_REQUEST = "BOARD_CONTENT_REQUEST";
export const BOARD_CONTENT_SUCCESS = "BOARD_CONTENT_SUCCESS";
export const BOARD_CONTENT_FAILURE = "BOARD_CONTENT_FAILURE";

// 게시물 작성 리스트
export const BOARD_WRITE_REQUEST = "BOARD_WRITE_REQUEST"
export const BOARD_WRITE_SUCCESS = "BOARD_WRITE_SUCCESS"
export const BOARD_WRITE_FAILURE = "BOARD_WRITE_FAILURE"

// 게시물 수정 리스트
export const BOARD_UPDATE_REQUEST = "BOARD_UPDATE_REQUEST"
export const BOARD_UPDATE_SUCCESS = "BOARD_UPDATE_SUCCESS"
export const BOARD_UPDATE_FAILURE = "BOARD_UPDATE_FAILURE"

// 게시물 삭제 리스트
export const BOARD_DELETE_REQUEST = "BOARD_DELETE_REQUEST"
export const BOARD_DELETE_SUCCESS = "BOARD_DELETE_SUCCESS"
export const BOARD_DELETE_FAILURE = "BOARD_DELETE_FAILURE"

// 게시물 좋아요 리스트
export const BOARD_LIKE_REQUEST = "BOARD_LIKE_REQUEST"
export const BOARD_LIKE_SUCCESS = "BOARD_LIKE_SUCCESS"
export const BOARD_LIKE_FAILURE = "BOARD_LIKE_FAILURE"







//// 아래로 날리기
  export const CONTENT_DELETE_REQUEST = "CONTENT_DELETE_REQUEST"
  export const CONTENT_DELETE_SUCCESS = "CONTENT_DELETE_SUCCESS"
  export const CONTENT_DELETE_FAILURE = "CONTENT_DELETE_FAILURE"

  export const COMMENT_READ_REQUEST = "COMMENT_READ_REQUEST"
  export const COMMENT_READ_SUCCESS = "COMMENT_READ_SUCCESS"
  export const COMMENT_READ_FAILURE = "COMMENT_READ_FAILURE"
  
  export const COMMENT_WRITE_REQUEST = "COMMENT_WRITE_REQUEST"
  export const COMMENT_WRITE_SUCCESS = "COMMENT_WRITE_SUCCESS"
  export const COMMENT_WRITE_FAILURE = "COMMENT_WRITE_FAILURE"

  export const COMMENT_DELETE_REQUEST = "COMMENT_DELETE_REQUEST"
  export const COMMENT_DELETE_SUCCESS = "COMMENT_DELETE_SUCCESS"
  export const COMMENT_DELETE_FAILURE = "COMMENT_DELETE_FAILURE"

  export const COMMENT_LIKE_REQUEST = "COMMENT_LIKE_REQUEST"
  export const COMMENT_LIKE_SUCCESS = "COMMENT_LIKE_SUCCESS"
  export const COMMENT_LIKE_FAILURE = "COMMENT_LIKE_FAILURE"
// 위로 날리기




const initalState = {
	BOARD_LIST_loading: false,
  BOARD_LIST_done: false,
  BOARD_LIST_error: false,
	BOARD_LIST: [],
	
	BOARD_SEARCH_loading: false,
  BOARD_SEARCH_done: false,
  BOARD_SEARCH_error: false,
	BOARD_SEARCH_LIST: [],

	BOARD_CONTENT_loading: false,
  BOARD_CONTENT_done: false,
  BOARD_CONTENT_error: false,
	BOARD_CONTENT: [],

	BOARD_WRITE_loading: false,
  BOARD_WRITE_done: false,
  BOARD_WRITE_error: false,

	BOARD_UPDATE_loading: false,
  BOARD_UPDATE_done: false,
  BOARD_UPDATE_error: false,

	BOARD_DELETE_loading: false,
  BOARD_DELETE_done: false,
  BOARD_DELETE_error: false,

	BOARD_LIKE_loading: false,
  BOARD_LIKE_done: false,
  BOARD_LIKE_error: false,

	

	
	// 아래로 날리기

	content_delete_loading:false,
	content_delete_done:false,
	content_delete_error:null,

	comment_read_loading:false,
	comment_read_done:false,
	comment_read_error:false,

	comment_write_loading:false,
	comment_write_done:false,
	comment_write_error:null,

	comment_delete_loading:false,
	comment_delete_done:false,
	comment_delete_error:null,

	comment_like_loadng:false,
	comment_like_done:false,
	comment_like_error:null,

	content:[],
	comment:[],
	like:[],
	likeslikes:[],
};

  
const R_board = (state = initalState, action) => {
	switch (action.type) {
		// 게시물 조회 케이스들
    case BOARD_LIST_REQUEST:
      return {
        ...state,
        BOARD_LIST_loading: true,
        BOARD_LIST_done: false,
        BOARD_LIST_error: false
      };
    case BOARD_LIST_SUCCESS:
      return {
        ...state,
        BOARD_LIST_loading: false,
        BOARD_LIST_done: true,
        BOARD_LIST_error: false,
        BOARD_LIST: action.data
      };
    case BOARD_LIST_FAILURE:
      return {
        ...state,
        BOARD_LIST_loading: false,
        BOARD_LIST_done: false,
        BOARD_LIST_error: true
      };
		// 게시물 검색 케이스들
    case BOARD_SEARCH_REQUEST:
      return {
        ...state,
        BOARD_SEARCH_loading: true,
        BOARD_SEARCH_done: false,
        BOARD_SEARCH_error: false
      };
    case BOARD_SEARCH_SUCCESS:
      return {
        ...state,
        BOARD_SEARCH_loading: false,
        BOARD_SEARCH_done: true,
        BOARD_SEARCH_error: false,
        BOARD_SEARCH_LIST: action.data
      };
    case BOARD_SEARCH_FAILURE:
      return {
        ...state,
        BOARD_SEARCH_loading: false,
        BOARD_SEARCH_done: false,
        BOARD_SEARCH_error: true
      };
		// 게시물 상세조회 케이스들
    case BOARD_CONTENT_REQUEST:
      return {
        ...state,
        BOARD_CONTENT_loading: true,
        BOARD_CONTENT_done: false,
        BOARD_CONTENT_error: false
      };
    case BOARD_CONTENT_SUCCESS:
      return {
        ...state,
        BOARD_CONTENT_loading: false,
        BOARD_CONTENT_done: true,
        BOARD_CONTENT_error: false,
        BOARD_CONTENT: action.data
      };
    case BOARD_CONTENT_FAILURE:
      return {
        ...state,
        BOARD_CONTENT_loading: false,
        BOARD_CONTENT_done: false,
        BOARD_CONTENT_error: true
      };
		// 게시물 작성 케이스들
		case BOARD_WRITE_REQUEST:
			return {
				...state,
				BOARD_WRITE_loading: true,
				BOARD_WRITE_done: false,
				BOARD_WRITE_error: false
			};
		case BOARD_WRITE_SUCCESS:
			return {
				...state,
				BOARD_WRITE_loading: false,
				BOARD_WRITE_done: true,
				BOARD_WRITE_error: false
			};
		case BOARD_WRITE_FAILURE:
			return {
				...state,
				BOARD_WRITE_loading: false,
				BOARD_WRITE_done: false,
				BOARD_WRITE_error: true
			};
		// 게시물 수정 케이스들
		case BOARD_UPDATE_REQUEST:
			return {
				...state,
				BOARD_UPDATE_loading: true,
				BOARD_UPDATE_done: false,
				BOARD_UPDATE_error: false
			};
		case BOARD_UPDATE_SUCCESS:
			return {
				...state,
				BOARD_UPDATE_loading: false,
				BOARD_UPDATE_done: true,
				BOARD_UPDATE_error: false
			};
		case BOARD_UPDATE_FAILURE:
			return {
				...state,
				BOARD_UPDATE_loading: false,
				BOARD_UPDATE_done: false,
				BOARD_UPDATE_error: true
			};
		// 게시물 삭제 케이스들
		case BOARD_DELETE_REQUEST:
			return {
				...state,
				BOARD_DELETE_loading: true,
				BOARD_DELETE_done: false,
				BOARD_DELETE_error: false
			};
		case BOARD_DELETE_SUCCESS:
			return {
				...state,
				BOARD_DELETE_loading: false,
				BOARD_DELETE_done: true,
				BOARD_DELETE_error: false
			};
		case BOARD_DELETE_FAILURE:
			return {
				...state,
				BOARD_DELETE_loading: false,
				BOARD_DELETE_done: false,
				BOARD_DELETE_error: true
			};
		// 게시물 좋아요 케이스들
		case BOARD_LIKE_REQUEST:
			return {
				...state,
				BOARD_LIKE_loading: true,
				BOARD_LIKE_done: false,
				BOARD_LIKE_error: false
			};
		case BOARD_LIKE_SUCCESS:
			return {
				...state,
				BOARD_LIKE_loading: false,
				BOARD_LIKE_done: true,
				BOARD_LIKE_error: false,
				BOARD_CONTENT : {
					...state.BOARD_CONTENT,
					like: action.data.like,
					unlike: action.data.unlike,
					likes: action.data.likes, 
					unlikes: action.data.unlikes
				}
			}		
		case BOARD_LIKE_FAILURE:
			return {
				...state,
				BOARD_LIKE_loading: false,
				BOARD_LIKE_done: false,
				BOARD_LIKE_error: true
			}; 
		





		// 아래로 날리기
			case CONTENT_DELETE_REQUEST:
					return{
							...state,
							content_delete_loading:true,
							content_delete_done:false,
							content_delete_error:null,
				}
					case CONTENT_DELETE_SUCCESS:
							return{
									...state,
									content_delete_loading:false,
									content_delete_done:true,
									content_delete_error:null,
							}
					case CONTENT_DELETE_FAILURE:
							return{
							...state,
							content_delete_loading:false,
							content_delete_done:false,
							content_delete_error:action.error,
			}  

							case COMMENT_READ_REQUEST:
									return{
											...state,
											comment_read_loading:true,
											comment_read_done:false,
											comment_read_error:null,
									}
							case COMMENT_READ_SUCCESS:
									let origin = state.content.commentcount;
									let newdata = action.data.count;
									if(origin !== newdata){
									origin =newdata;
									}
									return{
													...state,
													comment_read_loading:false,
													comment_read_done:true,
													comment_read_error:null,
													comment:action.data,

													content: 
													{...state.content,
															commentcount: origin
													}
														
													
											
													}
							case COMMENT_READ_FAILURE:
									return{
											...state,
											comment_read_loading:false,
											comment_read_done:false,
											comment_read_error:action.error,
									}  
									
							case COMMENT_WRITE_REQUEST:
									return{
											...state,
											comment_write_loading:true,
											comment_write_done:false,
											comment_write_error:null,
									}
							case COMMENT_WRITE_SUCCESS:
									return{
													...state,
													comment_write_loading:false,
													comment_write_done:true,
													comment_write_error:null,
											}
							case COMMENT_WRITE_FAILURE:
									return{
											...state,
											comment_write_loading:false,
											comment_write_done:false,
											comment_write_error:action.error,
									}  

									case COMMENT_DELETE_REQUEST:
									return{
											...state,
											comment_delete_loading:true,
											comment_delete_done:false,
											comment_delete_error:null,

									}
							case COMMENT_DELETE_SUCCESS:
									return{
													...state,
													comment_delete_loading:false,
													comment_delete_done:true,
	comment_delete_error:null,

											}
							case COMMENT_DELETE_FAILURE:
									return{
											...state,
											comment_delete_loading:false,
											comment_delete_done:false,
											comment_delete_error:action.error,
									
									}  

									

											case COMMENT_LIKE_REQUEST:
													return{
															...state,
															comment_like_loading:true,
															comment_like_done:false,
															comment_like_error:null,
													}
											case COMMENT_LIKE_SUCCESS:



											const map = state.comment.mapper.map(con => 
													con.bcid === action.data.bcid ? {...con, commentlike: action.data.commentlike
																	,likes:action.data.likes, unlikes:action.data.unlikes
													} : con
												)     
											const commentd = {...state.comment, mapper:map}
													return{
																	...state,
																	comment_like_loading:false,
																	comment_like_done:true,
																	comment_like_error:null,
																	comment: commentd   
															}
																		
											case COMMENT_LIKE_FAILURE:
													return{
															...state,
															comment_like_loading:false,
															comment_like_done:false,
															comment_like_error:action.error,
													}  
		default:
			return state;
	}
};

export default R_board;
  