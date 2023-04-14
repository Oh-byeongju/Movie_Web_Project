import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Table, Input ,Button,Modal,Form,Select,Layout,message} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ALLTHEATER_REQUEST } from '../../reducer/ticket';
import { PlusOutlined } from '@ant-design/icons';
import { CINEMA_INSERT_LOADING, CINEMA_LOADING } from '../../reducer/R_manager_theater';
//2023-03-29 상영곤 CRUD (강경목)


//
const Theater = () =>{
    const dispatch= useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const {cinema,cinema_insert_done} = useSelector((state)=>state.R_manager_theater)
 
    useEffect(()=>{
        dispatch({
            type:CINEMA_LOADING
        })
    },[cinema_insert_done])
    const [search, setsearch] = useState('');
  const handleSearchChange = e => {
    setsearch(e.target.value);
  };
  //상영관
  const [name , setName ] = useState('');
  const onChangeName = (e) =>{
    setName(e.target.value)
  }
  //타입
  const [type, setType] = useState('');
  const onChangeAddr = (e) =>{
    setType(e.target.value)
  }

  //좌석수
  const [seat, setSeat] = useState('');
  const onChangeSeat = (e) =>{
    setSeat(e.target.value)
  }

  //영화관
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
    const datas = cinema.filter(
        (arr, index, callback) => index === callback.findIndex(t => t.tname === arr.tname)
      );
      let mappedArrayObj = datas.map(obj => { 
        let newObj = {};
        newObj['text'] = obj.tname;
        newObj['value'] = obj.tname;
        return newObj;
     });


    const columns = [
        {
          title: '극장',
          width: 50,
          dataIndex: 'tname',
          fixed: 'left',
          filters:mappedArrayObj,
        
        onFilter: (value, record) => record.tname.indexOf(value) === 0,
        sorter: (a, b) => a.tname.length - b.tname.length,
        sortDirections: ['descend'],
        },
        {
          title: '상영관명',
          width: 50,
          dataIndex: 'cname',
          fixed: 'left',
        },
        {
          title: '타입',
          width: 50,
          dataIndex: 'ctype',
        },
        {
            title: '좌석수',
            width: 50,
            dataIndex: 'cseat',
            
        },
        

      ];  
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };


      
    return(
      
      <Container>
        {contextHolder}
      <InnerWraps>
        <div className="titleMenu">
          <h1>
             상영관 관리
          </h1>
        </div>
      
        <div className="search">
        <p>
            {cinema.length}개의 영화관이 검색되었습니다.
          </p>
          
            <div className="search_button">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={"20"} 
            onChange={onChange}
            onClick={showModall}></Button>
          </div>
        </div>
        <TableWrap rowKey="cienma"
          columns={columns}
          dataSource={cinema}
          onRow={(record, rowIndex) => {
            return {
               // click row
              onDoubleClick: event => {                 
                showModal(record.cname, record.ctype, record.cseat, record.tname, record.cid,record.tid)
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
      <Modal title="상영관 추가" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        <Form>
        <Form.Item label="지역">
        <Select 
      onChange={handleChange}
      defaultValue={area}
      disabled={area}
     options={datas.map((item) => ({
        value: item.tid,
        label: item.tname,
      }))
    } >  

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

export default Theater;