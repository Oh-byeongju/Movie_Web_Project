/*
	23-04-18 영화 관리자 페이지 수정(오병주)
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Input, InputNumber, Button, Modal, Form} from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { MANAGER_MOVIE_REQUEST } from '../../reducer/R_manager_movie';
import { useNavigate } from 'react-router-dom';


import { 			 MOVIE_INSERT_LOADING } from '../../reducer/R_manager_theater';
import useInput from '../../lib/useInput';
import Actor from './Actorss';
import EditStroy from './EditStory';

const Movie = () =>{
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// 내일할꺼
	// input넘버 그냥 넣어놨는데 수정좀하기 --> Numericinput인가 이거 있음 숫자만 드가는거
	// 개봉일도 datepicker 사용하기
	// 관람등급 넣을때 inputselect인가 그거 써서 라벨 벨류 설정 
	// 배우 관련해서 input에 검색기능 있는거 찾아보기 --> select에서 있는거 쓰면될듯
	// 포스터 버튼 이쁜거 있음 그걸로 바꾸기 --> antd

	// 필요한 리덕스 상태들
  const { MOVIE_loading, MOVIE, LOGIN_STATUS_done, LOGIN_data } = useSelector(
    state => ({
      MOVIE_loading: state.R_manager_movie.MOVIE_loading,
      MOVIE: state.R_manager_movie.MOVIE,
			LOGIN_STATUS_done: state.R_user_login.LOGIN_STATUS_done,
      LOGIN_data: state.R_user_login.LOGIN_data
    }),
    shallowEqual
  );

	// 모든 영화 조회 useEffect
	useEffect(()=> {
		// 관리자 이외의 계정은 접근 불가능
		if (LOGIN_STATUS_done && LOGIN_data.uid !== 'manager') {
			alert('관리자 계정만 사용 가능합니다. 관리자 계정으로 로그인 해주세요! (id : manager, pw: manager123456)');
			navigate('/');
		}

		// 백엔드로 부터 로그인 기록을 받아온 다음 백엔드 요청
		if (LOGIN_data.uid === 'manager') {
			dispatch({
				type: MANAGER_MOVIE_REQUEST
			});
		}
	}, [LOGIN_STATUS_done, LOGIN_data.uid, navigate, dispatch]);

	// antd css 설정
	const columns = [
    {
      title: '영화명',
      width: 9,
      dataIndex: 'mtitle',
			ellipsis: true,
      fixed: 'left'
    },
    {
      title: '감독',
      width: 8.5,
      dataIndex: 'mdir',
			ellipsis: true,
      fixed: 'left'
    },
		{
      title: '상영시간',
      width: 6,
      fixed: 'left',
			render: (text, row) => <div> {row["mtime"]}분 </div>
    },
		{
      title: '장르',
      width: 7,
      dataIndex: 'mgenre',
    },
		{
      title: '등급',
      width: 9.5,
			render: (text, row) => <div> {row["mrating"] === '0' ? '전체 이용가' : row["mrating"] === '18' ? '청소년 관람불가' : row["mrating"] + '세 이용가'} </div>
    },
    {
      title: '주연',
      width: 13,
      dataIndex: 'mainactor',
			ellipsis: true,
      render: (mainactor) => mainactor.map(main => main).join(', '),
    },
    {
      title: '조연',
      width: 13,
      dataIndex: 'subactor',
			ellipsis: true,
      render: (subactor) => subactor.map(sub => sub).join(', '),

    },
    {
      title: '성우',
      width: 13,
      dataIndex: 'voiceactor',
			ellipsis: true,
      render: (voiceactor) => voiceactor.map(voice => voice).join(', '),

    },
    {
      title: '개봉일',
      width: 7.5,
			fixed: 'right',
      dataIndex: 'mdate'
    },

		{
      title: '관리자',
      width: 5.5,
			fixed: 'right',
      render: (text, row) => <TableButton>modify</TableButton>
    },
  ]; 



    const [main , setMain ] = useState([])
    const [sub, setSub] = useState([]);
    const [voice, setVoice]= useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modify , setModify] = useState(false);

  //추가
 const [mid ,setMid] = useState('');
  const [name, onChangeName, setName] = useInput(''); //제목
  const [dir, onChangeDir, setDir] = useInput('');    //감독
  const [genre, onChangeGenre, setGenre] = useInput(''); //장르
  const [time, onChangeTime, setTime] = useInput(''); //상영시간
  const [date, onChangeDate, setDate] = useInput(''); //개봉일

  const [Board_Content, setContent] = useState('');
  const onEditorChange = (value) => {
        setContent(value)
        };
  

    const [file, setFile ] = useState(null);
    const [filechange, setFileChange] = useState(false);
      const onChangeImg = e => {
        setFile(e.target.files);
        setFileChange(true);
        }; 
      //수정
      const [update, setUpdate] = useState(false);
  const showModal = (id,name,dir,genre,time,date,content,main,sub,voice) => {
    setMid(id)
    setName(name)
    setDir(dir)
    setGenre(genre)
    setTime(time)
    setDate(date)
    setContent(content)
    setMain(main)
    setSub(sub)
    setVoice(voice)
    setFileChange(false)
    setIsModalOpen(true);
    setUpdate(true);
  };

  const showModdal = () => {
    setMid("")
    setName("")
    setDir("")
    setGenre("")
    setTime("")
    setDate("")
    setContent("")
    setMain([])
    setSub([])
    setVoice([])
    setFileChange(false)
    setIsModalOpen(true);
    setUpdate(false);
  };



  //확인
  const handleOk = async () => {

		console.log('fadsfsda')

    if(true ){
    const mainactor = main.join()
    const subactor = sub.join()
    const voiceactor = voice.join()

    const fd = new FormData();  
    const updatedata ={
      id:mid,
      name:name,
      dir:dir,
      genre:genre,
      time:time,
      date:date,
      rating:"12",
      story:Board_Content,
      main:mainactor,
      sub:subactor,
      voice:voiceactor,
      state:"update"
      }
      const insertdata ={
        id:mid,
        name:name,
        dir:dir,
        genre:genre,
        time:time,
        date:date,
        rating:"12",
        story:Board_Content,
        main:mainactor,
        sub:subactor,
        voice:voiceactor,
        state:"insert"
        }

   //이미지
    if(update){
      if(filechange){
      if(file){
        fd.append("multipartFiles", file[0]); 
      }
    }
    fd.append("data", new Blob([JSON.stringify(updatedata)], {   //데이터
      type: "application/json"
    }))
  }
  //insert
  else if(!update){
    if(file){
      fd.append("multipartFiles", file[0]); 
    }
    fd.append("data", new Blob([JSON.stringify(insertdata)], {   //데이터
      type: "application/json"
    }))
  }
    dispatch({
      type:MOVIE_INSERT_LOADING,
      fd
    })
    setIsModalOpen(false);    

  }
  else{
  }
    
  }
  //창 닫을 시 초기화
  const handleCancel = () => {
    setContent('');
    setIsModalOpen(false)
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  

	return(
		<>
			<div className="search">
				<p>
					{MOVIE.length}개의 영화가 검색되었습니다.
				</p>
				<div className="search_button">
					<Button type="primary" shape="circle" icon={<PlusOutlined />} size={"20"} onClick={showModdal}/>
				</div>
			</div>
			<TableWrap rowKey="mid"
				loading={MOVIE_loading}
				dataSource={MOVIE}
				columns={columns}
				onRow={(record, rowIndex) => {
					return {
							// click row
						onDoubleClick: event => {   
							showModal(
								record.mid,record.mtitle, record.mdir, record.mgenre, record.mtime, record.mdate,
								record.mstory,record.mainactor,record.subactor, record.voiceactor
								)
						}, // double click row
						onContextMenu: event => {}, // right button click row
						onMouseEnter: event => {}, // mouse enter row
						onMouseLeave: event => {}, // mouse leave row
					};
				}}
				scroll={{
				x: 1350,
			}}/>

		<Modal 
		width={1200}
		
		title="영화관 추가" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
			<Form>
			<Form.Item label="영화명" onChange={onChangeName}>
			<Input value={name}/>
		</Form.Item>  
		<Form.Item label="감독&nbsp;&nbsp;&nbsp;" onChange={onChangeDir}>
			<Input value={dir}/>
		</Form.Item>

		<Form.Item label="장르&nbsp;&nbsp;&nbsp;" onChange={onChangeGenre}>
			<Input value={genre}/>
		</Form.Item>

		<Form.Item label="상영시간" onChange={onChangeTime}>
			<InputNumber value={time}/>
		</Form.Item>

		<Form.Item label="개봉일" onChange={onChangeDate}>
			<Input value={date}/>
		</Form.Item>
		<Form.Item label="주연&nbsp;&nbsp;&nbsp;">
		
		<Actor tags ={main} setTags={setMain}/>
		</Form.Item>
		<Form.Item label="조연&nbsp;&nbsp;&nbsp;">
		<Actor tags ={sub} setTags={setSub}/>
		</Form.Item> 

		<Form.Item label="성우&nbsp;&nbsp;&nbsp;">
		
		<Actor tags ={voice} setTags={setVoice}/>
		</Form.Item> 

		<Form.Item label="포스터" >
			<input type="file" id="file" onChange={onChangeImg} 
			multiple="multiple" /> {update ?"파일을 선택하면 교체 놔두면 교체 안함" :"" } 
		</Form.Item>
		
		<Form.Item label="줄거리&nbsp;&nbsp;&nbsp;">
		<MovieStory dangerouslySetInnerHTML={{__html:Board_Content}}></MovieStory>
		<EditStroy handleOpen={handleOpen} open={open} handleClose={handleClose} 
		value={Board_Content} onChange={onEditorChange} setContent={setContent}/>
	<Button type="primary" onClick={()=>{
handleOpen()
	}} >줄거리 수정</Button>
		</Form.Item>      {modify ?
		<Form.Item style={{position:'relative', top:'57px'}}>
		<Button type="primary" danger onClick={()=>{}}>
		삭제
		</Button>      </Form.Item>
:""}
	</Form>
		</Modal> 
		</>
	)
}

const MovieStory = styled.div`
  position:relative;
  top:-16px;
`

const TableWrap = styled(Table)`
  padding-bottom: 20px;

  .ant-table-placeholder {
    .ant-table-expanded-row-fixed{
      min-height: 603px !important;
    }
    .css-dev-only-do-not-override-acm2ia {
      position:absolute;
      top: 45%;
      left: 50%;
      transform:translate(-50%, -45%); /* translate(x축,y축) */
    }
  }
`;

const TableButton = styled.button`
  color: #1677ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  border: none;
`;

const ModalWrap = styled(Modal)`
  .ant-modal-header {
    margin-bottom: 16px;
  }

  .ant-modal-footer {
    margin-top: 0;
  }
`;

export default Movie;