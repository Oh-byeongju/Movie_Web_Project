import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { MANAGER_MOVIE_COMMENT_LIST_REQUEST, MANAGER_MOVIE_COMMENT_DELETE_REQUEST } from '../../reducer/R_manager_user.js';
import * as date from "../../lib/date.js";
import { Table, Modal } from 'antd';

const DocumentMovieComment = () => {
  const dispatch = useDispatch();

  // 필요한 리덕스 상태들
  const { MOVIE_COMMENT_LIST_loading, MOVIE_COMMENT_LIST, MOVIE_COMMENT, MOVIE_COMMENT_DELETE_loading } = useSelector(
    state => ({
      MOVIE_COMMENT_LIST_loading: state.R_manager_user.MOVIE_COMMENT_LIST_loading,
      MOVIE_COMMENT_LIST: state.R_manager_user.MOVIE_COMMENT_LIST,
			MOVIE_COMMENT: state.R_manager_user.MOVIE_COMMENT,
      MOVIE_COMMENT_DELETE_loading: state.R_manager_user.MOVIE_COMMENT_DELETE_loading
    }),
    shallowEqual
  );

  // 테이블에 있는 페이지네이션 누를 때
	const handleTableChange = (pagination) => {
		dispatch({
			type: MANAGER_MOVIE_COMMENT_LIST_REQUEST,
			data: {
				mid: MOVIE_COMMENT.mid,
				page: pagination.current - 1,
        size: pagination.pageSize
			}
		});
  };

	// 모달 내용 및 상태관리
	const [selectRow, setSelectRow] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (row) => {
		setSelectRow(row);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // 관람평 삭제 버튼 누르면 실행되는 함수
	const CommentDelete = useCallback((data) => {
    if (!window.confirm("관람평을 삭제하시겠습니까? (삭제된 관람평은 복구되지 않습니다)")) {
      return;
    };

    dispatch({
			type: MANAGER_MOVIE_COMMENT_DELETE_REQUEST,
			data: {
        umid: data,
				mid: MOVIE_COMMENT.mid,
				page: MOVIE_COMMENT_LIST.number,
        size: MOVIE_COMMENT_LIST.size
			}
		});
	}, [MOVIE_COMMENT.mid, MOVIE_COMMENT_LIST, dispatch]);

  // antd css 설정
  const columns = [
    {
      title: '계정',
      width: 60,
      dataIndex: 'uid'
    },
    {
      title: '관람평번호',
      width: 60,
      dataIndex: 'umid'
    },
    {
      title: '작성일시',
      width: 100,
      render: (text, row) => <div> {row["umcommenttime"].substr(0, 10)} ({date.getDayOfWeek(row["umcommenttime"])}) {row["umcommenttime"].substr(10, 9)} </div>,
      sorter: (a, b) => new Date(a.umcommenttime) - new Date(b.umcommenttime)
    },
		{
      title: '관람평 내용',
      width: 320,
			ellipsis: true,
      dataIndex: 'umcomment'
    },
		{
      title: '공감개수',
      width: 60,
      dataIndex: 'upcnt',
			sorter: (a, b) => a.upcnt - b.upcnt,
    },
    {
      title: '관리자',
      fixed: 'right',
      width: 50,
      render: (text, row) => <TableButton onClick={()=> CommentDelete(row.umid)}>delete</TableButton>
    },
  ];  

	return (
		<>
			<TableWrap rowKey="umid"
        loading={MOVIE_COMMENT_DELETE_loading || MOVIE_COMMENT_LIST_loading}
        columns={columns}
        dataSource={MOVIE_COMMENT_LIST.content}
        pagination={{current: MOVIE_COMMENT_LIST.number ? MOVIE_COMMENT_LIST.number + 1 : 1, total: MOVIE_COMMENT_LIST.totalElements, pageSize: MOVIE_COMMENT_LIST.size}}
        onChange={handleTableChange}
				onRow={(record, rowIndex) => {
					return {
						onDoubleClick: event => { showModal(record.umcomment); }
					};
				}}
				scroll={{x: 100}}
				locale={{ 
          triggerDesc: '내림차순 정렬하기',
          triggerAsc: '오름차순 정렬하기', 
          cancelSort: '정렬해제하기'
      	}}
      />
			<Modal title="관람평 전체내용" okText="확인" open={isModalOpen} onCancel={handleOk} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }} >
        <p>{selectRow}</p>
      </Modal>
		</>
	);
};

const TableWrap = styled(Table)`
  margin-bottom: 30px;
  min-height: 693px;

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

export default DocumentMovieComment;