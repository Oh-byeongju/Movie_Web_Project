/*eslint-disable*/
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Table, Input ,Button,Modal,Form,Select,message,} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ALLTHEATER_REQUEST } from '../../reducer/ticket';
import { PlusOutlined } from '@ant-design/icons';
import { THEATER_INSERT_LOADING } from '../../reducer/R_manager_theater';
const { Search } = Input;

//2023-03-30 극장 CRUD (강경목)
const Cinema=()=>{
    const dispatch= useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const {allTheater} = useSelector((state)=>state.ticket)
    const {theater_insert_done} = useSelector((state)=>state.R_manager_theater)
    useEffect(()=>{
      dispatch({
          type:ALLTHEATER_REQUEST
      })
  },[theater_insert_done])
    const [search, setsearch] = useState('');
  const handleSearchChange = e => {
    setsearch(e.target.value);
  };
  
  const [name , setName ] = useState('');
  const onChangeName = (e) =>{
    setName(e.target.value)
  }
  const [addr, setAddr] = useState('');
  const onChangeAddr = (e) =>{
    setAddr(e.target.value)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [able, setAble] = useState(false);
  //수정 
  const [modify , setModify] = useState(false);
  const [tid,setTid] = useState('');
  const showModal = (area,name,addr,id) => {
    setName(name)
    setAddr(addr)
    setArea(area);
    setTid(id)
    setModify(true);
    setAble(true);
    setIsModalOpen(true);
  };

  //추가
  const [insert, setInsert] = useState(false);
  const showModdal = () => {
    setInsert(true)
    setAble(false);
    setIsModalOpen(true);
  };
  

  //확인
  const handleOk = () => {
    //수정
    if(modify && !insert){
      if(area !=="" && name !=="" && addr!=="" &&tid !==""){
      dispatch({
        type:THEATER_INSERT_LOADING,
        data:{
          tarea:area,
          tname:name,
          taddr:addr,
          state:"update",
          tid:tid,
        }
    })
    setIsModalOpen(false);    
    setAddr('')
    setName('')
    setArea('')
    setModify(false)
    setInsert(false)
    }
    else{
      messageApi.open({
        type: 'warning',
        content: '데이터를 전부 입력해야합니다.',
      });
    }
  }
    //추가
    else if(!modify && insert){
      if(area !=="" && name !=="" && addr!=="" ){
      dispatch({
        type:THEATER_INSERT_LOADING,
        data:{
          tarea:area,
          tname:name,
          taddr:addr,
          state:"insert",
          tid:0,
        }
    })
    setAddr('')
    setName('')
    setArea('')
    setModify(false)
    setInsert(false)
    setIsModalOpen(false);    

  }
  else{
    messageApi.open({
      type: 'warning',
      content: '데이터를 전부 입력해야합니다.',
    });
  }
    //초기화
  
  }
}
  //창 닫을 시 초기화
  const handleCancel = () => {
    setAddr('')
    setName('')
    setArea('')
    setModify(false)
    setInsert(false)
    setIsModalOpen(false)
  };

  //삭제
  const onDelete = () =>{
    dispatch({
      type:THEATER_INSERT_LOADING,
      data:{
        tarea:0,
        tname:0,
        taddr:0,
        state:"delete",
        tid:tid,
      }
  })
  setIsModalOpen(false)

  }
  // 정렬 버튼 css 변수
	const [namebutton, setnamebutton] = useState(true);
	const [joinbutton, setjoinbutton] = useState(false);
  const datas = allTheater.filter(
    (arr, index, callback) => index === callback.findIndex(t => t.tarea === arr.tarea)
  );
  let mappedArrayObj = datas.map(obj => { 
    let newObj = {};
    newObj['text'] = obj.tarea;
    newObj['value'] = obj.tarea;
    return newObj;
 });

const [area,setArea] = useState('');
const handleChange = (value) => {
  console.log(value); 
  setArea(value)// { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
  const columns = [
    {
      title: '지역',
      width: 110,
      dataIndex: 'tarea',
      fixed: 'left',
      
      filters:mappedArrayObj
    ,
    onFilter: (value, record) => record.tarea.indexOf(value) === 0,
    sorter: (a, b) => a.tarea.length - b.tarea.length,
    sortDirections: ['descend'],
    },
    {
      title: '영화관',
      width: 120,
      dataIndex: 'tname',
      fixed: 'left',
    },
    {
      title: '주소',
      width: 210,
      dataIndex: 'taddr',
    },
  ];  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
    return(
      <Container>{contextHolder}
      <InnerWraps>
        <div className="titleMenu">
          <h1>
             영화관 관리
          </h1>
        </div>
      
        <div className="search">
        <p>
            {allTheater.length}개의 영화관이 검색되었습니다.
            더블클릭하면 수정할 수 있음.
          </p>
          
            <div className="search_button">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={"20"} 
            onChange={onChange}
            onClick={showModdal}></Button>
          </div>
        </div>
        <TableWrap rowKey="cienma"
          columns={columns}
          dataSource={allTheater}
          onRow={(record, rowIndex) => {
            return {
               // click row
              onDoubleClick: event => {                 
                showModal(record.tarea, record.tname, record.taddr,record.tid)
              }, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
          scroll={{
          x: 1350,
        }}/>
      </InnerWraps>
      <Modal title="영화관 추가 / 수정" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        <Form>
        <Form.Item label="지역">
        <Select 
      onChange={handleChange}
      defaultValue={area}
      disabled={able}
      options={datas.map((item) => ({
        value: item.tarea,
        label: item.tarea,
      }))}>
        
        </Select>
      </Form.Item>  
      <Form.Item label="이름" onChange={onChangeName}>
        <Input value={name}/>
      </Form.Item>
      <Form.Item label="주소" onChange={onChangeAddr}>
        <Input value={addr}/>
      </Form.Item>
      {modify ?
      <Form.Item style={{position:'relative', top:'57px'}}>
      <Button type="primary" danger onClick={()=>{onDelete()}}>
      삭제
      </Button>      </Form.Item>
:""}
    </Form>
      </Modal>     </Container>
    )
}

const Container = styled.div`
  padding: 0;
  width: 1200px;
  margin : 0 auto;
  box-sizing: border-box; 
  margin-bottom: 0;
  min-height: 820px;
`;

const InnerWraps = styled.div`
  width: 100%;
  padding-left: 10px;

  .titleMenu {
    position: relative;
    top: 18px;
  }
  .search {
    position: relative;
    width: 100%;
    border-bottom: 3px solid #241d1e;
    padding-bottom: 5px;
    margin-top: 30px;

    p {
      font-weight: 1000;
      padding-top: 8px;
    }

    .search_button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

const ButtonList = styled.ul`
	position: absolute;
	margin-left: 5px !important;
	list-style: none;
	margin: 0;
	padding: 0;
  top: 16%;
  right: 18%;

	::after{
		content: '';
    display: block;
    position: absolute;
    left: 60px;
    top: 3px;
    width: 1px;
    height: 16px;
    background-color: #ccc;
	}

	li:first-child {
		margin-left: 0px;
	}
`;

const ButtonWrap = styled.li`
	margin-left: 23px;
	list-style: none;
	display: list-item;
	float: left;

	.btn {
		content: "";
		cursor: pointer;
		background-color: white;
		display: block;
		position: relative;
		color: #999;
		font-size: 16px;
		border: 0;
		padding: 0;

		&.active {
      color: #000;
    }
	}
`;

const SearchWarp = styled(Search)`
  span {
    .ant-input-clear-icon {
      display: none;
    }
    .ant-input-affix-wrapper {
      border-color: #a0a0a0;
    }
    .ant-input-group-addon {
      border-color: #a0a0a0;
    }
    .ant-btn {
      border-color: #a0a0a0;
    }
    .ant-input::placeholder {
      color: #a0a0a0;
    }
  }
`;

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

const TableButton = styled.button`
  color: #1677ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  border: none;
`;

export default Cinema;