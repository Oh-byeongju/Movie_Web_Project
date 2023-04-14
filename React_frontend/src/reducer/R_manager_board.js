
const initalState = {
  board_read_loading :false,
  board_read_done:false,
  board_read_error:false,
  board:[],

  board_select_loading :false,
  board_select_done:false,
  board_select_error:false,

  board_delete_loading:false,
  board_delete_done:false,
  board_delete_error:false,

  comment_read_loading:false,
  comment_read_done:false,
  comment_read_error:false,
  comment:[]
};
export const BOARD_READ_LOADING = "BOARD_READ_LOADING"
export const BOARD_READ_DONE = "BOARD_READ_DONE"
export const BOARD_READ_ERROR = "BOARD_READ_ERROR"

export const BOARD_SELECT_LOADING = "BOARD_SELECT_LOADING"
export const BOARD_SELECT_DONE = "BOARD_SELECT_DONE"
export const BOARD_SELECT_ERROR = "BOARD_SELECT_ERROR"

export const BOARD_DELETE_LOADING = "BOARD_DELETE_LOADING"
export const BOARD_DELETE_DONE = "BOARD_DELETE_DONE"
export const BOARD_DELETE_ERROR = "BOARD_DELETE_ERROR"

export const M_COMMENT_READ_REQUEST = "M_COMMENT_READ_REQUEST"
export const M_COMMENT_READ_SUCCESS = "M_COMMENT_READ_SUCCESS"
export const M_COMMENT_READ_FAILURE = "M_COMMENT_READ_FAILURE"
const R_manager_board = (state = initalState, action) => {
	switch (action.type) {
           case BOARD_READ_LOADING:
            return{
                ...state,
                board_read_loading :true,
                board_read_done:false,
                board_read_error:false,
            }
            case BOARD_READ_DONE:
                return{
                    ...state,
                    board_read_loading :false,
                    board_read_done:true,
                    board_read_error:false,
                    board:action.data
                }
            case BOARD_READ_ERROR:
                return{
                    ...state,
                    board_read_loading :false,
                    board_read_done:false,
                    board_read_error:action.error,
                }
            case BOARD_SELECT_LOADING:
                return{
                    ...state,
                    board_select_loading :true,
                    board_select_done:false,
                    board_select_error:false,
                }
            case BOARD_SELECT_DONE:
                return{
                    ...state,
                    board_select_loading :false,
                    board_select_done:true,
                    board_select_error:false,
                    board:action.data
                    }
            case BOARD_SELECT_ERROR:
                return{
                    ...state,
                    board_select_loading :false,
                    board_select_done:false,
                    board_select_error:action.error,
                    }

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