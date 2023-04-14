export const initalState = {
  choiceSeat: [],
  어른: 0,
  학생: 0,
  아이: 0,
  select_seat_loading: false,
  select_seat_done: false,
  select_seat_error: null,
  selectseat: [],
  select_infoseat_loading: false,
  select_infoseat_done: false,
  select_infoseat_error: null,
  selectinfoseat: [],
  check_seat_loading: false,
  check_seat_done: false,
  check_seat_error: null,
  price: 0,
  total: 0,
};

export const PAGE_RESET = "PAGE_RESET";

export const SEAT_CHOICE = "SEAT_CHOICE";
export const SEAT_REMOVE = "SEAT_REMOVE";

export const USER_CHOICE = "USER_CHOICE";
export const USER_REMOVE = "USER_REMOVE";

export const SELECT_SEAT_REQUEST = "SELECT_SEAT_REQUEST";
export const SELECT_SEAT_SUCCESS = "SELECT_SEAT_SUCCESS";
export const SELECT_SEAT_FAILURE = "SELECT_SEAT_FAILURE";

export const CHECK_SEAT_REQUEST = "CHECK_SEAT_REQUEST";
export const CHECK_SEAT_SUCCESS = "CHECK_SEAT_SUCCESS";
export const CHECK_SEAT_FAILURE = "CHECK_SEAT_FAILURE";

const seat = (state = initalState, action) => {
  switch (action.type) {
    //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬

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
    case SEAT_CHOICE:
      let data =[...state.choiceSeat, action.data];
      let nameresult = data.sort(function (a,b){ //정렬 
        let x =a.seat_id;
        let y =b.seat_id;
        if(x<y){
          return -1
        }
        if( x>y){
          return 1
        }
        return 0;
      })

      return {
        ...state,
        choiceSeat: nameresult
      };

    case SEAT_REMOVE:
      return {
        ...state,
        choiceSeat: state.choiceSeat.filter(
          (seat) => seat.seat_id !== action.data
        ),
        //filter를 해서 제거해야함
      };

    case USER_CHOICE:
      let 어른1 = state.어른;
      let 학생1 = state.학생;
      let 아이1 = state.아이;
      if (action.data === "어른") {
        어른1 = state.어른 + 1;
      } else if (action.data === "학생") {
        학생1 = state.학생 + 1;
      } else if (action.data === "아이") {
        아이1 = state.아이 + 1;
      } else {
      }
      return {
        ...state,
        어른: 어른1,
        학생: 학생1,
        아이: 아이1,
        price: state.price + action.price,
        total: state.total + 1,
      };

    case USER_REMOVE:
      let 어른2 = state.어른;
      let 학생2 = state.학생;
      let 아이2 = state.아이;
    if (action.data === "어른") {
      어른2 = state.어른 -1;
    } else if (action.data === "학생") {
      학생2 = state.학생 - 1;
    } else if (action.data === "아이") {
      아이2 = state.아이 - 1;
    } else {
    }
      return {
        ...state,
        어른: 어른2,
        학생: 학생2,
        아이: 아이2,
        price: state.price - action.price,
        total: state.total - 1,
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
export default seat;
