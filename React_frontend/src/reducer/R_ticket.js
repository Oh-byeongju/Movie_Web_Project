/*
	23-04-27 ~ 28 예매 페이지 리듀서 수정(오병주)
*/
// 영화 목록 조회 리스트
export const TICKET_MOVIE_LIST_REQUEST = "TICKET_MOVIE_LIST_REQUEST";
export const TICKET_MOVIE_LIST_SUCCESS = "TICKET_MOVIE_LIST_SUCCESS";
export const TICKET_MOVIE_LIST_FAILURE = "TICKET_MOVIE_LIST_FAILURE";
export const TICKET_MOVIE_SELECT = "TICKET_MOVIE_SELECT";

// 극장 목록 조회 리스트
export const TICKET_THEATER_LIST_REQUEST = "TICKET_THEATER_LIST_REQUEST";
export const TICKET_THEATER_LIST_SUCCESS = "TICKET_THEATER_LIST_SUCCESS";
export const TICKET_THEATER_LIST_FAILURE = "TICKET_THEATER_LIST_FAILURE";
export const TICKET_THEATER_SELECT = "TICKET_THEATER_SELECT";

// 날짜 목록 조회 리스트
export const TICKET_DAY_LIST_REQUEST = "TICKET_DAY_LIST_REQUEST";
export const TICKET_DAY_LIST_SUCCESS = "TICKET_DAY_LIST_SUCCESS";
export const TICKET_DAY_LIST_FAILURE = "TICKET_DAY_LIST_FAILURE";
export const TICKET_DAY_SELECT = "TICKET_DAY_SELECT";

// 상영정보 목록 조회 리스트
export const TICKET_MOVIEINFO_LIST_REQUEST = "TICKET_MOVIEINFO_LIST_REQUEST";
export const TICKET_MOVIEINFO_LIST_SUCCESS = "TICKET_MOVIEINFO_LIST_SUCCESS";
export const TICKET_MOVIEINFO_LIST_FAILURE = "TICKET_MOVIEINFO_LIST_FAILURE";
export const TICKET_MOVIEINFO_SELECT = "TICKET_MOVIEINFO_SELECT";

const initalState = {
	MOVIE_LIST_loading: false,
  MOVIE_LIST_done: false,
  MOVIE_LIST_error: false,
	MOVIE_LIST: [],
	MOVIE: '',

	THEATER_LIST_loading: false,
  THEATER_LIST_done: false,
  THEATER_LIST_error: false,
	THEATER_LIST: [],
	THEATER: '',

	DAY_LIST_loading: false,
  DAY_LIST_done: false,
  DAY_LIST_error: false,
	DAY_LIST: [],
	DAY: '',

	MOVIEINFO_LIST_loading: false,
  MOVIEINFO_LIST_done: false,
  MOVIEINFO_LIST_error: false,
	MOVIEINFO_LIST: [],
	MOVIEINFO: '',


	// 아래로 수정	
	// 아래로 수정

  select_schedule_loading: false,
  select_schedule_done: false,
  select_schedule_error: null,

  payment_loading: false,
  payment_done: false,
  payment_error: null,
  payment: "",
  selectSchedule: [],
  disableTheater: [],

  //검색한 데이터들을 담아두기
  scheduleData: "", //영화Info 데이터
  reservepage: false,
};


export const SELECT_SCHEDULE_REQUEST = "SELECT_SCHEDULE_REQUEST";
export const SELECT_SCHEDULE_SUCCESS = "SELECT_SCHEDULE_SUCCESS";
export const SELECT_SCHEDULE_FAILURE = "SELECT_SCHEDULE_FAILURE";

export const PAYMENT_REQUEST = "PAYMENT_REQUEST";
export const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";
export const PAYMENT_FAILURE = "PAYMENT_FAILURE";
////////////////////////////////////////밑은 데이터 모아두는 곳
export const SCHEDULE_DATA = "SCHEDULE_DATA";

//검색 데이터 초기화 하기



export const RESET_RESERVE_PAGE = "RESET_RESERVE_PAGE";
export const RESERVE_LOGIN_PAGE = "RESERVE_LOGIN_PAGE";

