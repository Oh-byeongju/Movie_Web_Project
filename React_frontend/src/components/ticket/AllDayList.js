import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  ALLDAY_REQUEST,
  SELECT_DAY_TO_MOVIE_REQUEST,
  SELECT_DAY_TO_THEATER_REQUEST,
  SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
  SELECT_DAYMOVIE_TO_THEATER_REQUEST,
  DAY_DATA,
  RESET_MOVIE_DATA,
  RESET_THEATER_DATA,
  RESET_DAY_DATA,
} from "../../reducer/ticket";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";


const AllDayList = () => {

  const {
    allDay,
    selectDay,
    select_Day_done,
    select_Theater_To_Day_done,
    choiceMovie,
    choiceTheater,
    movieData,
    theaterData,
    DayData,
  } = useSelector((state) => state.ticket);
  useEffect(() => {
    dispatch({
      type: ALLDAY_REQUEST,
    });
  }, []);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  //날짜
  const [weekday, setWeekDay] = useState([
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ]);

  const dispatch = useDispatch();
  //날짜 계산

  const Weak = useRef(null);
  //월 구분을 위함 것
  const [moment, setMoment] = useState(["04", "05","06","07","07","09","10","11","12"]);
  //요일 표시 평일 검정색, 토요일 파란색, 일요일 빨간색

  //수정필요합니다.
  return (
    <Calender>
      <Header>날짜</Header>

      <DayList ticking={false}>
        {moment.map((moment, index) => {
          return (
            <div key={index}>
              
              <DaylistSector>
                {allDay.map((calendar, index) => {
                  let disableClassName = "";
                  if (select_Day_done || select_Theater_To_Day_done) {
                    disableClassName = selectDay.find(
                      (canSelectedMovie) =>
                        canSelectedMovie.miday === calendar.miday
                    )
                      ? ""
                      : "disable";
                  }
                  return (
                    <div key={calendar.miid}>
                      {moment === calendar.miday.substring(5, 7) ? (
                        <Today
                          today={calendar.miday}
                          key={calendar.miid}
                          DayData={DayData}
                          className={disableClassName}
                          onClick={() => {
                            //영화 선택
                            if (disableClassName === "disable") {
                              console.log("disable");
                              if (
                                !window.confirm(
                                  "선택한 영화에 원하시는 상영스케줄이 없습니다. 계속하겠습니까?"
                                )
                              ) {
                                return;
                              }

                              dispatch({
                                type: RESET_MOVIE_DATA,
                              });

                              dispatch({
                                type: RESET_THEATER_DATA,
                              });

                              dispatch({
                                type: RESET_DAY_DATA,
                              });
                              dispatch({
                                type: DAY_DATA,
                                data: calendar,
                              });

                              dispatch({
                                type: SELECT_DAY_TO_MOVIE_REQUEST,
                                data: calendar.miday,
                              });
                              dispatch({
                                type: SELECT_DAY_TO_THEATER_REQUEST,
                                data: calendar.miday,
                              });
                            } else if (choiceMovie && !choiceTheater) {
                              dispatch({
                                type: DAY_DATA,
                                data: calendar,
                              });
                              dispatch({
                                //영화+날짜
                                type: SELECT_DAYMOVIE_TO_THEATER_REQUEST,
                                data: {
                                  miday: calendar.miday,
                                  mid: movieData.id,
                                },
                              });
                              dispatch({
                                type: SELECT_DAY_TO_MOVIE_REQUEST,
                                data: calendar.miday,
                              });
                            }
                            //극장 선택
                            else if (!choiceMovie && choiceTheater) {
                              dispatch({
                                type: DAY_DATA,
                                data: calendar,
                              });
                              dispatch({
                                type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
                                data: {
                                  miday: calendar.miday,
                                  tid: theaterData.tid,
                                },
                              });
                              dispatch({
                                type: SELECT_DAY_TO_THEATER_REQUEST,
                                data: calendar.miday,
                              });
                            } else if (choiceMovie && choiceTheater) {
                              //둘다 클릭
                              dispatch({
                                type: DAY_DATA,
                                data: calendar,
                              });
                              dispatch({
                                //영화+날짜
                                type: SELECT_DAYMOVIE_TO_THEATER_REQUEST,
                                data: {
                                  miday: calendar.miday,
                                  mid: movieData.id,
                                },
                              });
                              dispatch({
                                type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
                                data: {
                                  miday: calendar.miday,
                                  tid: theaterData.tid,
                                },
                              });
                            } else if (!choiceMovie && !choiceTheater) {
                              dispatch({
                                type: DAY_DATA,
                                data: calendar,
                              });
                              dispatch({
                                type: SELECT_DAY_TO_MOVIE_REQUEST,
                                data: calendar.miday,
                              });
                              dispatch({
                                type: SELECT_DAY_TO_THEATER_REQUEST,
                                data: calendar.miday,
                              });
                            }
                          }}
                        >
                          <YearMonthList>
                          <span className={cn("Year")}>
                            <Year
                    id="Year"
                    format={"YYYY"}
                    ticking={false}
                    timezone={"KR/Pacific"}
                  >
                  </Year>
                  </span>
                 <span className={cn("Month")}>
                   <Month
                    format={"MMMM"}
                    ticking={false}
                    timezone={"KR/Pacific"}
                  >
                  </Month>
                </span>
              </YearMonthList>
                          <Week
                            className={cn(
                              "weak",
                              weekday[
                                new Date(`'${calendar.miday}'`).getDay()
                              ] === "토"
                                ? "Sun"
                                : "weak",
                              weekday[
                                new Date(`'${calendar.miday}'`).getDay()
                              ] === "일"
                                ? "Sat"
                                : "weak"
                            )}
                            ref={Weak}
                          >
                            {weekday[new Date(`'${calendar.miday}'`).getDay()]}
                          </Week>
                          <div className={cn("day")}>
                            <div>{calendar.miday.substring(8, 10)}</div>
                          </div>
                        </Today>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </DaylistSector>
            </div>
          );
        })}
      </DayList>
    </Calender>
  );
};
//{calendar.miday.substring(8, 10)}
const Calender = styled.div`
  display: flex;
  flex-direction: column;
  height: 528px;
  width: 91px;
  border-right: 1px solid #d8d9db;
  background-color: #f2f0e5;
  margin-left: 1px;
`;
const Header = styled.div`
  color: #222;
  position: relative;
  height: 33px;
  line-height: 33px;

  text-align: center;
  font-size: 20px;
  padding: 40px 0 0px 0px;
  font-weight: bold;
  top: -15px;
`;
const YearMonthList = styled.div`
  font-family: "SEBANG";
  font-style: italic;
  color: #1864ab;
`;
const Year = styled.div`
  font-size: 15px;
`;
const Month = styled.div`
  font-size: 30px;
`;
const DayList = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: #005096;
  float: left;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: auto;
`;
const DaylistSector = styled.ul`
  position: relative;
  left: -39px;
  top: -10px;
  cursor: pointer;
  list-style-type: none;
  .Sun {
    color: red !important;
  }
  .Sat {
    color: blue !important;
  }

  .weak {
    font-family: "Nanum Myeongjo";
    font-size: 0.8em;
    align-items: center; //수직 중앙 정렬
    justify-content: center; //수평 중앙 정렬
    color: black;
    text-align: center;
  }
  .day {
    font-weight: bold;
  }
  .disable {
    div {
      cursor: default;
      opacity: 0.5;
    }
  }
`;
const Today = styled.li`
  padding-bottom: 10px;
  width: 73px;
  display: flex;
  float: left;

  background-color: ${(props) =>
    props.today === props.DayData.miday ? "gainsboro" : "#f2f0e5"};
`;
const Week = styled.div`
  padding-left: 20px;
  padding-right: 5px;
  position: relative;
  top: 3px;
`;

export default AllDayList;
