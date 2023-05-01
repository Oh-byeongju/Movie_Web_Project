
/*
  23-04-30 ~ 23-05-01 예매 좌석 페이지 수정(오병주)
*/
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { SEAT_LIST_REQUEST, USER_CHOICE, USER_REMOVE } from "../../reducer/R_seat";
import SeatButton from "./SeatButton";
const ButtonGroup = Button.Group;

const Seat = () => {
	const dispatch = useDispatch();

	// 필요한 리덕스 상태들
	const { MOVIEINFO, SEAT_LIST, LOGIN_data, Kid, Teenager, Adult, Total, ChoiceSeat, SEAT_CHECK_error } = useSelector(
		state => ({
			MOVIEINFO: state.R_ticket.MOVIEINFO,
			SEAT_LIST: state.R_seat.SEAT_LIST,
			LOGIN_data: state.R_user_login.LOGIN_data,
			Kid: state.R_seat.Kid,
			Teenager: state.R_seat.Teenager,
			Adult: state.R_seat.Adult,
			Total: state.R_seat.Total,
			ChoiceSeat: state.R_seat.ChoiceSeat,
			SEAT_CHECK_error: state.R_seat.SEAT_CHECK_error
		}),
		shallowEqual
	);

	// 좌석 조회 useEffect
	useEffect(() => {
    if (LOGIN_data.uname !== '' && MOVIEINFO !== '') {
      dispatch ({
        type: SEAT_LIST_REQUEST,
        data: { 
					cid: MOVIEINFO.cid, 
					miid: MOVIEINFO.miid 
				},
      });
    }
  }, [LOGIN_data, MOVIEINFO, dispatch]);

	// 점유좌석에 대한 오류가 생겼을경우 초기화 해주는 useEffect
	useEffect(() => {
		if (SEAT_CHECK_error) {
			setNumKid(0);
			setNumTeenager(0);
			setNumAdult(0);
		}
	}, [SEAT_CHECK_error, dispatch]);

	// 버튼 useState
	const [numKid, setNumKid] = useState(0); // 아이
	const [numTeenager, setNumTeenager] = useState(0); // 학생
  const [numAdult, setNumAdult] = useState(0); // 성인
  
	// 성인 인원을 늘릴때
  const plusHandlerAdult = useCallback(() => {
    if (Total < 8) {
      setNumAdult((prev) => prev + 1);
      dispatch({
        type: USER_CHOICE,
				data: {
					type: "성인",
					price: 30
				}
      });
    }
		else {
			alert('1회 최대 8명까지 예약가능합니다.');
		}
  }, [Total, dispatch]);

	// 성인 인원을 줄일때
	const minusHandlerAdult = useCallback(() => {
    if (Total <= ChoiceSeat.length) {
      alert("선택한 좌석이 예매 인원 보다 많습니다.");
    } 
    else if (numAdult) {
      setNumAdult((prev) => prev - 1);
      dispatch({
        type: USER_REMOVE,
				data: {
					type: "성인",
					price: 30
				}
      });
    }
  }, [Total, numAdult, ChoiceSeat, dispatch]);
  
	// 학생 인원 늘릴때
  const plusHandlerTeenager = useCallback(() => {
    if (Total < 8) {
      setNumTeenager((prev) => prev + 1);
      dispatch({
        type: USER_CHOICE,
				data: {
					type: "학생",
					price: 20
				}
      });
    }
		else {
			alert('1회 최대 8명까지 예약가능합니다.');
		}
  }, [Total, dispatch]);

	// 학생 인원 줄일때
	const minusHandlerTeenager = useCallback(() => {
    if (Total <= ChoiceSeat.length) {
      alert("선택한 좌석이 예매 인원 보다 많습니다.");
    } 
    else if (numTeenager) {
      setNumTeenager((prev) => prev - 1);
      dispatch({
        type: USER_REMOVE,
        data: {
					type: "학생",
					price: 20
				}
      });
    }
  }, [Total, ChoiceSeat, numTeenager, dispatch]);

	// 아이 인원 늘릴때
  const plusHandlerKid = useCallback(() => {
    if (Total < 8) {
      setNumKid((prev) => prev + 1);
      dispatch({
        type: USER_CHOICE,
        data: {
					type: "아이",
					price: 10
				}
      });
    }
		else {
			alert('1회 최대 8명까지 예약가능합니다.');
		}
  }, [Total, dispatch]);

  // 아이 인원 줄일때
  const minusHandlerKid = useCallback(() => {
		if (Total <= ChoiceSeat.length) {
      alert("선택한 좌석이 예매 인원 보다 많습니다.");
    } 
    else if (numKid) {
      setNumKid((prev) => prev - 1);
      dispatch({
        type: USER_REMOVE,
        data: {
					type: "아이",
					price: 10
				}
      });
    }
  }, [Total, ChoiceSeat, numKid, dispatch]);

  return (
    <SeatWrapper>
      <SeatContent>
        <Title>
          인원 / 좌석
        </Title>
        <PersonScreen>
          <NumberOfPeople>
            <NumberContainer>
              <People>
                <span>
									아이
								</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button onClick={minusHandlerKid} disabled={Kid === 0? true : false} icon={<MinusOutlined />} style={{ width: "32px", height: "32px" }}/>
                  <Button value={numKid} style={{ width: "52px", paddingLeft: "18px" }}>
                    {numKid}
                  </Button>
                  <Button onClick={plusHandlerKid} icon={<PlusOutlined />} style={{ width: "32px", height: "32px" }}/>
                </ButtonGroup>
              </People>
              <People>
                <span>
									학생
								</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button onClick={minusHandlerTeenager} disabled={Teenager === 0? true : false} icon={<MinusOutlined />} style={{ width: "32px", height: "32px" }}/>
                  <Button value={numTeenager} style={{ width: "52px", paddingLeft: "18px" }}>
                    {numTeenager}
                  </Button>
                  <Button onClick={plusHandlerTeenager} icon={<PlusOutlined />} style={{ width: "32px", height: "32px" }}/>
                </ButtonGroup>
              </People>
              <People>
                <span>
									성인
								</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button onClick={minusHandlerAdult} disabled={Adult === 0? true : false} icon={<MinusOutlined />} style={{ width: "32px", height: "32px" }}/>
                  <Button value={numAdult} style={{ width: "52px", paddingLeft: "18px" }}>
                    {numAdult}
                  </Button>
                  <Button onClick={plusHandlerAdult} icon={<PlusOutlined />} style={{ width: "32px", height: "32px" }}/>
                </ButtonGroup>
              </People>
            </NumberContainer>
          </NumberOfPeople>
        </PersonScreen>
        <ScreenSelect>
          <Screen/>
          <SeetReserve>
            {SEAT_LIST.map((seat) => 
                <div key={seat.sid}>
                  <SeatButton seat={seat}/>
                </div>
            )}
          </SeetReserve>
        </ScreenSelect>
      </SeatContent>
    </SeatWrapper>
  );
};

