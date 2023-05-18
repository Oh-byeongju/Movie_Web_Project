/*
  23-05-18 게시물 페이지 수정(오병주)
*/
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { SyncOutlined, LoadingOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { COMMENT_LIKE_REQUEST, COMMENT_READ_REQUEST, COMMENT_WRITE_REQUEST } from "../../reducer/Board";
import ReplyComment from "./ReplyComment";
import * as date from "../../lib/date.js";

const ContentComment = () =>{
	const dispatch = useDispatch();
	const { id } = useParams();

	// 로그인 리덕스 상태
	const { LOGIN_data } = useSelector((state) => state.R_user_login);
	const {content, comment, comment_read_loading} = useSelector((state)=>state.Board)

	// 댓글 정렬 상태
	const menu = [{name:'최신순', type:"new"}, {name:'인기순', type:"top"}];
	const [type, setType] = useState("new");
	const onClickMenu = useCallback((data)=>{
		setType(data);
	}, []);

	// 댓글 요청 useEffect
	useEffect(()=>{
		dispatch({
			type: COMMENT_READ_REQUEST,
			data: {
				bid: id,
				type: type
			}
		});
	}, [id, type, dispatch]);


	// 댓글 내용 상태
	const [text, setText] = useState("");
	const onChangeText = useCallback((e)=>{
		setText(e.target.value);
	}, []);
    
	// 댓글 작성하는 함수
	const onClickComment = useCallback(() => {
		// 댓글이 빈칸일경우
		if (text.trim() === '') {
			alert('댓글을 작성해주세요.');
			return;
		}

		if (!window.confirm("댓글을 작성하시겠습니까?")) {
			return;
		} 

		dispatch({
			type: COMMENT_WRITE_REQUEST,
			data: {
				text: text,
				parent: "",
				bid: content.bid,
			}
		});
		// 결과에 따라 useEffect 만들어야함
	}, [dispatch, text, content.bid]);
       
	// 새로고침 함수
	const onClickRefresh = useCallback(()=> {
		dispatch ({
			type: COMMENT_READ_REQUEST,
			data: {
				bid: id,
				type: type
			}
		});
	}, [id, type, dispatch]);

	// 댓글 좋아요 함수
	const onClickUp = useCallback((data)=> {
		if (LOGIN_data.uid === "No_login") {
			alert('로그인이 필요한 서비스입니다.');
			return;
		}
		else {
			dispatch({
				type: COMMENT_LIKE_REQUEST,
				data: {
					like: 1,
					unlike: 0,
					comment: data.bcid,
					uid: LOGIN_data.uid,
					board: data.board
				}
			});
		}
	}, [LOGIN_data.uid, dispatch]);

	// 댓글 싫어요 함수
	const onClickDown = useCallback((data) => {
		if (LOGIN_data.uid === "No_login") {
			alert('로그인이 필요한 서비스입니다.');
			return;
		}
		else {
			dispatch({
				type: COMMENT_LIKE_REQUEST,
				data: {
					like: 0,
					unlike: 1,
					comment: data.bcid,
					uid: LOGIN_data.uid,
					board: data.board
				}
			});
		}
	}, [LOGIN_data.uid, dispatch]);

	return (
		<Comment>
			<CommentHeader>
				<Left>
					<h2>
						댓글
					</h2>
					<span>
						총 {comment.count}개
					</span>
				</Left>
				<Right>
					<button>
						<span className="icon">
							{comment_read_loading ? <LoadingOutlined/> : <SyncOutlined/>} 
						</span>
						<span onClick={onClickRefresh}>
							새로고침
						</span>
					</button>
				</Right>
			</CommentHeader>
			{LOGIN_data.uid !== "No_login" ? 
			<CommnetWrite>
				<div className="form">
					<div className="text">
						<textarea placeholder="댓글을 작성해주세요." maxLength={99} value={text} onChange={onChangeText}/>
					</div>
					<div className="info">
						<div className="number">
							{text.length} / 100
						</div>
						<div className="writebutton">
							<button className="write" onClick={onClickComment}>
								작성하기
							</button>
						</div>
					</div>
				</div>
			</CommnetWrite> : null}
			<CommentList>
				<Sort>
					<ul>
						{menu.map((data, index)=>
						<li key={index}>
							<SortButton category={data.type} type={type} onClick={() => {onClickMenu(data.type)}}>
								{data.name}
							</SortButton>
						</li>)}				
					</ul>
				</Sort>
			</CommentList>      
			<CommentData>
				{comment.mapper && comment.mapper.map((data)=>
				<li key={data.bcid}>
					<div className="comment">
						<div className="number">
							<div className={data.likes? "colorup ": "up"} onClick={()=> onClickUp(data)}>
								<CaretUpOutlined/>
							</div>
							<div className="num">
								{data.commentlike}
							</div>
							<div className={data.unlikes? "colordown": "down"} onClick={()=> onClickDown(data)}>
								<CaretDownOutlined/>
							</div>
						</div>
						<div className="name">
							<span className="id">
								{data.member}
							</span>
							<span className="time">
								{date.detailDate(new Date(data.bcdate))}
							</span>
						</div>
						<div className="comment-content">
							<p>
								{data.bccomment}
							</p>
						</div>
					</div>
					<ReplyComment idd={data.bcid} child={data.child} bid={data.board} member = {data.member}/> 
				</li>)}
			</CommentData>
		</Comment>
	);
};

const Comment = styled.div`
	float: right;
	box-sizing: border-box;
	width: 728px;
	margin-top: 40px;
	background-color: #fff;
	box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, .15);
	border: 1px solid #ebeef1;
`;

const CommentHeader= styled.div`
	z-index: auto;
	position: relative;
	top: 0px;
	padding: 18px;
	display: flex;
	justify-content: space-between;
`;

const Left = styled.div`
	h2 {
		display: inline;
		line-height: 21px;
		font-size: 18px;
		color: #1e2022;
	}

	span {
		margin-left: 7px;
		line-height: 18px;
		font-size: 14px;
		color: #7b858e;
	}   
`;

const Right = styled.div`
	button {
		background: none;
		line-height: 17px;
		font-size: 14px;
		color: #7b858e;
		background: none;
		cursor: pointer;
		font-family: inherit;
		border: 0;
		padding: 0;
		border-radius: 0; 
		-webkit-border-radius: 0;

		span {
			vertical-align: middle;
		}

		.icon {
			padding-right: 7px;
		}
	}
`;

const CommnetWrite = styled.div`
	padding: 24px 16px;
	background: #f8f9fa;

	.form {
		background-color: #fff;
		border: 1px solid #dddfe4;

		.text {
			margin: 8px 12px 0;
			padding-bottom: 16px;

			textarea {
				overflow: hidden;
				overflow-wrap: break-word;
				height: 70px;
				display: block;
				width: 100%;
				min-height: 40px;
				line-height: 20px;
				font-size: 14px;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				resize: none;
				border: none;
				outline: none;
				font-family: Helvetica,Arial, Malgun Gothic,sans-serif;
			}
    }

		.info {
			position: relative;
			border-top: 1px solid #dddfe4;
			min-height: 42px;
			box-sizing: border-box;
			padding-right: 186px;

			.number {
				font-size: 14px;
				line-height: 17px;
				color: #7b858e;
				position: absolute;
				right: 100px;
				bottom: 12px;
			}

			.writebutton {
				position: absolute;
				right: 0;
				bottom: 0;

				.write {
					cursor: pointer;
					width: 92px;
					padding: 10px 9px;
					line-height: 20px;
					font-size: 16px;
					border-radius: 0;
					border-color: #46cfa7;
					background-color: #46cfa7;
					color: #fff;
					border: 1px solid #dddfe4;
				}
			}
		}
	}
`;

const CommentList = styled.div`
	height: 48px;
	border-bottom: 1px solid #dddfe4;
`;

const Sort = styled.div`
	ul {
		list-style: none;	
		padding-left: 20px;

		li {
			float: left;	

			&:first-child {
      margin-right: 10px;
    	}
		}
	}
`;

const SortButton = styled.button`
	padding: 15px 16px 12px;
	line-height: 19px;
	font-size: 16px;
	color: #1e2022;
	border-bottom: 3px solid transparent;
	background: none;
	font-family: inherit;
	border-right: 0;  
	border-left: 0;                
	border-top: 0; 
	color: ${(props) => props.category === props.type ? "#16ae81" : ""};
	border-color: ${(props) => props.category === props.type ? "#46cfa7" : ""};
	cursor: pointer;
`;


const CommentData = styled.ul`
	list-style-type: none;
	position: relative;
	margin: 0;
	padding-left: 0;
	width: 100%;

	li {
    width: 100%;
    position: relative;
    border-top: 1px solid #dddfe4;

		&:first-child {
			border-top: none;
    }

		.comment {
			position: relative;
			padding: 12px 12px 12px 64px;

			.number {
				position: absolute;
				left: 25px;
				top: 23px;
				text-align: center;

				.colorup {
					color: #46cea6;
				}

				.colordown{
					color: #f95a53;
				}
			}

			.name {
				line-height: 17px;
				font-size: 14px;
				margin-top: 5px;
				color: #7b858e;

				.id {
					display: inline-block;
					font-weight: 700;
					color: #1e2022;
					word-wrap: break-word;
					word-break: break-all;
					padding-right: 14px;
					line-height: 10px;
					height: 12px;
					border-right: 1px solid #98a0a7;
				}

				.time{
						padding-left: 14px;
				}
			}
    }
		.comment-content{
			line-height: 25px;
			font-size: 14px;
			color: #1e2022;
			word-wrap: break-word;
			word-break: break-all;
			overflow: auto;
			max-height: 400px;
		}
	}
`;

export default ContentComment;