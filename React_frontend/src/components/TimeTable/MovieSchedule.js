import styled from "styled-components";
import React, { useEffect }from "react";
import { TIMETABLE_MOVIEINFO_LIST_MOVIE_REQUEST } from "../../reducer/R_timeTable";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const MovieSchedule = () =>{
	const dispatch = useDispatch();

	// 필요한 리덕스 상태들
	const { MOVIE, DAY, AREA, DAY_LIST_loading, MOVIEINFO_LIST_MOVIE } = useSelector(
		state => ({
			MOVIE: state.R_timeTable.MOVIE,
			DAY: state.R_timeTable.DAY,
			AREA: state.R_timeTable.AREA,
			DAY_LIST_loading: state.R_timeTable.DAY_LIST_loading,
			MOVIEINFO_LIST_MOVIE: state.R_timeTable.MOVIEINFO_LIST_MOVIE
		}),
		shallowEqual
	);

	// 영화 선택에 따른 상영정보 조회 useEffect
	useEffect(()=> {
		if (MOVIE && DAY && AREA && !DAY_LIST_loading) {
			dispatch({
				type: TIMETABLE_MOVIEINFO_LIST_MOVIE_REQUEST,
				data: {
					mid: MOVIE.mid,
					miday: DAY,
					tarea: AREA
				}
			});
		}
	}, [MOVIE, DAY, AREA, DAY_LIST_loading, dispatch]);

	return (
		<>
			<ReverseMovieWrapper>
			{MOVIEINFO_LIST_MOVIE.map((movieInfo, index)=>
				<TheaterList key={index}>
					<TheaterArea>
						<div>
							{movieInfo.theaterName}점
						</div>
					</TheaterArea>
					{movieInfo.cinemaDtoList.map((cinema)=>
					<CinemaTypeWrapper key={cinema.cid}>
						<CinemaType>
							<p className="theater-type">
								{cinema.cname}
							</p>
							<p className="chair">
								{cinema.cseat} 좌석
							</p>
						</CinemaType>
						<CinemaTime>
							<Type>
								{cinema.ctype}
							</Type>
							<Time>
								<table>
									<tbody>
										<tr>
										{cinema.movieInfoDtoList.map((info)=>
											<td key={info.miid}>
												<div>
													<span>
														<p className='movietime'>
															{info.mistarttime.substring(11, 16)} ~ {info.miendtime.substring(11, 16)}
														</p>
														<p className='seatinfo'>
															{cinema.cseat - info.cntSeatInfo} / {cinema.cseat}
														</p>
														<p className='reserinfo'>
															예매하기
														</p>
													</span>
												</div>
											</td>
										)}		
										</tr>
									</tbody>
								</table>
							</Time>
						</CinemaTime>
					</CinemaTypeWrapper>)}
				</TheaterList>)}
			</ReverseMovieWrapper>
		</>
	);
};

const ReverseMovieWrapper = styled.div`
	width: 100%;
	display: table;
	border-top: 0;
`;

const TheaterList = styled.div`
	position: relative;
	padding-bottom: 50px;
`;

const TheaterArea = styled.div`
	padding: 0 0 15px 0;
	border-bottom: 1px solid #eaeaea;
	font-weight: 700;
	font-size: 1.2em;

	div {
		color: #444;
		text-decoration: none;
	}
`;

const CinemaTypeWrapper = styled.div`
	overflow: hidden;
	width: 100%;
	position: relative;
	border-bottom: 1px solid #eaeaea;
`;

const CinemaType = styled.div`
	text-align: left;
	width: 170px;
	display: table-cell;
	vertical-align: middle;
	position: absolute;
	top: 0;
	left: 0;
	padding: 0!important;
	float: left;

	.theater-type{
		font-size: 1.2em;
		color: #444;
		font-weight: 400;
		margin-bottom: 10px;
		line-height: 1em;
	}
`;

const CinemaTime = styled.div`
	width: 100%;
	float: left;
	margin: 12px 0;
	margin-left: 190px;
`;

const Type = styled.div`
	display: table-cell;
	vertical-align: middle;
	width: 100px;
	box-sizing: border-box;
	background-color: #f2f4f5;
	text-align: center;
	color: #444;
	font-weight: 700;
	border-bottom: 0;
`;

const Time = styled.div`
	display: table-cell;
	width: 800px;

	table {
    margin-left: 9px;
    width: auto;
    table-layout: auto;

    td {
			width: 99px;
			cursor: pointer;
			text-align: center;

			:hover {
				color: white;
				font-weight: 500;
				background: purple;
				border: none;

				.reserinfo {
					display: block;
				}
				.seatinfo {
					display: none;
				}
				div {
					border: 1px solid purple;
				}
			}

			div {
				width: 100%;
				height: 70px;
				display: table;
				border: 1px solid #ededed;
		
				p {
					margin: 0;
				}
				.movietime {
					font-size: 14px;
					margin-bottom: 5px;
					margin-top: 11px;
				}
				.reserinfo {
					display: none;
				}
				.seatinfo {
					display: block;
				}
			}
		}
	}
`;

export default MovieSchedule;