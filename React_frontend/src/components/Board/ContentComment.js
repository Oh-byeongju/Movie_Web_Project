import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SyncOutlined,CaretUpOutlined, CaretDownOutlined} from "@ant-design/icons";
import { useParams,useNavigate ,useLocation,} from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux"
import { COMMENT_LIKE_REQUEST, COMMENT_LIKE_SUCCESS, COMMENT_READ_REQUEST, COMMENT_WRITE_REQUEST,LIKE_REQUEST } from "../../reducer/Board";
import ReplyComment from "./ReplyComment";
const ContentComment = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {id,title} = useParams();
    const { LOGIN_data } = useSelector((state) => state.R_user_login);
    const [text, setText] =useState("");
    const [count, setCount]  = useState(0)
    const onChangeText =(e)=>{
        setText(e.target.value)
        setCount(e.target.value.length)
    }
    const menu = [{name:'최신순',type:"new"}, {name:'인기순',type:"top"}];
    const [type , setType] = useState("new");

    const onClickMenu = (data)=>{
        setType(data)
    }
    const {content,comment,comment_read_loading, comment_read_done,comment_write_done,comment_delete_done} = useSelector((state)=>state.Board)
   
        useEffect(()=>{
            dispatch({
                type:COMMENT_READ_REQUEST,
                data:{
                    bid:id,
                    type:type
                }
            })
        },[comment_write_done,comment_delete_done,type])
        
        const onClickComment=()=>{

            if (
                !window.confirm(
                  "작성하시겠습니까?"
                )
              ) {
                return;
              } else {
                dispatch({
                    type:COMMENT_WRITE_REQUEST,
                    data:{
                        text:text,
                        parent:"",
                        bid:content.bid,
                    }
                })
            alert('작성완료되었습니다.')
            setText("")
        }

            
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


        if(comment_read_loading){
            return(
                <div>
                    대기중
                </div>
            )
        }
        else if(comment_read_done && !comment_read_loading){
    return(
        <Comment>
                    <CommentHeader >
                        <Left>
                            <h2>댓글</h2>
                            <span>총 <em>{comment.count}</em>개</span>
                        </Left>
                        <Right>
                            <button>
                                <span className="icon"> <SyncOutlined /></span>
                                <span onClick={()=>{
                                    dispatch({
                                        type:COMMENT_READ_REQUEST,
                                        data:{
                                            bid:id,
                                            type:type
                                        }
                                    })
                                }}>새로고침</span>
                            </button>
                        </Right>

                    </CommentHeader>
                   
                   {LOGIN_data.uid!=="No_login"?  <CommnetWrite>
                        <div>
                            <div className="form">
                            <div className="text">
                                <textarea placeholder="작성하세요"
                                maxLength={200}
                                value={text}
                                onChange={onChangeText}></textarea>
                            </div>
                            <div className="button">
                                <div className="number">
                                {count} /200
                                </div>
                                <div className="writebutton">
                                <button className="write"
                                  onClick={()=>{
                                    if(count>0){
                                   onClickComment();
                                    }
                                    else{
                                        alert("글을 작성하세요")
                                    }
                                
                                }}
                                >작성하기</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </CommnetWrite>
        :""}
                    <CommentList>
                        <Sort>
                            <ul>
                                {menu.map((data)=>
                                {
                                    return(
                                        <li
                                       
                                        ><Li 
                                        category={data.type}
                                        type={type}
                                        onClick={()=>
                                        {
                                            onClickMenu(data.type)
                                        }}>{data.name}</Li></li>
                                    )
                                })}
                            </ul>
                        </Sort>
                    </CommentList>
                    
                    
                    <CommentData>
                        {comment.mapper.map((data)=>{
                            return(
                                <li>
                                <div className="comment">
                                        <div className="number">
                                            <div 
                                            className={data.likes? "colorup ": "up"}
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
                                                dispatch({
                                                    type:COMMENT_LIKE_REQUEST,
                                                    data:{
                                                        like:1,
                                                        unlike:0,
                                                        comment:data.bcid,
                                                        uid:LOGIN_data.uid,
                                                        board:data.board
                                                    }
                                                })}
                                            }}
                                            ><CaretUpOutlined/></div>
                                            <div className="num">{data.commentlike}</div>
                                            <div 
                                            className={data.unlikes? "colordown": "down"}

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
                                               
                                                dispatch({
                                                    type:COMMENT_LIKE_REQUEST,
                                                    data:{
                                                        like:0,
                                                        unlike:1,
                                                        comment:data.bcid,
                                                        uid:LOGIN_data.uid,
                                                        board:data.board
                                                    }
                                                })}
                                            }}><CaretDownOutlined /></div>
                                            </div>
                                        <div className="name">
                                            <span className="id">{data.member}</span>
                                            <span className="time">{detailDate(new Date(data.bcdate))}</span>
                                        </div>
                                        <div className="comment-comment"> <p>{data.bccomment}</p>

                                      
                                    </div>
                                </div>
                                <ReplyComment idd={data.bcid} child={data.child} bid={data.board} member = {data.member}/> 

                            </li>
                            
                            )
                        })}
                               
                       
                    </CommentData>
                </Comment>
    )
}}
const Comment = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`
const CommentHeader= styled.div`
    z-index: auto;
    position: relative;
    top: 0px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
