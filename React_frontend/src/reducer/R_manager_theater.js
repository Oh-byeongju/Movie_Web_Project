/*
 23-03-29 영화관에 대한 리듀서 (강경목)
 23-04-17 상영관, 영화관 관리자 페이지 리듀서 수정(오병주)
*/
// 영화관 조회 리스트
export const MANAGER_THEATER_REQUEST = "MANAGER_THEATER_REQUEST";
export const MANAGER_THEATER_SUCCESS = "MANAGER_THEATER_SUCCESS";
export const MANAGER_THEATER_FAILURE = "MANAGER_THEATER_FAILURE";

// 영화관 삽입 리스트
export const MANAGER_THEATER_INSERT_REQUEST = "MANAGER_THEATER_INSERT_REQUEST";
export const MANAGER_THEATER_INSERT_SUCCESS = "MANAGER_THEATER_INSERT_SUCCESS";
export const MANAGER_THEATER_INSERT_FAILURE = "MANAGER_THEATER_INSERT_FAILURE";
export const MANAGER_THEATER_INSERT_RESET = "MANAGER_THEATER_INSERT_RESET";

// 영화관 삭제 리스트
export const MANAGER_THEATER_DELETE_REQUEST = "MANAGER_THEATER_DELETE_REQUEST";
export const MANAGER_THEATER_DELETE_SUCCESS = "MANAGER_THEATER_DELETE_SUCCESS";
export const MANAGER_THEATER_DELETE_FAILURE = "MANAGER_THEATER_DELETE_FAILURE";
export const MANAGER_THEATER_DELETE_RESET = "MANAGER_THEATER_DELETE_RESET";

// 상영관 조회 리스트
export const MANAGER_CINEMA_REQUEST = "MANAGER_CINEMA_REQUEST";
export const MANAGER_CINEMA_SUCCESS = "MANAGER_CINEMA_SUCCESS";
export const MANAGER_CINEMA_FAILURE = "MANAGER_CINEMA_FAILURE";






// 아래로 수정



// 상영관 삽입 리스트
export const CINEMA_INSERT_LOADING = "CINEMA_INSERT_LOADING"
export const CINEMA_INSERT_DONE = "CINEMA_INSERT_DONE"
export const CINEMA_INSERT_ERROR = "CINEMA_INSERT_ERROR"


export const MOVIES_REQUEST = "MOVIES_REQUEST"
export const MOVIES_SUCCESS = "MOVIES_SUCCESS"
export const MOVIES_FAILURE = "MOVIES_FAILURE"

export const MOVIE_INSERT_LOADING = "MOVIE_INSERT_LOADING"
export const MOVIE_INSERT_DONE = "MOVIE_INSERT_DONE"
export const MOVIE_INSERT_ERROR = "MOVIE_INSERT_ERROR"

const initalState = {
	THEATER_loading: false,
  THEATER_done: false,
  THEATER_error: false,
	THEATER: [],

	THEATER_INSERT_loading: false,
  THEATER_INSERT_done: false,
  THEATER_INSERT_error: false,

	THEATER_DELETE_loading: false,
  THEATER_DELETE_done: false,
  THEATER_DELETE_error: false,

	CINEMA_loading: false,
  CINEMA_done: false,
  CINEMA_error: false,
	CINEMA: [],


	// 아래로 수정
	cinema_insert_loading: false,
	cinema_insert_done: false,
	cinema_insert_error: null,


	movie_loading:false,
	movie_done:false,
	movie_error:null,
	movie:[],

	movie_insert_loading:false,
	movie_insert_done:false,
	movie_insert_error:null,
};

