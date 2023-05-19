/*eslint-disable*/
import React ,{useEffect, useState}from "react";
import styled from "styled-components";
import CommentText from "./CommentText";
import { MessageOutlined} from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import { COMMENT_DELETE_REQUEST} from "../../reducer/R_board";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useNavigate,useParams } from "react-router-dom";
const ReplyComment = ({idd,child,bid,member}) =>
{
    const navigate = useNavigate();
    const {title,id } = useParams();
    const [isValid, setIsValid] = useState(false);
    const [commentvalid, setCommentValid]= useState(false);
    const dispatch = useDispatch();
   const [validId, setValidId] = useState(0);
   const { LOGIN_data } = useSelector((state) => state.R_user_login);

    const onClickReply = ()=>{
        setIsValid(!isValid);
    }
    const onClickCommentReply = (id)=>{
        setValidId(id)
        setCommentValid(!commentvalid);
        console.log(validId)
    }

  
    const detailDate = (a) => {
        const milliSeconds = new Date() - a;
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const days = hours / 24;
        if (days < 7) return `${Math.floor(days)}일 전`;
        const weeks = days / 7;
        if (weeks < 5) return `${Math.floor(weeks)}주 전`;
        const months = days / 30;
        if (months < 12) return `${Math.floor(months)}개월 전`;
        const years = days / 365;
        return `${Math.floor(years)}년 전`;
    };
    //대댓글
    return(
        <CommentWrapper>
            <div className="comment-contentt">
                {member === LOGIN_data.uid ? <div 
                style={{color:'red', float:'left', paddingRight:'20px'}}
                onClick={()=>{

                    if (
                        !window.confirm(
                          "삭제하시겠습니까?"
                        )
                      ) {
                        return;
                      } else {
                    dispatch({
                        type:COMMENT_DELETE_REQUEST,
                        data:{
                            comment:idd
                        }
                    })
                }}
            }>
                    삭제하기
                </div>: ""}
                
                                            <div className="no"
                                            onClick={()=>{
                                                console.log(bid)
                                            }}>
                                                신고
                                            </div>
                                            <div className="comment_to_comment" 
                                            onClick={()=>{
                                                if (LOGIN_data.uid === "No_login") {
                                                    if (
                                                      !window.confirm(
                                                        "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
                                                      )
                                                    ) {
                                                      return;
                                                    } else {
                                                      navigate(`/UserLogin`,{state:`/board/content/${id}/${title}`})
                                                    }
                                            }
                                            else{
                                                onClickReply()}}}>
                                            <MessageOutlined 
                                            style={{paddingRight:"5px"}}/>답글쓰기
                                            </div>
                                        </div>
                                        {isValid? <CommentText id={idd} idtext={""}/>
      
                          
                       :""} 
                        {child.map((data)=>
                        {
                            return(
                                <CommentReply>
                                    <div className="icon">
                                    <SubdirectoryArrowRightIcon />
                                    </div>
                                <div className="comment">
                                                 <div className="name">
                                                     <span className="id">{data.member}</span>
                                                     <span className="time">{detailDate(new Date(data.bcdate))}</span>
                                                 </div>
                                                 <div className="comment-comment">
                                                    <div dangerouslySetInnerHTML={{__html:data.bccomment}}></div>
                                                 <div className="comment-content">
                                                 {member === LOGIN_data.uid ? <div 
                style={{color:'red', float:'left', paddingRight:'20px'}}
                onClick={()=>{

                    if (
                        !window.confirm(
                          "삭제하시겠습니까?"
                        )
                      ) {
                        return;
                      } else {
                    dispatch({
                        type:COMMENT_DELETE_REQUEST,
                        data:{
                            comment:data.bcid
                        }
                    })
                }}
            }>
                    삭제하기
                </div>: ""}
                
                <div className="no"
                onClick={()=>{
                    console.log(bid)
                }}>
                    신고
                </div>
                <div className="comment_to_comment" 
                onClick={()=>{
                    if (LOGIN_data.uid === "No_login") {
                        if (
                          !window.confirm(
                            "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
                          )
                        ) {
                          return;
                        } else {
                          navigate(`/UserLogin`,{state:`/board/content/${id}/${title}`})
                        }
                }
                else{
                    onClickCommentReply(data.bcid)
                console.log(idd)
                }
                }}>
                <MessageOutlined 
                style={{paddingRight:"5px"}}/>답글쓰기
                </div>
                 </div>        
                        </div>
                                </div>
                                         { validId===data.bcid&&commentvalid? <CommentText id={idd} idtext={data.member}/>
 :""} 
                                </CommentReply>
                            )

                        })}                      
                     

                    </CommentWrapper>)
}

