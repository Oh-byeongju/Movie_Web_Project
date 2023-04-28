/*
	극장을 표시해주는 컴포넌트 2023-02-13 수정완(강경목)
	23-04-28 예매 페이지 극장 컴포넌트 수정(오병주)
*/
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { TICKET_THEATER_LIST_REQUEST, TICKET_THEATER_SELECT } from "../../reducer/R_ticket";

const TicketTheaterList = () => {
  const dispatch = useDispatch();

	// 필요한 리덕스 상태들
	const { THEATER_LIST, MOVIE, THEATER, DAY } = useSelector(
		state => ({
			THEATER_LIST: state.R_ticket.THEATER_LIST,
			MOVIE: state.R_ticket.MOVIE,
			THEATER: state.R_ticket.THEATER,
			DAY: state.R_ticket.DAY
		}),
		shallowEqual
	);

	// 극장 조회 useEffect
  useEffect(() => {
		dispatch({
			type: TICKET_THEATER_LIST_REQUEST,
			data: {
				miday: DAY.miday,
				mid: MOVIE.mid
			}
		});
  }, [DAY, MOVIE, dispatch]);

	// 선택된 지역 버튼 useState
	const [selectTab, setSelectTab] = useState('seoul');

	// 극장 관리 useState
	const [theater, setTheater] = useState({
		seoul: 0,
		gyeonggi: 0,
		incheon: 0,
		busan: 0
  });
	const { seoul, gyeonggi, incheon, busan } = theater;

	// 지역별 극장 개수 설정하는 useEffect
	useEffect(()=> {
		var temp_seoul = 0;
		var temp_gyeonggi = 0;
		var temp_incheon = 0;
		var temp_busan = 0;
	
		for (var i = 0; i < THEATER_LIST.length; i++) {
			if (THEATER_LIST[i].tarea === "서울" && THEATER_LIST[i].reserve) { temp_seoul++; }
			else if(THEATER_LIST[i].tarea === "경기" && THEATER_LIST[i].reserve) { temp_gyeonggi++; }
			else if(THEATER_LIST[i].tarea === "인천" && THEATER_LIST[i].reserve) { temp_incheon++; }
			else if(THEATER_LIST[i].tarea === "부산" && THEATER_LIST[i].reserve) { temp_busan++; }
		}

		setTheater(t=> ({
			...t,
			seoul: temp_seoul,
			gyeonggi: temp_gyeonggi,
			incheon: temp_incheon,
			busan: temp_busan
		}));
	}, [THEATER_LIST]);

	// 극장을 선택하는 함수
  const onClickTheater = useCallback((theater) => {
		// 상영스케줄이 존재할 경우
		if (theater.reserve) {
			dispatch({
				type: TICKET_THEATER_SELECT,
				data: theater
			});
		}
		else {
			if (!window.confirm("선택한 극장에 원하시는 상영스케줄이 없습니다. 계속하겠습니까?")) {
				return;
			}
			else {
				console.log('여기 초기화');
			}
		}
  }, [dispatch]);

	// css위치 맞추고 스크롤 조정해야함 --> 아래 styled component확인


  return (
    <TheaterWrapper>
      <TheaterTitle>
        <p>
					극장
				</p>
      </TheaterTitle>
      <TheaterSelector>
        <TheaterSelectorText>
					전체
				</TheaterSelectorText>
      </TheaterSelector>
      <TheaterListWrapper>
				<TheaterAreaList>
					<TheaterArea onClick={()=> setSelectTab('seoul')} tab={selectTab === 'seoul'} >
						서울 ({seoul})
					</TheaterArea>
					<TheaterArea onClick={()=> setSelectTab('gyeonggi')} tab={selectTab === 'gyeonggi'}>
						경기 ({gyeonggi})
					</TheaterArea>
					<TheaterArea onClick={()=> setSelectTab('incheon')} tab={selectTab === 'incheon'}>
						인천 ({incheon})
					</TheaterArea>
					<TheaterArea onClick={()=> setSelectTab('busan')} tab={selectTab === 'busan'}>
						부산 ({busan})
					</TheaterArea>
				</TheaterAreaList>
				<TheaterNameList>
					<ul>
						{selectTab === 'seoul' ? THEATER_LIST.map((theater)=> 
						theater.tarea === '서울' ? <TheaterLi className={theater.reserve ? "" : "disable"} key={theater.tid} onClick={()=> onClickTheater(theater)} select_theater={THEATER.tid} theater={theater.tid}> 
						{theater.tname} </TheaterLi> : null) : null}

						{selectTab === 'gyeonggi' ? THEATER_LIST.map((theater)=> 
						theater.tarea === '경기' ? <TheaterLi className={theater.reserve ? "" : "disable"} key={theater.tid} onClick={()=> onClickTheater(theater)} select_theater={THEATER.tid} theater={theater.tid}> 
						{theater.tname} </TheaterLi> : null) : null}

						{selectTab === 'incheon' ? THEATER_LIST.map((theater)=> 
						theater.tarea === '인천' ? <TheaterLi className={theater.reserve ? "" : "disable"} key={theater.tid} onClick={()=> onClickTheater(theater)} select_theater={THEATER.tid} theater={theater.tid}> 
						{theater.tname} </TheaterLi> : null) : null}

						{selectTab === 'busan' ? THEATER_LIST.map((theater)=> 
						theater.tarea === '부산' ? <TheaterLi className={theater.reserve ? "" : "disable"} key={theater.tid} onClick={()=> onClickTheater(theater)} select_theater={THEATER.tid} theater={theater.tid}> 
						{theater.tname} </TheaterLi> : null) : null}
					</ul>
				</TheaterNameList>
      </TheaterListWrapper>
    </TheaterWrapper>
  );
};

