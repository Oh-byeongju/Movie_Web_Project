import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TicketMovieList from "../components/Ticket/TicketMovieList";
import TicketTheaterList from "../components/Ticket/TicketTheaterList";
import TicketDayList from "../components/Ticket/TicketDayList";
import TicketSchedule from "../components/Ticket/TicketSchedule";
import TicketState from "../components/Ticket/TicketState";
import TopButton from "../components/Ticket/TopButton";
import Seat from "../components/Ticket/Seat";
import { TICKET_PAGE_RESET } from "../reducer/R_ticket";
import { SEAT_PAGE_RESET } from "../reducer/R_seat";
import { useSelector, useDispatch } from "react-redux";


import Complete from "../components/Ticket/Complete";

const Reserve = () => {
  //토글
  
  const dispatch = useDispatch();
  const {payment_done} = useSelector((state)=>state.R_ticket);

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



  //좌석 페이지에 가려면 URL이 바뀌지않고 컴포넌트만 이동시켜줘야함.
  const [page, setPage] = useState(false);

  return (
    <Container>
      <TopButton />
      {
      payment_done ? <Complete /> :
      page ? (
        <Seat/>
      ) : (
        <BookinWrapper>
          <TicketMovieList />
          <TicketTheaterList/>
          <TicketDayList />
          <TicketSchedule />
          
        </BookinWrapper> 
      )}
      {payment_done? "" : 
              <TicketState setPage={setPage} page={page} />
      }
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
  width: 1180px;
  margin : 0 auto;
  box-sizing: border-box; 
	padding-left: 10px;
`;

export default Reserve;
