// 이거 사용 다하고 없애야함
import React, {useRef, useMemo, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";

const StoryChange = () => {

  const QuillRef = useRef();

	const [Board_Content, setContent] = useState('');

	const onEditorChange = (value) => {
		setContent(value);
    console.log(value);
	};

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute("accept", "image/*");
    input.click();
  }

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

  return (

    <>
      <CustomReactQuill
        ref={QuillRef}
        formats={formats}
        value={Board_Content}
        onChange={onEditorChange}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />    
    </>
  );
}

const CustomReactQuill = styled(ReactQuill)`
    height: 455px;
`

export default StoryChange;