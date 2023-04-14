export const initalState = {
    select_theater_loading:false,
    select_theater_done:false,
    select_theater_error:null,

    MOVIE_loading:false,
    MOVIE_done:false,
    MOVIE_error:null,

    day_loading:false,
    day_done:false,
    day_error:null,
    theater:[],
    area:"",
    movie:[],
    city:"",
    date:[],
    allMovie:[],
    dayone:""

  };
  export const MOVIE_DATAS = "MOVIE_DATAS";
  export const AREA_DATAS = "AREA_DATAS"
  export const THEATER_DATAS="THEATER_DATAS" 
  export const DAY_DATAS = "DAY_DATAS"

  export const MOVIE_REQUEST = "MOVIE_REQUEST"
  export const MOVIE_SUCCESS = "MOVIE_SUCCESS"
  export const MOVIE_FAILURE = "MOVIE_FAILURE"

  export const SELECT_SC_THEATER_REQUEST = "SELECT_SC_THEATER_REQUEST"
  export const SELECT_SC_THEATER_SUCCESS = "SELECT_SC_THEATER_SUCCESS"
  export const SELECT_SC_THEATER_FAILURE = "SELECT_SC_THEATER_FAILURE"


  export const DAY_REQUEST = "DAY_REQUEST"
  export const DAY_SUCCESS = "DAY_SUCCESS"
  export const DAY_FAILURE = "DAY_FAILURE"
  const TimeTable = (state = initalState, action) => {
    switch (action.type) {
      //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬
        case MOVIE_DATAS:
            return{
                ...state,
                movie:action.data
            }
        case AREA_DATAS:
          return{
            ...state,
            area:action.data,
          }
        case THEATER_DATAS:
          return{
            ...state,
            city:action.data
          }
        case DAY_DATAS:
          return{
            ...state,  
            dayone:action.data
          }
        case SELECT_SC_THEATER_REQUEST:
          return{
            ...state,
            select_theater_loading:true,
            select_theater_done:false,
            select_theater_error:null,
          }
        case SELECT_SC_THEATER_SUCCESS:
          return{
            ...state,
            select_theater_loading:false,
            select_theater_done:true,
            select_theater_error:null,
            theater:action.data
          }
        case SELECT_SC_THEATER_FAILURE:
          return{
            ...state,
            select_theater_loading:false,
            select_theater_done:false,
            select_theater_error:action.error,
          }

          case MOVIE_REQUEST:
            return{
              ...state,
              MOVIE_loading:true,
              MOVIE_done:false,
              MOVIE_error:null,
            }
          case MOVIE_SUCCESS:
            return{
              ...state,
              MOVIE_loading:false,
              MOVIE_done:true,
              MOVIE_error:null,
              allMovie:action.data
            }
          case MOVIE_FAILURE:
            return{
              ...state,
              MOVIE_loading:false,
              MOVIE_done:false,
            MOVIE_error:action.error,
            }

          case MOVIE_REQUEST:
          return{
            ...state,
            MOVIE_loading:true,
            MOVIE_done:false,
            MOVIE_error:null,
          }
        case DAY_SUCCESS:
          return{
            ...state,
            day_loading:false,
            day_done:true,
            day_error:null,
            date:action.data
          }
        case DAY_FAILURE:
          return{
            ...state,
            day_loading:false,
            day_done:false,
          day_error:action.error,
          }
      default:
        return state;
    }
  };
  export default TimeTable;
  