const CommentWrapper = styled.div`
.comment-contentt{
    position:relative;
    top:-20px;
    left:65px;
    color: #7b858e;
        margin-top: 8px;
        line-height: 20px;
        font-size: 14px;
        word-wrap: break-word;
        word-break: break-all;
        /* overflow: auto; */
        max-height: 400px;

        .no{
            float:left;
            cursor:pointer;
            margin-right:20px;
            

        }
        .comment_to_comment{
            margin-top: 8px;
            line-height: 20px;
            font-size: 14px;
            word-wrap: break-word;
            word-break: break-all;
            overflow: auto;
            max-height: 400px;
            cursor:pointer;

        
        }
        
    }
}`
const CommentTextt = styled.div`
padding: 24px 16px;
background: #f8f9fa;

.form{
    background-color: #fff;
    border: 1px solid #dddfe4;
    margin-left:80px;
    width:85%;
    .text{
        margin: 8px 16px 0;
        padding-bottom: 16px;

        textarea{
            overflow: hidden;
            overflow-wrap: break-word;
            height: 44px;
            display: block;
            width: 100%;
            min-height: 40px;
            line-height: 20px;
            font-size: 14px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            resize: none;
            border: none;
            outline: none;
            font-family: Helvetica,Arial,Malgun Gothic,sans-serif;
        }
    }
    .button{
        position: relative;
        border-top: 1px solid #dddfe4;
        min-height: 42px;
        box-sizing: border-box;
        padding-right: 110px;

        .number{
            line-height: 40px;
            font-size: 14px;
            color: #7b858e;
            float:right;
        }
        .writebutton{
            position: absolute;
            right: 0;
            bottom: 0;
        .write{
            width: 92px;
padding: 10px 9px;
line-height: 20px;
font-size: 16px;
border-radius: 0;
border-color: #46cfa7;
background-color: #46cfa7;
color: #fff;border: 1px solid #dddfe4;

        }
        }
        }
    }
}
`
const CommentReply = styled.div`
    background: #f8f9fa;
    padding-left: 92px;
    position: relative;
    padding: 12px 12px 12px 64px;
    border-top: 1px solid #ebeef1;
    strong{
        display: inline-block;
    font-weight: 400;
    padding: 0 2px;
    background: #d1f2e8;
    color: #16ae81;
    }
    
   .icon{
    position: absolute;
    top: 12px;
    left: 64px;
    content: "";
    width: 12px;
    height: 12px;
    
   }
    li{
        width:100%;
        position: relative;
    
        left:-40px;
        border-top: 1px solid #dddfe4;
        .comment{
            position: relative;
            padding: 12px 12px 12px 64px;
            
            .comment-comment{
                margin-top: 8px;
                line-height: 20px;
                font-size: 14px;
                color: #1e2022;
                word-wrap: break-word;
                word-break: break-all;
                /* overflow: auto; */
                max-height: 400px;
                cursor:pointer;
            
                .comment-content{
                    margin-top: 8px;
                    line-height: 20px;
                    font-size: 50px;
                    color: #1e2022;
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow: auto;
                    max-height: 400px;
                    
                
                }
                
            }
        }
    }
}
    `
export default ReplyComment;
