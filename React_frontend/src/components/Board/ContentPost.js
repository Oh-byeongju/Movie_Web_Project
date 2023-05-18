/*
  23-05-18 게시물 페이지 수정(오병주)
*/
import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled, EyeOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { CONTENT_DELETE_REQUEST, CONTENT_READ_REQUEST, LIKE_REQUEST } from "../../reducer/Board";
import * as date from "../../lib/date.js";

const ContentPost = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {id, title} = useParams();

	// 로그인 리덕스 상태
	const { LOGIN_data } = useSelector((state) => state.R_user_login);
	// 디비 고치고 이거 밀기
  const {content} = useSelector((state)=>state.Board)
   
	useEffect(()=>{
		dispatch({
			type: CONTENT_READ_REQUEST,
			data: {
				id: id,
				title: title
			}
		});
	}, [id, title, dispatch]);

	const onClickLike = () =>{

		if (LOGIN_data.uid === "No_login") {
			alert('로그인이 필요한 서비스입니다.');
			return;
		}

		dispatch({
				type:LIKE_REQUEST,
				data:{
						like:1,
						unlike:0,
						uid:LOGIN_data.uid,
						board:content.bid
				}
		})
	}

	const onClickUnLike =()=>{
		if (LOGIN_data.uid === "No_login") {
			alert('로그인이 필요한 서비스입니다.');
			return;
		}
			dispatch({
					type:LIKE_REQUEST,
					data:{
							unlike:1,
							like:0,
							uid:LOGIN_data.uid,
							board:content.bid
					}
			})
	}

	// 게시글을 삭제하는 함수
	const onClickDelete = useCallback(()=> {
		if (!window.confirm("게시글을 삭제하시겠습니까?")) {
			return;
		} 

		dispatch({
			type: CONTENT_DELETE_REQUEST,
			data: {
				bid: content.bid
			}
		})

		// 이거 날리는 부분을 원래 카테고리로 날려줘야하는지 고민 + 삭제성공여부에 따라 useEffect로 해줘야함

		// 아래쪽에 좋아요 싫어요도 css는 먹여놨고 디비접근은 구현해야함

		navigate('/board/list/popular/all/1');
	}, [content.bid, dispatch, navigate]);

	// 게시글을 수정하는 함수
	const onClickEdit = useCallback(()=> {
		if (!window.confirm("게시글을 수정하시겠습니까?")) {
			return;
		} 

		navigate('edit', {state: {
			id: content.bid,
			title: content.btitle,
			content: content.bdetail,
			category: content.bcategory
		}});
	}, [content.bid, content.btitle, content.bdetail, content.bcategory, navigate]);
        
	return (
		<Content>
			<Aricle>
				<Header>
					<Title>
						{content.btitle}
					</Title>
					<SubTitle>
						<MetaListLeft>
							<div className="category">
								{content.bcategory}
							</div>
							<div className="time">
								{date.detailDate(new Date(content.bdate))}
							</div>
							<div className="name">
								{content.uid}
							</div>
						</MetaListLeft>
						<MetaListRight>
							<div className="inq">
								<EyeOutlined style={{position:'relative', top:'-2px', paddingRight: "6px"}}/>
								<span>
									{content.bclickindex}
								</span>
							</div>
							<div className="comment">
								댓글 {content.commentcount}
							</div>
							<div className="top">
								추천 {content.blike}
							</div>
						</MetaListRight>
					</SubTitle>
				</Header>   
				<ContentWrapper>
					<ArticleContent dangerouslySetInnerHTML={{__html:content.bdetail}}/>
					<AricleBox>
						<Vote>
							<ArticleVote>
								<button className={"up"} onClick={onClickLike}>
									<span className="like">
										{false ? <LikeFilled style={{fontSize:"15px", color:"#46cea6"}}/> : <LikeOutlined style={{fontSize:"15px"}}/>}
									</span>
									<span className="number">
										{content.blike}
									</span>
								</button>
								<button className={"down"} onClick={onClickUnLike}>
									<span className="like">
										{true ? <DislikeFilled style={{fontSize:"15px", color:"#f95a53"}}/> : <DislikeOutlined style={{fontSize:"15px"}}/>}
									</span>
									<span className="number">
										{content.bunlike}
									</span>
								</button>
								{LOGIN_data.uid === content.uid ?
								<>
									<div className="delete" onClick={onClickDelete}>
										<DeleteOutlined/>
										<span>
											&nbsp;삭제하기
										</span>
									</div>
									<div className="edit" onClick={onClickEdit}>
                  	<EditOutlined/>
										<span>	
											&nbsp;수정하기
										</span>
                	</div>
								</> : null}
              </ArticleVote>
						</Vote>
					</AricleBox>
				</ContentWrapper>				
			</Aricle>
		</Content>
	);
};