const R_ticket = (state = initalState, action) => {
  switch (action.type) {
		// 영화 조회 케이스들
    case TICKET_MOVIE_LIST_REQUEST:
      return {
        ...state,
        MOVIE_LIST_loading: true,
        MOVIE_LIST_done: false,
        MOVIE_LIST_error: false
      };
    case TICKET_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        MOVIE_LIST_loading: false,
        MOVIE_LIST_done: true,
        MOVIE_LIST_error: false,
        MOVIE_LIST: action.data
      };
    case TICKET_MOVIE_LIST_FAILURE:
      return {
        ...state,
        MOVIE_LIST_loading: false,
        MOVIE_LIST_done: false,
        MOVIE_LIST_error: true
      };
    case TICKET_MOVIE_SELECT:
      return {
        ...state,
        MOVIE: action.data
      };
		// 극장 조회 케이스들
    case TICKET_THEATER_LIST_REQUEST:
      return {
        ...state,
        THEATER_LIST_loading: true,
        THEATER_LIST_done: false,
        THEATER_LIST_error: false
      };
    case TICKET_THEATER_LIST_SUCCESS:
      return {
        ...state,
        THEATER_LIST_loading: false,
        THEATER_LIST_done: true,
        THEATER_LIST_error: false,
        THEATER_LIST: action.data
      };
    case TICKET_THEATER_LIST_FAILURE:
      return {
        ...state,
        THEATER_LIST_loading: false,
        THEATER_LIST_done: false,
        THEATER_LIST_error: true
      };
    case TICKET_THEATER_SELECT:
      return {
        ...state,
        THEATER: action.data
      };
		// 날짜 조회 케이스들
    case TICKET_DAY_LIST_REQUEST:
      return {
        ...state,
        DAY_LIST_loading: true,
        DAY_LIST_done: false,
        DAY_LIST_error: false
      };
    case TICKET_DAY_LIST_SUCCESS:
      return {
        ...state,
        DAY_LIST_loading: false,
        DAY_LIST_done: true,
        DAY_LIST_error: false,
        DAY_LIST: action.data
      };
    case TICKET_DAY_LIST_FAILURE:
      return {
        ...state,
        DAY_LIST_loading: false,
        DAY_LIST_done: false,
        DAY_LIST_error: true
      };
    case TICKET_DAY_SELECT:
      return {
        ...state,
        DAY: action.data
      };
		// 상영정보 조회 케이스들
    case TICKET_MOVIEINFO_LIST_REQUEST:
      return {
        ...state,
        MOVIEINFO_LIST_loading: true,
        MOVIEINFO_LIST_done: false,
        MOVIEINFO_LIST_error: false
      };
    case TICKET_MOVIEINFO_LIST_SUCCESS:
      return {
        ...state,
        MOVIEINFO_LIST_loading: false,
        MOVIEINFO_LIST_done: true,
        MOVIEINFO_LIST_error: false,
        MOVIEINFO_LIST: action.data
      };
    case TICKET_MOVIEINFO_LIST_FAILURE:
      return {
        ...state,
        MOVIEINFO_LIST_loading: false,
        MOVIEINFO_LIST_done: false,
        MOVIEINFO_LIST_error: true
      };
    case TICKET_MOVIEINFO_SELECT:
      return {
        ...state,
        MOVIEINFO: action.data
      };




			// 아래로 수정
    case SELECT_SCHEDULE_REQUEST:
      return {
        ...state,
        select_schedule_loading: true,
        select_schedule_done: false,
        select_schedule_error: null,
        choiceDay: false,
      };
    case SELECT_SCHEDULE_SUCCESS:
      return {
        ...state,
        select_schedule_loading: false,
        select_schedule_done: true,
        select_schedule_error: null,
        selectSchedule: action.data,
      };
    case SELECT_SCHEDULE_FAILURE:
      return {
        ...state,
        select_schedule_loading: false,
        select_schedule_done: false,
        select_schedule_error: null,
      };

    case PAYMENT_REQUEST:
      return {
        ...state,
        payment_loading: true,
        payment_done: false,
        payment_error: null,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        payment_loading: false,
        payment_done: true,
        payment_error: null,
        payment: action.data,

      };
    case PAYMENT_FAILURE:
      return {
        ...state,
        payment_loading: false,
        payment_done: false,
        payment_error: null,
      };

  


    case SCHEDULE_DATA:
      return {
        ...state,
        scheduleData: action.data,
      };
    

    case RESET_RESERVE_PAGE:
      const copydatare = [...state.allDay];
      return {
        ...state,
        movieData: "",
        choiceMovie: false,
        theaterData: "",
        choiceTheater: false,
        DayData: "",
        choiceDay: false,
        selectDay: [...copydatare],
        scheduleData: "",
        payment:""
      };

    case RESERVE_LOGIN_PAGE:
      return {
        ...state,
        reservepage: true,
      };
    default:
      return state;
  }
};
export default R_ticket;
