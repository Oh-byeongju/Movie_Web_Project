/*
  23-04-30 예매 좌석 페이지 수정(오병주)
*/
// 좌석 페이지 초기화 리스트
export const SEAT_PAGE_RESET = "SEAT_PAGE_RESET"

// 좌석 목록 조회 리스트
export const SEAT_LIST_REQUEST = "SEAT_LIST_REQUEST";
export const SEAT_LIST_SUCCESS = "SEAT_LIST_SUCCESS";
export const SEAT_LIST_FAILURE = "SEAT_LIST_FAILURE";

// 인원 선택 리스트
export const USER_CHOICE = "USER_CHOICE";
export const USER_REMOVE = "USER_REMOVE";

// 좌석 선택 리스트
export const SEAT_CHOICE = "SEAT_CHOICE";
export const SEAT_REMOVE = "SEAT_REMOVE";




export const PAGE_RESET = "PAGE_RESET";

export const SELECT_SEAT_REQUEST = "SELECT_SEAT_REQUEST";
export const SELECT_SEAT_SUCCESS = "SELECT_SEAT_SUCCESS";
export const SELECT_SEAT_FAILURE = "SELECT_SEAT_FAILURE";

export const CHECK_SEAT_REQUEST = "CHECK_SEAT_REQUEST";
export const CHECK_SEAT_SUCCESS = "CHECK_SEAT_SUCCESS";
export const CHECK_SEAT_FAILURE = "CHECK_SEAT_FAILURE";


export const initalState = {
	Kid: 0,
	Teenager: 0,
	Adult: 0,
	Price: 0,
	Total: 0,
	ChoiceSeat: [],

	SEAT_LIST_loading: false,
  SEAT_LIST_done: false,
  SEAT_LIST_error: false,
	SEAT_LIST: [],



  choiceSeat: [],
  어른: 0,
  학생: 0,
  아이: 0,

  select_seat_loading: false,
  select_seat_done: false,
  select_seat_error: null,
  selectseat: [],

  
  check_seat_loading: false,
  check_seat_done: false,
  check_seat_error: null,
  price: 0,
  total: 0,



	// 얘 css에 안쓰이는거 확인되면 날려버리기
	selectinfoseat: [],

};



const R_seat = (state = initalState, action) => {
  switch (action.type) {
		// 좌석 페이지 초기화 케이스
		case SEAT_PAGE_RESET:
      return {
        ...state,
        Kid: 0,
				Teenager: 0,
				Adult: 0,
				Price: 0,
				Total: 0,
				ChoiceSeat: []
      };
		// 좌석 조회 케이스들
    case SEAT_LIST_REQUEST:
      return {
        ...state,
        SEAT_LIST_loading: true,
        SEAT_LIST_done: false,
        SEAT_LIST_error: false
      };
    case SEAT_LIST_SUCCESS:
      return {
        ...state,
        SEAT_LIST_loading: false,
        SEAT_LIST_done: true,
        SEAT_LIST_error: false,
        SEAT_LIST: action.data
      };
    case SEAT_LIST_FAILURE:
      return {
        ...state,
        SEAT_LIST_loading: false,
        SEAT_LIST_done: false,
        SEAT_LIST_error: true
      };	
		// 인원 선택, 제거 케이스
		case USER_CHOICE:
			var tmp_Adult = state.Adult;
			var tmp_Teenager = state.Teenager;
			var tmp_Kid = state.Kid;

			if (action.data.type === "유아") {
				tmp_Kid = state.Kid + 1;
			} 
			else if (action.data.type === "학생") {
				tmp_Teenager = state.Teenager + 1;
			} 
			else {
				tmp_Adult = state.Adult + 1;
			}
			return {
				...state,
				Kid: tmp_Kid,
				Teenager: tmp_Teenager,
				Adult: tmp_Adult,
				Price: state.Price + action.data.price,
				Total: state.Total + 1,
			};
		case USER_REMOVE:
			var tmp_Adult2 = state.Adult;
			var tmp_Teenager2 = state.Teenager;
			var tmp_Kid2 = state.Kid;

			if (action.data.type === "유아") {
				tmp_Kid2 = state.Kid - 1;
			} 
			else if (action.data.type === "학생") {
				tmp_Teenager2 = state.Teenager - 1;
			} 
			else {
				tmp_Adult2 = state.Adult - 1;
			} 
			return {
				...state,
				Kid: tmp_Kid2,
				Teenager: tmp_Teenager2,
				Adult: tmp_Adult2,
				Price: state.Price - action.data.price,
				Total: state.Total - 1
			};
		// 좌석 선택, 제거 케이스
		case SEAT_CHOICE:
			var data =[...state.ChoiceSeat, action.data];
			// 정렬시키는 함수
			var result = data.sort(function (a, b) {
				var x = a.seat_id;
				let y = b.seat_id;
				if(x < y){
					return -1
				}
				if(x > y){
					return 1
				}
				return 0;
			})
			return {
				...state,
				ChoiceSeat: result
			};
		case SEAT_REMOVE:
			return {
				...state,
				ChoiceSeat: state.ChoiceSeat.filter((seat) => seat.seat_id !== action.data)
			};







    case PAGE_RESET:
      return {
        ...state,
        choiceSeat: [],
        아이:0,
        학생:0,
        어른:0,
        price: 0,
        total: 0,
      };
   

    

    

			
    case SELECT_SEAT_REQUEST:
      return {
        ...state,
        select_seat_loading: true,
        select_seat_done: false,
        select_seat_error: null,
      };
    case SELECT_SEAT_SUCCESS:
      return {
        ...state,
        select_seat_loading: false,
        select_seat_done: true,
        select_seat_error: null,
        selectseat: action.data,
      };
    case SELECT_SEAT_FAILURE:
      return {
        ...state,
        select_seat_loading: false,
        select_seat_done: false,
        select_seat_error: null,
      };

    case CHECK_SEAT_REQUEST:
      return {
        ...state,
        check_seat_loading: true,
        check_seat_done: false,
        check_seat_error: null,
      };
    case CHECK_SEAT_SUCCESS:
      return {
        ...state,
        check_seat_loading: false,
        check_seat_done: true,
        check_seat_error: null,
      };
    case CHECK_SEAT_FAILURE:
      return {
        ...state,
        check_seat_loading: false,
        check_seat_done: false,
        check_seat_error: action.error,
        choiceSeat: [],
      };
    default:
      return state;
  }
};
export default R_seat;
