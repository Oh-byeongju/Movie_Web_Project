import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TopButton = () => {
  const navigate= useNavigate();

  const onReset = useCallback(() => {
    if (!window.confirm("예매 페이지를 초기화합니다.")) {
      return;
    }
    window.location.replace("/reserve");
  }, []);

  return (
    <Nav>
      <Right>
        <Schedule
        onClick={()=>
      {
        navigate('/timetable')
      }}>
          <span>상영 시간표</span>
        </Schedule>
        <Rereserve
          onClick={() => {
            onReset();
          }}
        >
          <span>예매 다시하기</span>
        </Rereserve>
      </Right>
    </Nav>
  );
};

const Nav = styled.div`
  position: relative;
  width: 1180px;
  height: 74px;
  display: block;
	margin-bottom: 10px;
`;

const Right = styled.span`
  position: relative;
  left: 90%;
  top: 30px;
`;

const Schedule = styled.button`
  position: relative;
  right: 60px;
  bottom: 10px;
  border: none;
  display: inline-block;
  padding: 15px 30px;
  border-radius: 15px;
  cursor: pointer;

  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background-color: #f8e6e0;
  color: #6e6e6e;
`;
const Rereserve = styled.button`
  position: relative;
  right: 50px;
  bottom: 10px;
  cursor: pointer;
  border: none;
  display: inline-block;
  padding: 15px 30px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background-color: #f8e6e0;
  color: #6e6e6e;
`;

export default TopButton;