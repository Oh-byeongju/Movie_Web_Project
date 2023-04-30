/*
	사용자가 선택한 영화 및 정보를 표시해주는 컴포넌트 2023-02-13 수정완(강경목)
	23-04-29 예매 페이지 상태 컴포넌트 수정(오병주)
*/
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch,shallowEqual } from "react-redux";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";


import { useLocation, useNavigate } from "react-router-dom";
import { RESERVE_LOGIN_PAGE } from "../../reducer/R_ticket";
import PaymentModal from "./PaymentModal";

const TicketState = ({ setPage, page }) => {
	const dispatch = useDispatch();
  const navigate = useNavigate();

	// 필요한 리덕스 상태들
	const { MOVIE, THEATER, DAY, MOVIEINFO, LOGIN_data } = useSelector(
		state => ({
			MOVIE: state.R_ticket.MOVIE,
			THEATER: state.R_ticket.THEATER,
			DAY: state.R_ticket.DAY,
			MOVIEINFO: state.R_ticket.MOVIEINFO,
			LOGIN_data: state.R_user_login.LOGIN_data
		}),
		shallowEqual
	);


  const { choiceSeat, price, 어른, 아이, 학생 } = useSelector(
    (state) => state.R_seat
  );
  
  const { pathname } = useLocation();
  
  //좌석 페이지로 넘어가야함 데이터와 함께

  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  //제이쿼리 대신 선언
  //아임포트 불러오기
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

 
  return (
    <TicketWrapper>
      <TicketStep page={page}>
        {MOVIE !== "" ? (
          <MoviePoster>
            <Poster>
              <Img
                className="imggg"
                src={`${MOVIE.mimagepath}`}
                alt="영화"
              />
            </Poster>
            <Title>
              <span>{MOVIE.mtitle}</span>
            </Title>
            <Title>{MOVIE.mrating}세 관람가</Title>
          </MoviePoster>
        ) : (
          <MoviePoster>
            <Poster></Poster>
            <Title></Title>
          </MoviePoster>
        )}
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
            {choiceSeat.map((seat) => {
              return <span>&nbsp;{seat.location} </span>;
            })}
          </Seat>
          <Price>총금액 : {price}</Price>
        </SeatMore>
      </TicketStep>
      {page ? (
        <>
          <MovieChoice onClick={() => setPage(false)}>
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
              if (어른 + 아이 + 학생 > choiceSeat.length ) {
                alert("관람인원과 선택 좌석 수가 동일하지 않습니다.");
                return;
              } 
              else if( 어른 +아이+학생 ===0){
                alert('인원 및 좌석을 선택해주세요')
              }
              else {
          
                openModalHandler();
                //  paymentRecord();
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
        <MovieSeat
          onClick={() => {
            if (LOGIN_data.uid === "No_login") {
              if (
                !window.confirm(
                  "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
                )
              ) {
                return;
              } else {
                navigate(`/UserLogin`, {
                  state: {
                    pathname: pathname,

                    schedule: MOVIEINFO,
										// 여기서 예매에 필요한 값들 던져주면됨
                  },
                });
                dispatch({
                  type: RESERVE_LOGIN_PAGE,
                });
              }
            } else if (
              LOGIN_data !== "" &&
              // 여기서 예매에 필요한 값들 던져주면됨
              MOVIEINFO !== ""
            ) {
              setPage(true);
              console.log("gg");
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
          <p>좌석선택</p>
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
  left: ${(props) => (props.page === true ? "100px" : "0px")};
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
const Price = styled.div`
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