const TheaterWrapper = styled.div`
  width: 25%;
  position: relative;
  float: left;
  height: 528px;
  margin-left: 2px;
  background-color: #f2f0e5;
  overflow: hidden;
  padding-right: 120px;
`;

const TheaterTitle = styled.div`
  color: #222;
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 20px;
  padding: 20px 0 4px 20px;
  font-weight: bold;
  top: -15px;

  p {
    display: block;
    position: relative;
    left: 60px;
  }
`;

const TheaterSelector = styled.div`
  padding: 18px;
  div {
    border: 1px solid #d8d9db;
    border-bottom: none;
    height: 35px;
    font-size: 16px;
    text-align: center;
    margin-top: 10;
    padding-top: 6px;
  }
`;

const TheaterSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  margin-left: 10px;
  width: 240px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;

const TheaterListWrapper = styled.div`
  display: flex;
	position: relative;
  float: left;
  width: 100%;
  height: 323px;
  margin-top: 3px;
`;

const TheaterAreaList = styled.ul`
  position: relative;
  float: left;
  width: 100%;
	// 이거 height 맞춰보기
	// 극장 추가하고 상영정보 몇개 넣어서 오버플로우 생기게 해봐야함
	// 아마 여기 말고 css 바꿔서 아래쪽으로 넣어줘야 할거같긴함
  height: 350px;
  margin-top: 3px;
	overflow-x: scroll;
  overflow-x: hidden;
`;

const TheaterArea = styled.li`
  clear: both;
  overflow: hidden;
  float: left;
  width: 109px;
  cursor: pointer;
  height: 31px;
  font-size: 14px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) => props.tab === true ? "gainsboro" : "#f2f0e5"};
`;

const TheaterNameList = styled.div`
  position: absolute;
	height: 31px;
  font-size: 14px;
  line-height: 31px;
  top: 0;
  left: 110px;
  cursor: pointer;
  width: 160px;
  height: 100%;
  font-weight: bold;

	ul {
		list-style-type: none;
		margin: 0;

		.disable {
    	cursor: default;
    	opacity: 0.5;
  	}
	}
`;

const TheaterLi = styled.li`
  background-color: ${(props) => props.select_theater === props.theater  ? "#333333" : "#f2f0e5"};
  color: ${(props) => props.select_theater === props.theater ? "white" : "black"};
`;

export default TicketTheaterList;
