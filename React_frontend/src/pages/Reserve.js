import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TicketMovieList from "../components/Ticket/TicketMovieList";
import TicketTheaterList from "../components/Ticket/TicketTheaterList";
import TicketDayList from "../components/Ticket/TicketDayList";
import TicketSchedule from "../components/Ticket/TicketSchedule";
import TicketState from "../components/Ticket/TicketState";
import TopButton from "../components/Ticket/TopButton";
import Seat from "../components/Ticket/Seat";
import PaymentComplete from "../components/Ticket/PaymentComplete";
import { TICKET_PAGE_RESET } from "../reducer/R_ticket";
import { SEAT_PAGE_RESET } from "../reducer/R_seat";
import { useSelector, useDispatch } from "react-redux";

const Reserve = () => {
  const dispatch = useDispatch();
	// 결제완료 리덕스 상태
  const { PAYMENT_done } = useSelector((state)=> state.R_ticket);

  // 예매 페이지 탈출 시 리덕스 초기화를 위한 useEffect
  useEffect(() => {
    return () => {
      dispatch({
				type: TICKET_PAGE_RESET
			});

			dispatch({
				type: SEAT_PAGE_RESET
			});
    };
  }, [dispatch]);

  // 좌석 컴포넌트로 바꾸는 useState
  const [seatPage, setSeatPage] = useState(false);

  return (
    <Container>
      <TopButton/>
      {PAYMENT_done ? <PaymentComplete /> : seatPage ? <Seat/> : 
        <BookinWrapper>
          <TicketMovieList />
          <TicketTheaterList/>
          <TicketDayList />
          <TicketSchedule />
        </BookinWrapper> 
      }
      {PAYMENT_done ? null : <TicketState seatPage={seatPage} setSeatPage={setSeatPage}/>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background: #fff;
`;

const BookinWrapper = styled.div`
  display: flex;
	padding: 0;
  width: 1110px;
  margin : 0 auto;
  box-sizing: border-box; 
	padding-left: 10px;
`;

export default Reserve;
