/*
  23-05-26 게시물 페이지 수정(오병주)
*/
/*eslint-disable*/
import React ,{useState}from "react";
import styled from "styled-components";

import { useDispatch ,useSelector} from "react-redux";
const ContentReplyWriting =({id,idtext}) =>{
    const {content} = useSelector((state)=>state.R_board)
    const [text, setText] =useState("");
    const [count, setCount]  = useState(0)
    const onChangeText =(e)=>{
        setText(e.target.value)
        setCount(e.target.value.length)
        console.log(idtext);
    }    
    
    const [isValid, setIsValid] = useState(false);
    const [commentvalid, setCommentValid]= useState(false);
    const dispatch = useDispatch();
   const [validId, setValidId] = useState(0);
    const onClickReply = ()=>{
        setIsValid(!isValid);
    }
let ptag;
    

    const onClickComment=()=>{

        if (
            !window.confirm(
              "작성하시겠습니까?"
            )
          ) {
            return;
          } else {
            if(id===""){
            // dispatch({
            //     type:COMMENT_WRITE_REQUEST,
            //     data:{
            //         text:`<p>${text}</p>`,
            //         parent:"",
            //         bid:content.bid,
            //     }
            // })
        alert('작성완료되었습니다.')
        setText("")
    }


    else if( id!==""){
        if(idtext!==""){
             ptag= `<p><strong>${idtext}</strong>   ${text}</p>`;
        }
        else if(idtext===""){
            ptag= `<p>${text}</p>`
        }
    dispatch({
        // type:COMMENT_WRITE_REQUEST,
        // data:{
        //     text:ptag,
        //     parent:id,
        //     bid: content.bid,
        // }
    })
    alert('작성완료되었습니다2323')
    setText("")
}       
    }
}
    return(
<CommentTextt>
      
       
      <div>
      <div className="form">
      <div className="text">
          <textarea
          maxLength={200}
          value={text}
          onChange={onChangeText}
          ></textarea>
      </div>
      <div className="button">
          <div className="number">
           {count}/200
          </div>
          <div className="writebutton">
          <button className="write"
            onClick={()=>{
                if(count>0){
                    onClickComment()
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

</CommentTextt>   
    )
}


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
export default ContentReplyWriting;