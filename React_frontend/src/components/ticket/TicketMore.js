import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  SELECT_SEAT_REQUEST,
  SELECT_INFOSEAT_REQUEST,
  CHECK_SEAT_REQUEST,
} from "../../reducer/seat";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { PAYMENT_REQUEST, RESERVE_LOGIN_PAGE } from "../../reducer/ticket";
import * as Payment from "../Common_components/Function";
import PaymentModal from "./PaymentModal";

const TicketMore = ({ setPage, page }) => {
  const { movieData, theaterData, DayData, scheduleData } = useSelector(
    (state) => state.ticket
  );
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  const { choiceSeat, choiceUser, price, 어른, 아이, 학생 } = useSelector(
    (state) => state.seat
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //사용자가 선택한 영화 및 정보를 표시해주는 컴포넌트 2023-02-13 수정완(강경목)
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

  //
  function paymentRecord() {
    const date = new window.Date().getTime();

    const data = {
      pg: "html5_inicis.INIpayTest", //pg사
      payMethod: "card", //결제수단
      oderNum: Payment.createOrderNum(), //주문번호
      name: "결제 테스트", //결제이름
      buyerEmail: "testemail@test.com", //구매자 이메일
      buyerName: "홍길동", //구매자 이름
      buyerTel: "010-1234-1234", //구매자 번호
      buyerAddr: "부산광역시 ", //구매자 주소
      amount: "100",
    };
    Payment.paymentCard(
      data,
      dispatch,
      LOGIN_data.uid,
      choiceSeat,
      scheduleData.miid
    );
  }
  return (
    <TicketWrapper>
      <TicketStep page={page}>
        {movieData !== "" ? (
          <MoviePoster>
            <Poster>
              <Img
                className="imggg"
                src={`${movieData.imagepath}`}
                alt="영화"
              />
            </Poster>
            <Title>
              <span>{movieData.title}</span>
            </Title>
            <Title>{movieData.rating}세 관람가</Title>
          </MoviePoster>
        ) : (
          <MoviePoster>
            <Poster></Poster>
            <Title></Title>
          </MoviePoster>
        )}
        <MovieTheater>
          {theaterData !== "" ? (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                {theaterData.tarea} {theaterData.tname}점
              </span>
            </Name>
          ) : (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Name>
          )}
          <Date>
            <span>일시</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{DayData.miday}</span>
          </Date>
          {scheduleData !== "" ? (
            <Screen>
              <span>상영관</span>&nbsp;&nbsp;&nbsp;
              <span>
                {scheduleData.type} {scheduleData.name}
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
            <ArrowCircleLeftIcon
              style={{
                width: "80px",
                height: "80px",
                left: "14px",
                position: "absolute",
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
            <ArrowCircleRightIcon
              style={{
                width: "80px",
                height: "80px",
                left: "14px",
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
                    movie: movieData,
                    theater: theaterData,
                    Day: DayData,
                    schedule: scheduleData,
                  },
                });
                dispatch({
                  type: RESERVE_LOGIN_PAGE,
                });
              }
            } else if (
              LOGIN_data !== "" &&
              movieData !== "" &&
              theaterData !== "" &&
              DayData !== "" &&
              scheduleData !== ""
            ) {
              // setPage(true);
              // dispatch({
              //   type: SELECT_SEAT_REQUEST,
              //   data: scheduleData.cid,
              // });
              // dispatch({
              //   type: SELECT_INFOSEAT_REQUEST,
              //   data: scheduleData.miid,
              // });
              setPage(true);
              console.log("gg");
            }
          }}
        >
          <ArrowCircleRightIcon
            style={{
              width: "80px",
              height: "80px",
              left: "14px",
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

export default TicketMore;