const Content = styled.div`
	float: right;
	box-sizing: border-box;
	width: 728px;
	border: 1px solid #ebeef1;
`;

const Aricle = styled.div`
	background: #fff;
	box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, .15);
`;

const Header = styled.div`
	padding: 24px;
	padding-bottom: 40px;
	border-bottom: 1px solid #ebeef1;
`;

const Title = styled.div`
	line-height: 36px;
	font-size: 25px;
	color: #1e2022;
	word-wrap: break-word;
	word-break: break-all;
	overflow: auto;
`;

const SubTitle = styled.div`
	margin-top: 10px;
	line-height: 17px;
	font-size: 14px;
	color: #7b858e;
`;

const MetaListLeft = styled.div`
	float: left;
	margin-top: 0;

	.category {
		display: inline-block;
		font-size: 14px;
		color: #98a0a7;
		height: 13px;
		padding-right: 14px;
		line-height: 12px;
		border-right: 1px solid #98a0a7;
	}

	.time {
		display: inline-block;
		font-size: 14px;
		height: 13px;
		padding-right: 14px;
		padding-left: 14px;
		line-height: 12px;
		border-right: 1px solid #98a0a7;
	}        

	.name {
		display: inline-block;
		font-size: 14px;
		height: 13px;
		padding-left: 14px;
		line-height: 12px;
	}
`;

const MetaListRight = styled.div`
	float: right;

	.inq {
		margin-left: 0;
		padding-left: 0;
		display: inline-block;
		vertical-align: middle;
		position: relative;
		height: 13px;
		border-right: 1px solid #98a0a7;

		span {
			position: relative;
			top: -3px;
			padding-right: 14px;
		}
  }

	.comment {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		padding-left: 14px;
		padding-right: 14px;
		height: 13px;
		line-height: 12px;
		border-right: 1px solid #98a0a7;
	}

	.top {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		padding-left: 14px;
		height: 13px;
		line-height: 12px;
	}
`;

const ContentWrapper = styled.div`
	overflow: auto;
`;

const ArticleContent = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 24px 20px;
	line-height: 24px;
	font-size: 16px;
	color: #1e2022;
	word-wrap: break-word;
	word-break: break-word;
`;

const AricleBox = styled.div`
	border-top: 1px solid #ebeef1;
	text-align: center;
`;

const Vote = styled.div`
	padding: 12px 0;
	text-align: center;
`;

const ArticleVote = styled.div`
	position: relative;

	button {
		border-radius: 4px;
		background-color: #fff;
		border: 1px solid #dddfe4;
		cursor: pointer;
	}

	.up {
		padding: 12px;
		min-width: 88px;
		line-height: 17px;
		font-size: 14px;
		height: 43px;
		color: #1e2022;

		.like {
			height: 16px;
			background-size: 16px;
			vertical-align: top;
			overflow: hidden;
			display: inline-block;
			transition: all .5s;
			padding-right: 5px;
		}

		.number {
			display: inline-block;
			transition: all .3s;
		}
  }

	.down {
		padding: 12px;
		min-width: 88px;
		line-height: 17px;
		font-size: 14px;
		height: 43px;
		color: #1e2022;
		margin-left: 8px;
		cursor: pointer;

		.like {
			height: 16px;
			background-size: 16px;
			vertical-align: top;
			overflow: hidden;
			display: inline-block;
			transition: all .5s;
			padding-right: 5px;
		}
		.number {
			display: inline-block;
			transition: all .3s;
		}
  }

	.delete {
		position: absolute;
		top: 20px;
		right: 14px;
		color: #7b858e;
		font-size: 13px;
		cursor: pointer;
	}

  .edit {
		position: absolute;
		top: 20px;
		right: 94px;
		color: #7b858e;
		font-size: 13px;
		cursor: pointer;
	}
`;

export default ContentPost