/*검색
	23-05-30 관리자 게시물 페이지 리듀서 수정(오병주)
*/
// 게시물 조회 리스트
export const MANAGER_BOARD_LIST_REQUEST = "MANAGER_BOARD_LIST_REQUEST";
export const MANAGER_BOARD_LIST_SUCCESS = "MANAGER_BOARD_LIST_SUCCESS";
export const MANAGER_BOARD_LIST_FAILURE = "MANAGER_BOARD_LIST_FAILURE";

// 게시물 검색 리스트
export const MANAGER_BOARD_SEARCH_REQUEST = "MANAGER_BOARD_SEARCH_REQUEST";
export const MANAGER_BOARD_SEARCH_SUCCESS = "MANAGER_BOARD_SEARCH_SUCCESS";
export const MANAGER_BOARD_SEARCH_FAILURE = "MANAGER_BOARD_SEARCH_FAILURE";




// 아래로 날려

export const BOARD_DELETE_LOADING = "BOARD_DELETE_LOADING"
export const BOARD_DELETE_DONE = "BOARD_DELETE_DONE"
export const BOARD_DELETE_ERROR = "BOARD_DELETE_ERROR"

export const M_COMMENT_READ_REQUEST = "M_COMMENT_READ_REQUEST"
export const M_COMMENT_READ_SUCCESS = "M_COMMENT_READ_SUCCESS"
export const M_COMMENT_READ_FAILURE = "M_COMMENT_READ_FAILURE"
//위로날련



const initalState = {
	MANAGER_BOARD_LIST_loading: false,
  MANAGER_BOARD_LIST_done: false,
  MANAGER_BOARD_LIST_error: false,
	MANAGER_BOARD_LIST: [],

	MANAGER_BOARD_SEARCH_loading: false,
  MANAGER_BOARD_SEARCH_done: false,
  MANAGER_BOARD_SEARCH_error: false,



	// 아래로 날려

  board_delete_loading:false,
  board_delete_done:false,
  board_delete_error:false,

  comment_read_loading:false,
  comment_read_done:false,
  comment_read_error:false,
  comment:[]
};

const R_manager_board = (state = initalState, action) => {
	switch (action.type) {
		// 게시물 조회 케이스들
    case MANAGER_BOARD_LIST_REQUEST:
      return {
        ...state,
        MANAGER_BOARD_LIST_loading: true,
        MANAGER_BOARD_LIST_done: false,
        MANAGER_BOARD_LIST_error: false
      };
    case MANAGER_BOARD_LIST_SUCCESS:
      return {
        ...state,
        MANAGER_BOARD_LIST_loading: false,
        MANAGER_BOARD_LIST_done: true,
        MANAGER_BOARD_LIST_error: false,
        MANAGER_BOARD_LIST: action.data
      };
    case MANAGER_BOARD_LIST_FAILURE:
      return {
        ...state,
        MANAGER_BOARD_LIST_loading: false,
        MANAGER_BOARD_LIST_done: false,
        MANAGER_BOARD_LIST_error: true
      };
		// 게시물 검색 케이스들
    case MANAGER_BOARD_SEARCH_REQUEST:
      return {
        ...state,
        MANAGER_BOARD_SEARCH_loading: true,
        MANAGER_BOARD_SEARCH_done: false,
        MANAGER_BOARD_SEARCH_error: false
      };
    case MANAGER_BOARD_SEARCH_SUCCESS:
      return {
        ...state,
        MANAGER_BOARD_SEARCH_loading: false,
        MANAGER_BOARD_SEARCH_done: true,
        MANAGER_BOARD_SEARCH_error: false,
        MANAGER_BOARD_LIST: action.data
      };
    case MANAGER_BOARD_SEARCH_FAILURE:
      return {
        ...state,
        MANAGER_BOARD_SEARCH_loading: false,
        MANAGER_BOARD_SEARCH_done: false,
        MANAGER_BOARD_SEARCH_error: true
      };







		// 아래로 날려

          

		case BOARD_DELETE_LOADING:
				return{
						...state,
						board_delete_loading :true,
						board_delete_done:false,
						board_delete_error:false,
				}
		case BOARD_DELETE_DONE:
				return{
						...state,
						board_delete_loading :false,
						board_delete_done:true,
						board_delete_error:false,
						}
		case BOARD_DELETE_ERROR:
				return{
						...state,
						board_delete_loading :false,
						board_delete_done:false,
						board_delete_error:action.error,
						}
						case M_COMMENT_READ_REQUEST:
								return{
										...state,
										comment_read_loading:true,
										comment_read_done:false,
										comment_read_error:null,
								}
						case M_COMMENT_READ_SUCCESS:
								return{
												...state,
												comment_read_loading:false,
												comment_read_done:true,
												comment_read_error:null,
												comment:action.data,
												}
						case M_COMMENT_READ_FAILURE:
								return{
										...state,
										comment_read_loading:false,
										comment_read_done:false,
										comment_read_error:action.error,
								}  

                            
		default:
      return state;
	}
}

export default R_manager_board;