/*eslint-disable*/
/*
	23-04-28 예매 페이지 영화 컴포넌트 수정(오병주)
*/
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { TICKET_MOVIE_LIST_REQUEST, TICKET_MOVIE_SELECT } from "../../reducer/R_ticket";

const TicketMovieList = () => {
  const dispatch = useDispatch();

	// 필요한 리덕스 상태들
	const { MOVIE_LIST, MOVIE, THEATER, DAY } = useSelector(
		state => ({
			MOVIE_LIST: state.R_ticket.MOVIE_LIST,
			MOVIE: state.R_ticket.MOVIE,
			THEATER: state.R_ticket.THEATER,
			DAY: state.R_ticket.DAY
		}),
		shallowEqual
	);

	// 스크롤 위치 조정 useEffect
	useEffect (()=> {
		if (MOVIE !== '') {
			window.scrollTo({
				top: 100,
				behavior: "smooth"});
		}
	}, []);

	// 영화 조회 useEffect
  useEffect(() => {
		dispatch({
			type: TICKET_MOVIE_LIST_REQUEST,
			data: {
				miday: DAY.miday,
				tid: THEATER.tid
			}
		});
  }, [DAY, THEATER, dispatch]);

  // 영화를 선택하는 함수
  const onClickMovie = useCallback((movie) => {
		// 상영스케줄이 존재할 경우
		if (movie.reserve) {
			dispatch({
				type: TICKET_MOVIE_SELECT,
				data: movie
			});
		}
		else {
			if (!window.confirm("선택한 영화에 원하시는 상영스케줄이 없습니다. 계속하겠습니까?")) {
				return;
			}
			else {
				console.log('여기 초기화');
			}
		}
  }, [dispatch]);

	// css 위치 맞춰야함
	// 정렬 넣을꺼면 넣기

  return (
    <MovieWrapper>
      <MovieTitle>
        <p>
					영화
				</p>
      </MovieTitle>
      <MovieSelector>
        <MovieSelectorText>
					전체
				</MovieSelectorText>
      </MovieSelector>
      <MovieListWrapper>
        {MOVIE_LIST.map((movie) => 
					<MovieList key={movie.mid} onClick={() => {onClickMovie(movie);}} select_movie={MOVIE.mid} movie={movie.mid}>
            <MovieListMovieName className={movie.reserve ? "" : "disable"}>
              <Img src={`img/age/${movie.mrating}.png`} alt="영화" />
              {movie.mtitle}
            </MovieListMovieName>
          </MovieList>
        )}
      </MovieListWrapper>
    </MovieWrapper>
  );
};

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  border-right: 1px solid #d8d9db;
  background-color: #f2f0e5;
`;

const MovieTitle = styled.div`
  color: #222;
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 20px;
  padding: 20px 0 20px 20px;
  font-weight: bold;
  top: -15px;

  p {
    display: block;
    position: relative;
    left: -4px;
  }
`;

const MovieSelector = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const MovieSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  margin-left: 20px;
  width: 240px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;

const MovieListWrapper = styled.div`
  padding: 10px 18px 0 20px;
  height: 400px;
  width: 235px;
  display: flex;
  overflow-x: scroll;
  overflow-x: hidden;
  flex-direction: column;
`;

const MovieList = styled.div`
  clear: both;
  float: left;
  width: 244px;
  height: 35px;
  line-height: 35px;
  margin-bottom: 1px;
  position: relative;
  background-color: #f2f0e5;
  cursor: pointer;
	background-color: ${(props) => props.select_movie === props.movie ? "#333333" : "#f2f0e5"};
	color: ${(props) => props.select_movie === props.movie ? "white" : "black"};

  .disable {
    cursor: default;
    opacity: 0.5;
  }
`;

const MovieListMovieName = styled.div`
  font-size: 13px;
  width: 174px;
  margin-left: 10px;
`;

const Img = styled.img`
  width: 23px;
  height: 20px;
  position: relative;
  top: 3px;
  padding-right: 10px;
`;

export default TicketMovieList;
