/*
  23-05-16 게시물 페이지 수정(오병주)
*/
import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { CaretUpOutlined } from "@ant-design/icons";
import { Pagination } from 'antd';
import { useDispatch ,useSelector} from "react-redux"
import { BOARD_READ_REQUEST } from "../../reducer/Board";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as date from "../../lib/date.js";

const ContentList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { category, free, page } = useParams();
	const { board } = useSelector((state) => state.Board);

	// 페이지네이션 변경 함수
	const handleChange = useCallback((page) => {
		navigate(`/Board/list/${category}/${free}/${page}`);
	}, [category, free, navigate]);

	// 페이지에 따른 게시물 요청 useEffect
	useEffect(()=>{
		dispatch({
			type:BOARD_READ_REQUEST,
			data: {
				page: page-1,
				category: category,
				sort: free
			}
		});
	}, [page, category, free, dispatch]);

	return (
		<ContentWrapper>
		{board.content && board.content.map((data, index)=>
			<Card key={index}>
				<Number>
					<CaretUpOutlined twoToneColor="grey"/>
					<div>
						{data.bid}
					</div>
				</Number>
				<Detail>
					<Link to={`/Board/content/${data.bid}/${data.btitle}`}>
						<div>
							<span>
								{data.btitle}
								<em>
									[{data.commentcount}]
								</em>
							</span>
						</div>
					</Link>
				</Detail>
				<Item>
					<div className="category">
						{data.bcategory}
					</div>
					<div className="date">
						<span>
							{date.detailDate(new Date(data.bdate))}
						</span>
					</div>
					<div className="name">
						{data.uid}
					</div>
				</Item>
				<Thumbnail onClick={()=> console.log('여기 넘어가게끔 수정해라')} dangerouslySetInnerHTML={{__html:data.thumb}}>
				</Thumbnail>
			</Card>)}
			<CustomPagination current={parseInt(page)} total={board.totalElements} defaultPageSize={20} showSizeChanger={false} hideOnSinglePage={true} onChange={handleChange}/>
		</ContentWrapper>
	);
};

const ContentWrapper = styled.div`
	width: 728px;
	margin-top: 0;
	border-top: 1px solid #ebeef1;
	background: #f8f9fa;
	margin-top: 8px;
	line-height: 18px;
	font-size: 14px;
	color: #7b858e;
	min-height: 500px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
`;

const Card = styled.div`
	position: relative;
	display: table;
	table-layout: fixed;
	width: 100%;
	height: 78px;
	box-sizing: border-box;
	border-top: 1px solid #ebeef1;
	background-color: #fff;
	padding: 8px 0;

	&:hover {
		background-color: #f8f9fb;
	}
`;

const Number = styled.div`
	width: 72px;
	vertical-align: middle;
	display: table-cell;
	text-align: center;
`;

const Detail = styled.div`
	vertical-align: middle;
	padding-top: 10px;
	color: inherit;

	a {
		text-decoration: none;
	}

	div {
		display: flex;
		overflow: auto;
		vertical-align: top;
		line-height: 16px;
		font-size: 14px;
		color: #1e2022;
		word-break: break-all;

    span {
			display: block;
			max-width: 80%;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			padding-right: 5px;

			em {
				padding-left: 5px;
				color: #16ae81;
				font: inherit;
				vertical-align: top;
				line-height: 14px;
			}
  	}
  }
`;

const Item = styled.div`
	margin-top: 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding-top: 5px;

	.category {
		float: left;
		display: inline-block;
		font-size: 14px;
		color: #98a0a7; 
		height: 16px;
		line-height: 12px;
		padding-right: 15px;
		border-right: 1px solid #98a0a7;
	}

	.date {
		float: left;
		display: inline-block;
		font-size: 14px;
		color: #98a0a7;
		padding-right: 15px;
		padding-left: 15px;
		height: 16px;
		padding-right: 15px;
		line-height: 12px;
		border-right: 1px solid #98a0a7;
	}

	.name {
		float:left;
		display: inline-block;
		font-size: 14px;
		color: #98a0a7;
		padding-right: 15px;
		padding-left: 15px;
		height: 16px;
		padding-right: 15px;
		line-height: 12px;
	}
`;

const Thumbnail = styled.div`
	display: table-cell;
	padding-right: 20px;
	width: 70px;
	vertical-align: middle;
	cursor: pointer;

	img {
		display: block;
		width: 70px;
		height: 62px;
		-o-object-fit: cover;
		object-fit: cover;
		font-family: "object-fit: cover;";
	}
`;

const CustomPagination = styled(Pagination)`
	position: relative;
	text-align: center;
	height: 60px;
	line-height: 55px;
`;

export default ContentList;