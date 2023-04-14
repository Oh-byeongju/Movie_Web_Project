import React,{useEffect, useState} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { Table, Input ,Modal,Form} from 'antd';
import { BOARD_DELETE_LOADING, BOARD_READ_LOADING, BOARD_SELECT_LOADING, M_COMMENT_READ_REQUEST } from "../../reducer/R_manager_board";
import styled from "styled-components";
import { COMMENT_DELETE_REQUEST } from "../../reducer/Board";
const { Search } = Input;

const Board = () =>{
    const dispatch = useDispatch();
   
    const { board,board_delete_done,comment} = useSelector((state)=>state.R_manager_board)
    const {comment_delete_done} = useSelector((state)=>state.Board)

    useEffect(()=>{
        dispatch({
            type: BOARD_READ_LOADING
        })
    },[board_delete_done,comment_delete_done])


/*
    useEffect(()=>{
        dispatch({
            type:COMMENT_READ_REQUEST,
            data{
                bid:
                type:"new"
            }
        })
    },[])
    */
    const [search, setsearch] = useState('');
    const handleSearchChange = e => {
      setsearch(e.target.value);
      console.log(search)
    };
      // 정렬 버튼 css 변수
	const [namebutton, setnamebutton] = useState(true);
	const [joinbutton, setjoinbutton] = useState(false);

    const clickname = ()=> {
            setnamebutton(true);
            setjoinbutton(false);
    
        }
    
    const clickjoin = ()=> {
            setnamebutton(false);
            setjoinbutton(true);
        }

        const onSearch = () => {
            // 이름순 버튼이 활성화 되있을경우
            if (namebutton) {
                dispatch({
                    type:BOARD_SELECT_LOADING,
                    data:{
                        text:search,
                        state:"uid"
                    }
                })
            }
            // 가입순 버튼이 활성화 되있을경우
            else {
                dispatch({
                    type:BOARD_SELECT_LOADING,
                    data:{
                        text:search,
                        state:"title"
                    }
                })
            }
          }

          //board
    const onDelete = (data) =>{
      if (!window.confirm("게시글을 삭제하시겠습니까? (삭제된 게시글은 복구 불가합니다.")) {
        return;
      };
        dispatch({
                type:BOARD_DELETE_LOADING,
                data:{
                    bid:data
                }
        })
    }  

    //comment
    const onDeletecomment = (data) =>{
      if (!window.confirm("댓글을 제거하시겠습니까? (삭제된 댓글은 복구되지 않습니다)")) {
        return;
      };
        dispatch({
                type:COMMENT_DELETE_REQUEST,
                data:{
                    comment:data
                }
        })
        
    }  


    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = (data) => {
        dispatch({
            type:M_COMMENT_READ_REQUEST,
            data:{
                bid:data,
                type:"new"
            }
        })
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
        
    const columns = [
      {
        title: '게시글번호',
        width: 110,
        dataIndex: 'bid',
        fixed: 'left',
      },
        {
          title: '계정',
          width: 110,
          dataIndex: 'uid',
          fixed: 'left',
        },
        {
          title: '제목',
          width: 120,
          dataIndex: 'btitle',
          fixed: 'left',
        },
        {
          title: '날짜',
          width: 210,
          dataIndex: 'bdate',
          fixed:'left'
        },
        {
            title: '카테고리',
            width: 210,
            dataIndex: 'bcategory',
            fixed:'left'
          },
        {
          title: '관리자',
          fixed: 'right',
          width: 85,
          render: (text, row) => <TableButton onClick={()=>{
            onDelete(row.bid)
            console.log(row.bid)}}>delete</TableButton>,
        },
      ];  


      const [isModalOpen2, setIsModalOpen2] = useState(false);
      const [child, setChild] = useState([])

      const showModal2 = (data) => {
        setChild(data)
          setIsModalOpen2(true);
        };
        const handleOk2 = () => {
          setIsModalOpen2(false);
        };
        const handleCancel2 = () => {
          setIsModalOpen2(false);
        };
        
        

      const columns2 = [
        {
          title: '게시글번호',
          width: 70,
          dataIndex: 'bcid',
          fixed: 'left',
        },
        {
          title: '계정',
          width: 70,
          dataIndex: 'member',
          fixed: 'left',
        },
        {
          title: '내용',
          width: 100,
          dataIndex: 'bccomment',
          fixed: 'left',
        },
        {
          title: '날짜',
          width: 110,
          dataIndex: 'bcdate',
          fixed:'left'
        },
        {
            title: '게시글',
            width: 100,
            dataIndex: 'board',
            fixed:'left'
          }, 
          {
            title: '상위댓글번호',
            width: 210,
            dataIndex: 'parent',
            fixed:'left'
          }, 
          {
            title: '관리자',
            fixed: 'right',
            width: 85,
            render: (text, row) => <TableButton onClick={()=>{
              onDeletecomment(row.bcid)
              console.log(text)}}>delete</TableButton>,
          },
       
      ]; 
    return(
        <Container>
      <InnerWraps>
        <div className="titleMenu">
          <h1>
            게시판관리
          </h1>
        </div>
        <div className="search">
          <p>
            {board.length}명의 게시글이 검색되었습니다. (더블클릭시 댓글, 댓글에서 더블클릭시 대댓글)
          </p>
            <ButtonList>
              <ButtonWrap>
                <button className={"btn" + (namebutton ? " active" : "")} onClick={()=>{clickname()}}>
                  제목
                </button>
              </ButtonWrap>
              <ButtonWrap>
                <button className={"btn" + (joinbutton ? " active" : "")} onClick={()=>{clickjoin()}}>
                  작성자
                </button>
              </ButtonWrap>
            </ButtonList>
            <div className="search_button">
            <SearchWarp
              placeholder="게시물 검색"
              allowClear
              onSearch={onSearch}
              value={search}
              onChange={handleSearchChange}
              style={{
                width: 200,
                height: 10,
              }}
            />
          </div>
        </div>
        <TableWrap rowKey="bid"
          columns={columns}
          dataSource={board}
          scroll={{x: 1350}}
          onRow={(record, rowIndex) => {
            return {
               // click row
              onDoubleClick: event => {                 
                showModal(record.bid)
                console.log(record.bid)
              }, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />
      </InnerWraps>
      <Modal width={1200}title="댓글" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
      <TableWrap rowKey="bid"
          columns={columns2}
          dataSource={comment.mapper}
          scroll={{x: 1350}}
          onRow={(record, rowIndex) => {
            return {
               // click row
              onDoubleClick: event => {     
                showModal2(record.child);           
              }, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />
     
      </Modal>
      <Modal width={1200}title="대댓글" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        
      <TableWrap rowKey="bid"
          columns={columns2}
          dataSource={child}
          scroll={{x: 1350}}
          onRow={(record, rowIndex) => {
            return {
               // click row
              onDoubleClick: event => {                 
              }, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />
        
     
      </Modal>
    
    
     </Container>
    )
    }

    
const Container = styled.div`
  padding: 0;
  width: 1235px;
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

const FormItem = styled(Form.Item)`
  
div{
  strong{
    display: inline-block;
    font-weight: 400;
    padding: 0 2px;
    background: #d1f2e8;
    color: #16ae81;
  }
}
`
export default Board;
