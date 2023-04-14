export const initalState = {
    board_read_loading:false,
    board_read_done:false,
    board_read_error:null,

    board_search_loading:false,
    board_search_done:false,
    board_search_error:null,

    content_read_loading:false,
    content_read_done:false,
    content_read_error:null,

    content_delete_loading:false,
    content_delete_done:false,
    content_delete_error:null,

    board_write_loading:false,
    board_write_done:false,
    board_write_error:null,

    board_delete_loading:false,
    board_delete_done:false,
    board_delete_error:null,

    comment_read_loading:false,
    comment_read_done:false,
    comment_read_error:false,

    comment_write_loading:false,
    comment_write_done:false,
    comment_write_error:null,

    comment_delete_loading:false,
    comment_delete_done:false,
    comment_delete_error:null,


    like_loadng:false,
    like_done:false,
    like_error:null,
   
    comment_like_loadng:false,
    comment_like_done:false,
    comment_like_error:null,

    board:[],
    content:[],
    comment:[],
    like:[],

    likeslikes:[],

  };

  export const BOARD_READ_REQUEST = "BOARD_READ_REQUEST"
  export const BOARD_READ_SUCCESS = "BOARD_READ_SUCCESS"
  export const BOARD_READ_FAILURE = "BOARD_READ_FAILURE"

  export const BOARD_SEARCH_REQUEST = "BOARD_SEARCH_REQUEST"
  export const BOARD_SEARCH_SUCCESS = "BOARD_SEARCH_SUCCESS"
  export const BOARD_SEARCH_FAILURE = "BOARD_SEARCH_FAILURE"
 
  export const CONTENT_READ_REQUEST = "CONTENT_READ_REQUEST"
  export const CONTENT_READ_SUCCESS = "CONTENT_READ_SUCCESS"
  export const CONTENT_READ_FAILURE = "CONTENT_READ_FAILURE"

  export const CONTENT_DELETE_REQUEST = "CONTENT_DELETE_REQUEST"
  export const CONTENT_DELETE_SUCCESS = "CONTENT_DELETE_SUCCESS"
  export const CONTENT_DELETE_FAILURE = "CONTENT_DELETE_FAILURE"

  export const BOARD_WRITE_REQUEST = "BOARD_WRITE_REQUEST"
  export const BOARD_WRITE_SUCCESS = "BOARD_WRITE_SUCCESS"
  export const BOARD_WRITE_FAILURE = "BOARD_WRITE_FAILURE"

  export const BOARD_DELETE_REQUEST = "BOARD_DELETE_REQUEST"
  export const BOARD_DELETE_SUCCESS = "BOARD_DELETE_SUCCESS"
  export const BOARD_DELETE_FAILURE = "BOARD_DELETE_FAILURE"

  export const COMMENT_READ_REQUEST = "COMMENT_READ_REQUEST"
  export const COMMENT_READ_SUCCESS = "COMMENT_READ_SUCCESS"
  export const COMMENT_READ_FAILURE = "COMMENT_READ_FAILURE"
  
  export const COMMENT_WRITE_REQUEST = "COMMENT_WRITE_REQUEST"
  export const COMMENT_WRITE_SUCCESS = "COMMENT_WRITE_SUCCESS"
  export const COMMENT_WRITE_FAILURE = "COMMENT_WRITE_FAILURE"

  export const COMMENT_DELETE_REQUEST = "COMMENT_DELETE_REQUEST"
  export const COMMENT_DELETE_SUCCESS = "COMMENT_DELETE_SUCCESS"
  export const COMMENT_DELETE_FAILURE = "COMMENT_DELETE_FAILURE"

  export const LIKE_REQUEST = "LIKE_REQUEST"
  export const LIKE_SUCCESS = "LIKE_SUCCESS"
  export const LIKE_FAILURE = "LIKE_FAILURE"

  export const COMMENT_LIKE_REQUEST = "COMMENT_LIKE_REQUEST"
  export const COMMENT_LIKE_SUCCESS = "COMMENT_LIKE_SUCCESS"
  export const COMMENT_LIKE_FAILURE = "COMMENT_LIKE_FAILURE"
  const Board = (state = initalState, action) => {
    switch (action.type) {
      //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬
        case BOARD_READ_REQUEST:
            return{
                ...state,
                board_read_loading:true,
                board_read_done:false,
                board_read_error:null,
         }
            case BOARD_READ_SUCCESS:
                return{
                    ...state,
                    board_read_loading:false,
                    board_read_done:true,
                    board_read_error:null,
                    board:action.data
                }
            case BOARD_READ_FAILURE:
                return{
                ...state,
                board_read_loading:false,
                board_read_done:false,
                board_read_error:action.error,
        } 
        case BOARD_SEARCH_REQUEST:
            return{
                ...state,
                board_search_loading:true,
                board_search_done:false,
                board_search_error:null,
         }
            case BOARD_SEARCH_SUCCESS:
                return{
                    ...state,
                    board_search_loading:false,
                    board_search_done:true,
                    board_search_error:null,
                    board:action.data
                }
            case BOARD_SEARCH_FAILURE:
                return{
                ...state,
                board_search_loading:false,
                board_search_done:false,
                board_search_error:action.error,
        } 

        case CONTENT_READ_REQUEST:
            return{
                ...state,
                content_read_loading:true,
                content_read_done:false,
                content_read_error:null,
         }
            case CONTENT_READ_SUCCESS:
                return{
                    ...state,
                    content_read_loading:false,
                    content_read_done:true,
                    content_read_error:null,
                    board_write_done:false,

                    content:action.data


                }
            case CONTENT_READ_FAILURE:
                return{
                ...state,
                content_read_loading:false,
                content_read_done:false,
                content_read_error:action.error,
        }  

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

        case BOARD_WRITE_REQUEST:
            return{
                ...state,
                board_write_loading:true,
                board_write_done:false,
                board_write_error:null,
            }
        case BOARD_WRITE_SUCCESS:
            return{
                    ...state,
                    board_write_loading:false,
                    board_write_done:true,
                    board_write_error:null,
                }
        case BOARD_WRITE_FAILURE:
            return{
                ...state,
                board_write_loading:false,
                board_write_done:false,
                board_write_error:action.error,
            }  
         
            
        case BOARD_DELETE_REQUEST:
            return{
                ...state,
                board_delete_loading:true,
                board_delete_done:false,
                board_delete_error:null,
                }
        case BOARD_DELETE_SUCCESS:
            return{
                ...state,
                board_delete_loading:false,
                board_delete_done:true,
                board_delete_error:null,
                    }
        case BOARD_DELETE_FAILURE:
            return{
                ...state,
                board_delete_loading:false,
                board_delete_done:false,
                board_delete_error:action.error,
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

                    case LIKE_REQUEST:
                        return{
                            ...state,
                            like_loading:true,
                            like_done:false,
                            like_error:null,
                        }
                    case LIKE_SUCCESS:

                 
                        return{
                                ...state,
                                like_loading:false,
                                like_done:true,
                                like_error:null,
                                content:{
                                    ...state.content,
                                    blike: action.data.blike, bunlike: action.data.bunlike
                                                                    ,likes:action.data.likes, unlikes:action.data.unlikes
                                }
                                 }
                                  
                    case LIKE_FAILURE:
                        return{
                            ...state,
                            like_loading:false,
                            like_done:false,
                            like_error:action.error,
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
  export default Board;
  