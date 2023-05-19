/*eslint-disable*/
import React ,{useRef, useState,useMemo, useEffect}from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useSelector ,useDispatch} from "react-redux";
import { http } from "../../lib/http";
import { BOARD_WRITE_REQUEST} from "../../reducer/R_board";
import { useNavigate,useLocation } from "react-router-dom";
const Edit =  () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const { LOGIN_data } = useSelector((state) => state.R_user_login);
    const {board_write_done} = useSelector((state)=>state.R_board)
    const selectList = ["자유 게시판", "영화 뉴스", "영화 토론", "동영상"];
    const [Selected, setSelected] = useState(state.category);
  
    //select option 가져오기
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };
    const [boardtitle , setBoardTitle ]= useState(state.title)
    const handleTitle = (e) => {
      setBoardTitle(e.target.value);
    };
      const [Board_Content, setContent] = useState(state.content);
  
      const onEditorChange = (value) => {
          setContent(value);
      console.log(value);
      };
  
  const quillRef = useRef();


  const imageHandler = () => {
    // file input 임의 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.onchange = async() => {
        const file = input.files;
        const formData = new FormData();

        if(file) {
            formData.append("multipartFiles", file[0]);
        }

        // file 데이터 담아서 서버에 전달하여 이미지 업로드
        const res = await http.post('http://localhost:8080/v2/normal/uploadImage', formData);

        if(quillRef.current) {
            // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
            const index = (quillRef.current.getEditor().getSelection() ).index;

            const quillEditor = quillRef.current.getEditor();
            quillEditor.setSelection(index, 1);

            quillEditor.clipboard.dangerouslyPasteHTML(
                index,
                `<img src=${res.data} alt=${'alt text'} />`
            );
        }
    }}


    useEffect(()=>{
        if(board_write_done){
            navigate(`/board/content/${state.id}/${boardtitle}`)
        }
    },[board_write_done])
  const modules = useMemo (
    () => ({
      toolbar: {
        container : [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
        ],

        handlers: {
          image: imageHandler,
        },
      }, 
      
  }),
  []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',        
  ]

  
    return(
        <ContentWrapper>       
             <WriteWrapper>  
            <h2 
            >글 수정ㅌ</h2>
                <Select>
                <select onChange={handleSelect} value={Selected}>
                {selectList.map((item) => (
                <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
                    <input type="text" placeholder="제목" value={boardtitle} onChange={handleTitle}/>
                </Select>
                <CustomReactQuill
        ref={quillRef}
        formats={formats}
        value={Board_Content}
        onChange={onEditorChange}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />     
     
          
       </WriteWrapper>
       <ButtonMore>
        <Fail 
        onClick={()=>{
          navigate(-1);
        }}>취소하기</Fail>
        <Success 
        onClick={()=>{
          if (
            !window.confirm(
              "작성하시겠습니까?"
            )
          ) {
            return;
          } else {
            dispatch({
              type:BOARD_WRITE_REQUEST,
              data:{
                id :state.id,
                title:boardtitle,
                detail:Board_Content,
                category:Selected,
                state:"update"
              }
            })
    }
          }}
        
        >작성하기</Success>
       </ButtonMore>
       </ContentWrapper>

    ) 
}
const ContentWrapper= styled.div`
float: right;
    box-sizing: border-box;
    width: 728px;`
const WriteWrapper = styled.div`
    width:728px;
    margin-top: 0;
    margin-left:20px;
    border-top: 1px solid #ebeef1;
    margin-top: 8px;
    line-height: 18px;
    font-size: 14px;
    color: #7b858e;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
    
    h2{
        padding-left: 16px;
        font-size: 18px;
        color: #1e2022;
        font-weight: 700;        
    }
`
const Select = styled.div`
width:100%;
padding-left:15px;
padding-bottom:15px;
select{
    position: relative;
    border: 1px solid #dddfe4;
    border-radius: 4px;
    padding: 10px 38px 9px 15px;
    line-height: 19px;
    font-size: 16px;
    color: #1e2022;
    background-size: 24px;
    background-position: top 8px right 8px;
    background-repeat: no-repeat;
    float:left;
    margin-right:10px;
}
input{
    display: block;
    width: 74%;
    background-color: #fff;
    border: 1px solid #dddfe4;
    padding: 10px 16px 9px;
    line-height: 19px;
    font-size: 16px;
    color: #1e2022;
    box-sizing: border-box;
}
`
const ButtonMore = styled.div`
width:100%;
    position:static;
    padding-top:50px;
    padding-left:20px;
`
const Fail =styled.button`
line-height: 19px;
font-size: 16px;
color: #7b858e;
border-radius: 4px;
background-color: #fff;
border: 1px solid #dddfe4;
width: 154px;
height: 48px;
}
`
const Success =styled.button`
float: right;
    position: static;
    color: #fff;
    border-radius: 4px;
    background-color: #46cfa7;
    width: 154px;
    height: 48px;
    line-height: 19px;
    font-size: 16px;
    margin-left:60px;
`
const CustomReactQuill = styled(ReactQuill)`
    height: 455px;
`
export default Edit;