const R_manager_theater = (state = initalState, action) => {
	switch (action.type) {
		// 영화관 조회 케이스들
		case MANAGER_THEATER_REQUEST:
			return {
				...state,
				THEATER_loading: true,
				THEATER_done: false,
				THEATER_error: false,
			};
		case MANAGER_THEATER_SUCCESS:
			return {
				...state,
				THEATER_loading: false,
				THEATER_done: true,
				THEATER_error: false,
				THEATER: action.data
			};
		case MANAGER_THEATER_FAILURE:
			return {
				...state,
				THEATER_loading: false,
				THEATER_done: false,
				THEATER_error: true,
			};
		// 영화관 삽입 케이스들
		case MANAGER_THEATER_INSERT_REQUEST:
			return {
				...state,
				THEATER_INSERT_loading: true,
				THEATER_INSERT_done: false,
				THEATER_INSERT_error: false
			};
		case MANAGER_THEATER_INSERT_SUCCESS:
			return {
				...state,
				THEATER_INSERT_loading: false,
				THEATER_INSERT_done: true,
				THEATER_INSERT_error: false
			};
		case MANAGER_THEATER_INSERT_FAILURE:
			return {
				...state,
				THEATER_INSERT_loading: false,
				THEATER_INSERT_done: false,
				THEATER_INSERT_error: true
			};
		case MANAGER_THEATER_INSERT_RESET:
			return {
				...state,
				THEATER_INSERT_loading: false,
				THEATER_INSERT_done: false,
				THEATER_INSERT_error: false
			};
		// 영화관 삭제 케이스들
		case MANAGER_THEATER_DELETE_REQUEST:
			return {
				...state,
				THEATER_DELETE_loading: true,
				THEATER_DELETE_done: false,
				THEATER_DELETE_error: false
			};
		case MANAGER_THEATER_DELETE_SUCCESS:
			return {
				...state,
				THEATER_DELETE_loading: false,
				THEATER_DELETE_done: true,
				THEATER_DELETE_error: false
			};
		case MANAGER_THEATER_DELETE_FAILURE:
			return {
				...state,
				THEATER_DELETE_loading: false,
				THEATER_DELETE_done: false,
				THEATER_DELETE_error: true
			};
		case MANAGER_THEATER_DELETE_RESET:
			return {
				...state,
				THEATER_DELETE_loading: false,
				THEATER_DELETE_done: false,
				THEATER_DELETE_error: false
			};






		// 상영관 조회 케이스들
		case MANAGER_CINEMA_REQUEST:
			return {
				...state,
				CINEMA_loading: true,
				CINEMA_done: false,
				CINEMA_error: false,
			};
		case MANAGER_CINEMA_SUCCESS:
			return {
				...state,
				CINEMA_loading: false,
				CINEMA_done: true,
				CINEMA_error: false,
				CINEMA: action.data
			};
		case MANAGER_CINEMA_FAILURE:
			return {
				...state,
				CINEMA_loading: false,
				CINEMA_done: false,
				CINEMA_error: true,
			};




	// 아래로 수정
	

	case CINEMA_INSERT_LOADING:
			return{
					...state,
					cinema_insert_loading:true,
					cinema_insert_done:false,
					cinema_insert_error:null,
					}
	case CINEMA_INSERT_DONE:
			return{
					...state,
					cinema_insert_loading:false,
					cinema_insert_done:true,
					cinema_insert_error:null,
					}

	case CINEMA_INSERT_ERROR:
			return{
					...state,
					cinema_insert_loading:false,
					cinema_insert_done:false,
					cinema_insert_error:action.error,
			}
	case MOVIES_REQUEST:
			return{
					...state,
					movie_loading:true,
					movie_done:false,
					movie_error:null
			}
	case MOVIES_SUCCESS:
			return{
					...state,
					movie_loading:false,
					movie_done:true,
					movie_error:null,
					movie:action.data
			}
	case MOVIES_FAILURE:
			return{
					...state,
					movie_loading:false,
					movie_done:false,
					movie_error:action.error,
			}   
	case MOVIE_INSERT_LOADING:
			return{
					...state,
					movie_insert_loading:true,
					movie_insert_done:false,
					movie_insert_error:null,
					}
	case MOVIE_INSERT_DONE:
			return{
					...state,
					movie_insert_loading:false,
					movie_insert_done:true,
					movie_insert_error:null,
			}
	
	case MOVIE_INSERT_ERROR:
			return{
					...state,
					movie_insert_loading:false,
					movie_insert_done:false,
					movie_insert_error:action.error,
			}        
		default:
      return state;
	}
}

export default R_manager_theater;