const SeatWrapper = styled.div`
  display: block;
  min-height: 710px;
  width: 930px;
  height: 100%;
  padding-left: 10px;
`;

const SeatContent = styled.div`
  float: none;
  width: 100%;
  min-height: 528px;
  position: relative;
  float: left;
  height: 100%;
  margin-left: 2px;
  background-color: #f2f0e5;
  overflow: hidden;
  left: 280px;
`;

const Title = styled.div`
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  background-color: #333333;
  color: white;
  font-weight: bold;
`;

const PersonScreen = styled.div`
  position: relative;
  border-bottom: 2px solid #d4d3c9;
  display: inline-block;
  width: 100%;
`;

const NumberOfPeople = styled.div`
  width: 100%;
`;

const NumberContainer = styled.div`
  min-height: 52px;
  padding: 10px 0 10px 20px;
  background-color: #f2f4f5;
  border: 1px solid #d8d9db;
`;

const People = styled.div`
  display: block;
  float: left;
  position: relative;
  left: 200px;
  top: 10px;
  padding-right: 30px;
`;

const ScreenSelect = styled.div`
  display: flex;
  min-height: 600px;
  width: 100%;
`;

const SeetReserve = styled.div`
  width: 420px;
  height: 100%;
  padding-left: 250px;
  position: absolute;
  top: 250px;
`;

const Screen = styled.div`
  background-color: #fff;
  position: absolute;
  margin-top: 30px;
  left: 250px;
  width: 420px;
  height: 80px;
  transform: rotateX(-20deg);
  box-shadow: 0 3px 10px rgb(255 255 255 / 70%);
`;

export default Seat;
