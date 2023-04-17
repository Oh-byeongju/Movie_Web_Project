/*
	23-04-17 상영관 관리자 페이지 수정(오병주)
*/
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Table, Input ,Button,Modal,Form,Select,Layout,message} from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { MANAGER_CINEMA_REQUEST,         CINEMA_INSERT_LOADING  } from '../../reducer/R_manager_theater';

const Cinema = () =>{
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// 필요한 리덕스 상태들
  const { CINEMA_loading, CINEMA, LOGIN_STATUS_done, LOGIN_data } = useSelector(
    state => ({
      CINEMA_loading: state.R_manager_theater.CINEMA_loading,
      CINEMA: state.R_manager_theater.CINEMA,
			LOGIN_STATUS_done: state.R_user_login.LOGIN_STATUS_done,
      LOGIN_data: state.R_user_login.LOGIN_data
    }),
    shallowEqual
  );

	// 모든 상영관 조회 useEffect
  useEffect(()=> {
    // 관리자 이외의 계정은 접근 불가능
    if (LOGIN_STATUS_done && LOGIN_data.uid !== 'manager') {
      alert('관리자 계정만 사용 가능합니다. 관리자 계정으로 로그인 해주세요! (id : manager, pw: manager123456)');
      navigate('/');
    }

    // 백엔드로 부터 로그인 기록을 받아온 다음 백엔드 요청
    if (LOGIN_data.uid === 'manager') {
      dispatch({
        type: MANAGER_CINEMA_REQUEST
      });
    }
  }, [LOGIN_STATUS_done, LOGIN_data.uid, navigate, dispatch]);

	// antd css 설정
	const columns = [
		{
			title: '상영관번호',
			width: 25,
			dataIndex: 'cid',
		},
		{
			title: '영화관명',
			width: 25,
			dataIndex: 'tname',
			sorter: (a, b) => a.tname.localeCompare(b.tname)
		},
		{
			title: '상영관명',
			width: 25,
			dataIndex: 'cname'
		},
		{
			title: '타입',
			width: 25,
			dataIndex: 'ctype'
		},
		{
			title: '좌석수',
			width: 25,
			dataIndex: 'cseat'
		}
	];  

	// 상영관 변수
  const [name, setName] = useState('');
  const onChangeName = (e) =>{
    setName(e.target.value)
  }

  // 영화관 타입 변수
  const [type, setType] = useState('');
  const onChangeAddr = (e) =>{
    setType(e.target.value)
  }

  // 영화관 좌석수 변수
  const [seat, setSeat] = useState('');
  const onChangeSeat = (e) =>{
    setSeat(e.target.value)
  }


	// 내일 왼쪽 버튼을 극장으로 오른쪽을 상영관으로 한다음
	// 왼쪽 먼저 렌더링 되게 해서 극장을 불러오고 그걸 이 js에서도 써야함 (상영관 추가시)
	// 그래서 왼쪽에서 극장을 추가하거나 삭제하면 리덕스에 상태를 갱신해줘야함
	// 이거 구현하면 될듯
	// 버튼 클릭할때 마다 디비 갱신해서 불러오면 되고

	// 극장을 삭제할때는 상영관이 먼저 다 날라가있어야 삭제 가능
	// 상영관을 삭제 할때는 6개월 이내에 상영정보가 없어야 삭제 가능
	// cascade 해야함

	// 아래로 수정


	// 이거 어따 쓰는지 몰것음
	const [messageApi, contextHolder] = message.useMessage();

 
    
   
  

  // 영화관
  const [area,setArea] = useState('');
  const [tid ,setId]= useState('')

  const handleChange = (value) => {
  console.log(value); 
  setArea(value)
  setId(value)
	};

const handleChangeSeat = (value) => {
 setSeat(value)
};

  const [able, setAble] = useState(false);
  const [cid , setCid] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  //수정
  const [modify, setModify] = useState(false);
  const showModal = (cname, type ,seat, tname,cid,tid) => {
    setName(cname)
    setType(type)
    setSeat(seat)
    setArea(tname)
    setId(tid)
    setCid(cid)
    setAble(true)
    setModify(true)
    setInsert(false)
    setIsModalOpen(true);
    
  };

  //추가
  const [insert, setInsert] = useState(false);
  const showModall = () => {
    setName('')
    setType('')
    setSeat('')
    setArea('')
    setId('')
    setModify(false);
    setInsert(true);
    setAble(false);
    setIsModalOpen(true);

 
  };
  const handleOk = () => {
   if(modify && !insert){
    if(name!=="" && type !=="" && seat !=="" &&cid !==""){
    dispatch({
      type:CINEMA_INSERT_LOADING,
      data:{
        tname:"0",
          cid:cid,
          cname:name,
          ctype:type,
          cseat:seat,
          state:"update"
      }
  })
  setIsModalOpen(false);

}
else{
  messageApi.open({
    type: 'warning',
    content: '데이터를 전부 입력해야합니다.',
  });

}
  
   }
   else if(!modify && insert){
    if(
      tid!=="" && name!=="" && type !=="" && seat !=="" 
    ){
    dispatch({
        type:CINEMA_INSERT_LOADING,
        data:{
          tname:tid,
          cid:"0",
          cname:name,
          ctype:type,
          cseat:seat,
          state:"insert"
        }
    })
    setIsModalOpen(false);

  }
  else{
    messageApi.open({
      type: 'warning',
      content: '데이터를 전부 입력해야합니다.',
    });
  }
  }
  };
  const handleCancel = () => {
    setName('')
    setType('')
    setSeat('')
    setArea('')
    setId('')
    setModify(false);
    setInsert(false);
    setAble(false);
    setIsModalOpen(false);
  };

  const onDelete = () =>{
    console.log(cid);
    dispatch({
      type:CINEMA_INSERT_LOADING,
      data:{
        tname:"0",
        cid:cid,
        cname:0,
        ctype:0,
        cseat:0,
        state:"delete"
      }
  })
  setIsModalOpen(false);

  }
      
	return(
		<>
			{/* {contextHolder}  이게 오류 메시지인듯?*/}
			<div className="search">
				<p>
					{CINEMA.length}개의 상영관이 검색되었습니다. (더블 클릭시 수정가능)
				</p>
				<div className="search_button">
					<Button type="primary" shape="circle" icon={<PlusOutlined/>} 
					size={"20"} onClick={showModall}/>
				</div>
			</div>
			<TableWrap rowKey="cid"
				columns={columns}
				loading={CINEMA_loading}
				dataSource={CINEMA}
				onRow={(record, rowIndex) => {
					return {
						onDoubleClick: event => {                 
							showModal(record.cname, record.ctype, record.cseat, record.tname, record.cid,record.tid)
						}
					};
				}}
				scroll={{x: 1200}}
			/>

		<Modal title="상영관 추가" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
			<Form>
			<Form.Item label="지역">
			<Select 
		onChange={handleChange}
		defaultValue={area}
		disabled={area}
	//  options={datas.map((item) => ({
	//     value: item.tid,
	//     label: item.tname,
	//   }))} 
	>  

			</Select>
		</Form.Item>  
		<Form.Item label="상영관명" onChange={onChangeName}>
			<Input value={name}/>
		</Form.Item>
		<Form.Item label="타입" onChange={onChangeAddr}>
			<Input value={type}/>
		</Form.Item>
		<Form.Item label="좌석수" >
		<Select 
		onChange={handleChangeSeat}
		defaultValue={seat}
	options={[{
		value: "30",
		label: "30"
		},
	{ value: "50",
		label: "50"},
		{ value: "70",
			label: "70"}]} /> 
		</Form.Item>

		
		{modify ?
		<Form.Item style={{position:'relative', top:'57px'}}>
		<Button type="primary" danger onClick={()=>{onDelete()}}>
		삭제
		</Button>      </Form.Item>
:""}
	</Form>
		</Modal>     </>
	);
};

const TableWrap = styled(Table)`
  margin-bottom: 30px;

  .ant-table-placeholder {
    .ant-table-expanded-row-fixed{
      min-height: 600px !important;
    }
    .css-dev-only-do-not-override-acm2ia {
      position:absolute;
      top: 45%;
      left: 50%;
      transform:translate(-50%, -45%); /* translate(x축,y축) */
    }
  }
`;

export default Cinema;