import React, {useState, useMemo,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from "styled-components";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const EditStroy = ({handleOpen, open, handleClose, value ,setContent} ) =>{

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height:600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const [story, setStory] = useState(value);
const onChangeValue= (value) =>{
    setStory(value)
}
const onClickStory = ()=>{
    setContent(story)
}
const quillRef = useRef();
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


  return (
    <>
     
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
    
  <Box sx={style}>
  <Typography id="modal-modal-title" variant="h6" component="h2">
    줄거리 수정
</Typography>
    <Typography id="modal-modal-title"  sx={{ mt: 2 }}>
    <CustomReactQuill
        ref={quillRef}
        formats={formats}
        value={story}
        onChange={onChangeValue}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />       </Typography>
          <Typography id="modal-modal-title" sx={{ mt: 6 }}>
          <Button variant="outlined" color="error" onClick={()=>{handleClose()}}>취소</Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={()=>{
            onClickStory()
            handleClose()
          }}>수정</Button>
      </Typography>


  </Box>
</Modal>
    </>
  );
}

const CustomReactQuill = styled(ReactQuill)`
    height: 455px;
`
export default EditStroy;