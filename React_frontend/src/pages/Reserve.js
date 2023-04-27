import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TicketMovieList from "../components/Ticket/TicketMovieList";


import AllDayList from "../components/Ticket/AllDayList";


import AllSchedule from "../components/Ticket/AllSchedule";
import AllTheaterList from "../components/Ticket/AllTheaterList";
import TicketMore from "../components/Ticket/TicketMore";
import TopButton from "../components/Ticket/TopButton";
import Seat from "../components/Ticket/Seat";
import { useSelector, useDispatch } from "react-redux";
import { RESET_RESERVE_PAGE } from "../reducer/R_ticket";
import Complete from "../components/Ticket/Complete";
import Loading from "../components/Common_components/Loading";

const Reserve = () => {
  //토글
  const [tabstate, setTabState] = useState({
    seoul: true,
    busan: false,
    gyeonggi: false,
    incheon: false,
  });
  const dispatch = useDispatch();
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  const {payment_done,select_theater_loading} = useSelector((state)=>state.R_ticket);
  // 영화 예매 페이지에 쓸모 없을수도 있지만 Spring boot 메소드가 겹쳐서 로그인 상태도 같이 묶어서 보냄

  //리덕스 초기화를 위한 useEffect
  //영화 검색
  //페이지 접속 시 실행
  useEffect(() => {
    return () => {
      console.log("페이지 나가니까 초기화 시키기");
      dispatch({
        type: RESET_RESERVE_PAGE,
      })
   
    };
    //페이지에서 컴포넌트가 사라질때 return()을 사용하면 실행시킬수있다 페이지 뒤로가기나 다른페이지에서 다시 올 때 사용하면 좋을거같다.
  }, [LOGIN_data.uid, dispatch]);

  //좌석 페이지에 가려면 URL이 바뀌지않고 컴포넌트만 이동시켜줘야함.
  const [page, setPage] = useState(false);
  const [completed, setCompleted] = useState(false);
  return (
    <Container>
      <TopButton />
      {select_theater_loading  ?<Loading /> : ""}
      {
      payment_done ? <Complete /> :
      page ? (
        <Seat completed= {completed} setCompleted={setCompleted}/>
      ) : (
        <BookinWrapper>
          <TicketMovieList />
          <AllTheaterList tabstate={tabstate} setTabState={setTabState} />
          <AllDayList />
          <AllSchedule />
          
        </BookinWrapper> 
      )}
      {payment_done? "" : 
              <TicketMore setPage={setPage} page={page} />
      }
    </Container>
  );
};
//예매 페이지

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