`
const Left= styled.div`
    h2{
        display: inline;
        line-height: 21px;
        font-size: 18px;
        color: #1e2022;
    }
    span{
        margin-left: 5px;
        margin-right: 10px;
        line-height: 18px;
        font-size: 14px;
        color: #7b858e;
        em{
            color: #16ae81;
        }
    }   
`
const Right = styled.div`
    button{
        background: none;
        line-height: 17px;
        font-size: 14px;
        color: #7b858e;
        background: none;
        cursor:pointer;
        font-family: inherit;
        border: 0;
        padding: 0;
        border-radius: 0; 
        -webkit-border-radius: 0;   
    span{
        vertical-align: middle;
    }
    .icon{
        padding-right:5px;
    }
}
`
const CommentList =styled.div`
height:48px;
border-bottom: 1px solid #dddfe4;

`
const Sort = styled.div`
    ul{
        list-style: none;
        
        
        li{
            float: left;
          
        }
    }
    `
const CommentData = styled.ul`
list-style-type:none;
position:relative;
top:-17px;
width:100%;
li{
    width:100%;
    position: relative;

    left:-40px;
    border-top: 1px solid #dddfe4;
    .comment{
        position: relative;
        padding: 12px 12px 12px 64px;
        .number{
            
            position: absolute;
            left: 27px;
            top: 30px;
            text-align: center;
            .colorup{
                color:green;
            }
            .colordown{
                color:green;
            }
        }
        .name{
            line-height: 17px;
            font-size: 14px;
            color: #7b858e;

            .id{
                display:inline-block;
                font-weight: 700;
                color: #1e2022;
                word-wrap: break-word;
                word-break: break-all;
                padding-right:20px;
                line-height:10px;
                height:12px;
                border-right:1px solid #98a0a7;
            }
            .time{
                padding-left:20px;
            }
        }
    }
}
.comment-content{
    margin-top: 8px;
    line-height: 20px;
    font-size: 14px;
    color: #1e2022;
    word-wrap: break-word;
    word-break: break-all;
    overflow: auto;
    max-height: 400px;
    .no{
        float:left;
        padding-right:30px;
    }
    .comment_to_comment{
        
    }
}
.comment-comment{
    margin-top: 8px;
    line-height: 20px;
    font-size: 14px;
    color: #1e2022;
    word-wrap: break-word;
    word-break: break-all;
    /* overflow: auto; */
    max-height: 400px;
}
`
const CommnetWrite = styled.div`
    padding: 24px 16px;
    background: #f8f9fa;
    .form{
        background-color: #fff;
        border: 1px solid #dddfe4;

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
            padding-right: 186px;

            .number{
                font-size: 14px;
                line-height: 17px;
                color: #7b858e;
                position: absolute;
                right: 100px;
                bottom: 12px;
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
const Li = styled.button`
padding: 15px 16px 11px;
line-height: 19px;
font-size: 16px;
color: #1e2022;
border-bottom: 3px solid transparent;
background: none;
font-family: inherit;
border-right:0;  
border-left:0;                
border-top:0; 

color: ${(props) =>
    props.category === props.type ? "#16ae81" : ""
};

border-color: ${(props) =>
    props.category === props.type ? "#46cfa7" : ""
};
`
export default ContentComment;