/*
	사용자가 선택한 영화 및 정보를 표시해주는 컴포넌트 2023-02-13 수정완(강경목)
	23-04-29 예매 페이지 상태 컴포넌트 수정(오병주)
*/
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch,shallowEqual } from "react-redux";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { SEAT_PAGE_RESET } from "../../reducer/R_seat";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";

const TicketState = ({ seatPage, setSeatPage }) => {
	const dispatch = useDispatch();
  const navigate = useNavigate();

	// 필요한 리덕스 상태들
	const { MOVIE, THEATER, AREA, DAY, MOVIEINFO, LOGIN_data, Kid, Teenager, Adult, Price, ChoiceSeat } = useSelector(
		state => ({
			MOVIE: state.R_ticket.MOVIE,
			THEATER: state.R_ticket.THEATER,
			AREA: state.R_ticket.AREA,
			DAY: state.R_ticket.DAY,
			MOVIEINFO: state.R_ticket.MOVIEINFO,
			LOGIN_data: state.R_user_login.LOGIN_data,
			Kid: state.R_seat.Kid,
			Teenager: state.R_seat.Teenager,
			Adult: state.R_seat.Adult,
			Price: state.R_seat.Price,
			ChoiceSeat: state.R_seat.ChoiceSeat
		}),
		shallowEqual
	);

  // 영화 선택으로 넘어갈때 실행되는 함수
	const backMovie = useCallback(() => {
		if (!window.confirm('영화 선택화면으로 가시겠습니까? \n(선택한 좌석정보는 초기화 됩니다.)')) {
			return;
		}
		setSeatPage(false);
		dispatch({
			type: SEAT_PAGE_RESET
		})
	}, [setSeatPage, dispatch]);

	const goSeat = useCallback(()=> {
		// 상영정보를 선택 안했을경우
		if (MOVIEINFO === '') {
			alert('상영시간을 선택해주세요.');
			return;
		}

		// 여기에 30분 체크 있어야함
		// 넘기기전에 30분 체크해주고 일단 좌석고르는거 넘어가면 인정해주는걸로

		// 남은 좌석이 없을경우
		if (MOVIEINFO.cntSeatAll - MOVIEINFO.cntSeatInfo === 0) {
			alert('남은 좌석이 없습니다.');
			return;
		}

		// 로그인 여부에 따라 페이지 이동
		if (LOGIN_data.uid === "No_login") {
				// alert 취소
				if (!window.confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?")) {
					return;
				}
				// alert 확인(현재 정보를 전달해줌)
				else {
					navigate(`/UserLogin`, {
						state: {
							url: '/Reserve',
							MOVIE: MOVIE,
							THEATER: THEATER,
							AREA: AREA,
							DAY: DAY,
							MOVIEINFO: MOVIEINFO
						},
					});
				}
			} 
		else {
			setSeatPage(true);
		}
	}, [AREA, DAY, LOGIN_data.uid, MOVIE, MOVIEINFO, THEATER, navigate, setSeatPage])




  
  //좌석 페이지로 넘어가야함 데이터와 함께
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TicketWrapper>
      <TicketStep seatPage={seatPage}>
				<MoviePoster>
					<Poster>
						{MOVIE &&
						<Img
							className="imggg"
							src={`${MOVIE.mimagepath}`}
							alt="영화"
						/>}
					</Poster>
					<Title>
						{MOVIE &&
						<span>
							{MOVIE.mtitle}
						</span>
						}
					</Title>
					<Title>
						{MOVIE &&
						MOVIE.mrating + '세 관람가'
						// 이거 청불 전체 이렇게 나오게 해야함
						}
					</Title>
				</MoviePoster>
      
        <MovieTheater>
          {THEATER !== "" ? (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                {THEATER.tarea} {THEATER.tname}점
              </span>
            </Name>
          ) : (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Name>
          )}
          <Date>
            <span>일시</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{DAY.miday}</span>
          </Date>
          {MOVIEINFO !== "" ? (
            <Screen>
              <span>상영관</span>&nbsp;&nbsp;&nbsp;
              <span>
                {MOVIEINFO.ctype} {MOVIEINFO.cname}
              </span>
            </Screen>
          ) : (
            <Screen>
              <span>상영관</span>&nbsp;&nbsp;&nbsp;
              <span></span>
            </Screen>
          )}
        </MovieTheater>
        <SeatMore>
          <Seat>
            좌석 :
            {ChoiceSeat.map((seat, index) =>
              <span key={index}>
								&nbsp;{seat.location} 
							</span>
            )}
          </Seat>
          <PriceTag>총금액 : {Price === 0 ? '' : Price}</PriceTag>
        </SeatMore>
      </TicketStep>
      {seatPage ? (
        <>
          <MovieChoice onClick={backMovie}>
            <LeftCircleFilled
              style={{
								fontSize: "60px",
								top: "10px",
								left: "23px",
								position: "absolute"
              }}
            />
            <p>영화선택</p>
          </MovieChoice>
          <MovieSeat
            onClick={() => {
              if (Kid + Teenager + Adult > ChoiceSeat.length ) {
                alert("관람인원과 선택 좌석수가 동일하지 않습니다.");
                return;
              } 
              else if( Kid + Teenager + Adult === 0){
                alert('인원 및 좌석을 선택해주세요')
              }
              else {
          
                openModalHandler();
              }
            }}
          >
            <RightCircleFilled
            style={{
              fontSize: "60px",
							top: "10px",
              left: "23px",
              position: "absolute",
            }}
          	/>
            <p>결제하기</p>
          </MovieSeat>
          {isOpen && <PaymentModal closeModal={openModalHandler} />}
        </>
      ) : (
        <MovieSeat onClick={goSeat}>
          <RightCircleFilled style={{ fontSize: "60px", top: "10px", left: "23px", position: "absolute"}}/>
          <p>
						좌석선택
					</p>
        </MovieSeat>
      )}
    </TicketWrapper>
  );
};

const TicketWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 996px;
  height: 128px;
  background-color: #1d1d1c;
  color: white;
`;

const TicketStep = styled.div`
  margin: 0 auto;
  width: 996px;
  height: 108px;
  padding-top: 10px;
  padding-left: 150px;
  position: relative;
  left: ${(props) => (props.seatPage === true ? "100px" : "0px")};
`;

const MoviePoster = styled.div`
  width: 180px;
  float: left;
  height: 108px;
  padding-right: 2px;
  padding-left: 20px;
  position: relative;
  color: #cccccc;
  font-size: 12px;
  font-weight: bold;
  border-right: 1px solid grey;
`;
const Poster = styled.span`
  float: left;
  width: 74px;
  height: 108px;
  line-height: 108px;
  margin-right: 11px;
  overflow: hidden;
`;
const Title = styled.div`
  margin-top: 14px;
  color: white;
`;
const MovieTheater = styled.div`
  width: 150px;
  float: left;
  height: 108px;
  padding-left: 20px;
  border-right: 1px solid grey;
  font-weight: bold;

  position: relative;
  color: #cccccc;
  font-size: 12px;
`;

const MovieChoice = styled.div`
  overflow: hidden;
  position: absolute;
  top: 10px;
  left: 100px;
  width: 106px;
  height: 108px;
  cursor: pointer;
  margin-left: 180px;
  p {
    position: absolute;
    bottom: -10px;
    left: 23px;
    font-weight: bold;
  }
`;
const SeatMore = styled.div`
  width: 240px;
  float: left;
  height: 108px;
  padding-right: 2px;
  border-right: 1px solid grey;
  font-weight: bold;
  position: relative;
  color: #cccccc;
  font-size: 12px;
  padding-left: 10px;
`;
const Seat = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const PriceTag = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const MovieSeat = styled.div`
  overflow: hidden;
  position: absolute;
  top: 10px;
  right: 300px;
  width: 106px;
  height: 108px;
  cursor: pointer;

  p {
    position: absolute;
    bottom: -10px;
    left: 23px;
    font-weight: bold;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: inline;
`;
const Name = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;

const Date = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const Screen = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;

export default TicketState;
