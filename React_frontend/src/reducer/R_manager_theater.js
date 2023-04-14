/*
 23-03-29 영화관에 대한 리듀서 (강경목)
*/

const initalState = {
    cinema_loading:false,
    cinema_done:false,
    cinema_error:null,
    cinema:[],

    theater_insert_loading:false,
    theater_insert_done:false,
    theater_insert_error:null,

    cinema_insert_loading:false,
    cinema_insert_done:false,
    cinema_insert_error:null,

    movie_loading:false,
    movie_done:false,
    movie_error:null,
    movie:[],

    movie_insert_loading:false,
    movie_insert_done:false,
    movie_insert_error:null,

};


export const CINEMA_LOADING = "CINEMA_LOADING"
export const CINEMA_DONE = "CINEMA_DONE"
export const CINEMA_ERROR = "CINEMA_ERROR"

export const THEATER_INSERT_LOADING = "THEATER_INSERT_LOADING"
export const THEATER_INSERT_DONE = "THEATER_INSERT_DONE"
export const THEATER_INSERT_ERROR = "THEATER_INSERT_ERROR"

export const CINEMA_INSERT_LOADING = "CINEMA_INSERT_LOADING"
export const CINEMA_INSERT_DONE = "CINEMA_INSERT_DONE"
export const CINEMA_INSERT_ERROR = "CINEMA_INSERT_ERROR"

export const MOVIES_REQUEST = "MOVIES_REQUEST"
export const MOVIES_SUCCESS = "MOVIES_SUCCESS"
export const MOVIES_FAILURE = "MOVIES_FAILURE"

export const MOVIE_INSERT_LOADING = "MOVIE_INSERT_LOADING"
export const MOVIE_INSERT_DONE = "MOVIE_INSERT_DONE"
export const MOVIE_INSERT_ERROR = "MOVIE_INSERT_ERROR"
const R_manager_theater = (state = initalState, action) => {
	switch (action.type) {
            case CINEMA_LOADING:
                return{
                    ...state,
                    cinema_loading:true,
                    cinema_done:false,
                    cinema_error:null
                }
            case CINEMA_DONE:
                return{
                    ...state,
                    cinema_loading:false,
                    cinema_done:true,
                    cinema_error:null,
                    cinema:action.data
                }

            case CINEMA_ERROR:
                return{
                    ...state,
                    cinema_loading:false,
                    cinema_done:false,
                    cinema_error:action.error
                }

            case THEATER_INSERT_LOADING:
                return{
                    ...state,
                    theater_insert_loading:true,
                    theater_insert_done:false,
                    theater_insert_error:null,
                }
            case THEATER_INSERT_DONE:
                return{
                    ...state,
                    theater_insert_loading:false,
                    theater_insert_done:true,
                    theater_insert_error:null,
                }
    
            case THEATER_INSERT_ERROR:
                return{
                    ...state,
                    theater_insert_loading:false,
                    theater_insert_done:false,
                    theater_insert_error:action.error,
                }

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