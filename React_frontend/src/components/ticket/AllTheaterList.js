import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  ALLTHEATER_REQUEST,
  SELECT_THEATER_TO_MOVIE_REQUEST,
  SELECT_MOVIETHEATER_TO_DAY_REQUEST,
  SELECT_THEATER_TO_DAY_REQUEST,
  SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
  SELECT_DAY_TO_THEATER_REQUEST,
  THEATER_DATA,
  RESET_MOVIE_DATA,
  RESET_DAY_DATA,
  RESET_THEATER_DATA,
  SELECT_THEATER_REQUEST,
} from "../../reducer/ticket";
//극장을 표시해주는 컴포넌트 2023-02-13 수정완(강경목)

const AllTheaterList = ({ tabstate, setTabState }) => {
  const dispatch = useDispatch();
  //밑에 4개는 카운트를 위한 변수
  let seoul = 0;
  let busan = 0;
  let gyeonggi = 0;
  let incheon = 0;
  let ableseoul = 0;
  let ablebusan = 0;
  let ablegyeonggi = 0;
  let ableincheon = 0;

  //토글을 위한 훅
  const [isWideTab, setIsWideTab] = useState(false);
  //메뉴 토클을 위한 함수
  const tabHandler = (e) => {
    if (isWideTab) {
      setIsWideTab(!isWideTab);
    }
    const newTabState = { ...tabstate };
    const activeTab = e.currentTarget.id;
    for (let key in newTabState) {
      key === activeTab
        ? (newTabState[key] = true)
        : (newTabState[key] = false);
    }
    setTabState(newTabState);
  };
  //기본적으로 alltheater에 모든 극장 데이터를 담음
  const {
    allTheater,
    choiceMovie,
    choiceDay,
    theaterData,
    movieData,
    DayData,
  } = useSelector((state) => state.ticket);
  //able된것들 클릭하기
  const location = useLocation();
  useEffect(() => {
    //새로고침 감지하는 if문
    if (location.state === null) {
      dispatch({
        type: ALLTHEATER_REQUEST,
      });
    }
    //기본적으로 페이지를 나가거나 첫 불러오기시 데이터를 다
    return () => {
      dispatch({
        type: ALLTHEATER_REQUEST,
      });
    };
  }, []);
  const onClickAble = (data) => {
    //기본
    dispatch({
      type: THEATER_DATA,
      data: data,
    });

    //영화만 선택
    if (choiceMovie && !choiceDay) {
      console.log("영화만 선택");
      dispatch({
        type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
        data: {
          mid: movieData.id,
          tid: data.tid,
        },
      });
      dispatch({
        type: SELECT_THEATER_TO_MOVIE_REQUEST,
        data: data.tid,
      });
    }
    //날짜 선택 후 극장 클릭
    else if (choiceDay && !choiceMovie) {
      console.log("날짜만선택");
      //이상황은 날짜 클릭 후 극장 클릭
      dispatch({
        type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
        data: {
          miday: DayData.miday,
          tid: data.tid,
        },
      });
      dispatch({
        type: SELECT_THEATER_TO_DAY_REQUEST,
        data: data.tid,
      });
      //극장 클릭 시 극장ㅎ도 함께 바꿔줘야함
      dispatch({
        type: SELECT_DAY_TO_THEATER_REQUEST,
        data: DayData.miday,
      });
    }
    //두개 다 검색완
    else if (choiceDay && choiceMovie) {
      console.log("둘다");
      dispatch({
        type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
        data: {
          miday: DayData.miday,
          tid: data.tid,
        },
      });
      dispatch({
        type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
        data: {
          mid: movieData.id,
          tid: data.tid,
        },
      });
    }
  };

  const onClickDisalbe = (data) => {
    if (
      !window.confirm(
        "선택한 영화에 원하시는 상영스케줄이 없습니다. 계속하겠습니까?"
      )
    ) {
      return;
    }
    dispatch({
      type: THEATER_DATA,
      data: data,
    });
    dispatch({
      type: RESET_MOVIE_DATA,
    });
    dispatch({
      type: RESET_DAY_DATA,
    });
    dispatch({
      type: ALLTHEATER_REQUEST,
    });
    dispatch({
      type: SELECT_THEATER_TO_MOVIE_REQUEST,
      data: data.tid,
    });
    dispatch({
      type: SELECT_THEATER_TO_DAY_REQUEST,
      data: data.tid,
    });
  };
  return (
    <TheatersWrapper>
      <TheatersTitle>
        <p>극장</p>
      </TheatersTitle>
      <TheatersSelector>
        <TheatersSelectorText>전체</TheatersSelectorText>
      </TheatersSelector>
      <TheatersRegionWrapper>
        <TheatersListWrapper>
          <TheaterList>
            <TheaterAreaListSeoul
              id="seoul"
              seoul={tabstate.seoul}
              onClick={tabHandler}
            >
              <a>서울</a>
              <ALLTHEATERLISTSEOUL
                className="all_theater"
                seoul={tabstate.seoul}
              >
                <CONENTSCROLL className="content_scroll">
                  {allTheater.map((mv, index) => {
                    if (mv.tarea === "서울") {
                      seoul++;
                      //count를 위해 만듬
                      if (mv.able === "disable") {
                        ableseoul++;
                      }
                      if (tabstate.seoul) {
                        if (mv.able === "able") {
                          //영화나 날짜를 클릭해서 able이 된 상태
                          //영화가 클릭이 되어있으면 movietheater_to_day로 날짜 검색, 영화 데이터도 동시에 바꿔줘야함
                          // 날자가 클릭되어있으면 theaterday_to_movie로 영화검색, 극장클릭시 날짜도 같이 토글 극장에 맞게
                          //두개다 클릭이 되어있으면 날짜로 영화 데이터 검색

                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              onClick={() => {
                                onClickAble(mv);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else if (mv.able === "disable") {
                          return (
                            //disable된거를 클릭하면은 극장으로 처음부터 다시 검색해야함
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              style={{ opacity: 0.5 }}
                              onClick={() => {
                                onClickDisalbe(mv);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else {
                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              onClick={() => {
                                //alltheater 상태(첫 상태)
                                //극장으로 영화 검색 가능
                                //극장으로 날짜 검색 추가해야함★★★★★★
                                dispatch({
                                  type: THEATER_DATA,
                                  data: mv,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_DAY_REQUEST,
                                  data: mv.tid,
                                });
                                //theater로 day 검색
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        }
                      }
                    }
                  })}
                </CONENTSCROLL>
              </ALLTHEATERLISTSEOUL>
              ({seoul - ableseoul})
            </TheaterAreaListSeoul>

            <TheaterAreaListGyonggi
              id="gyeonggi"
              gyeonggi={tabstate.gyeonggi}
              onClick={tabHandler}
            >
              <a>경기</a>
              <ALLTHEATERLISTGyonggi
                className="all_theater"
                gyeonggi={tabstate.gyeonggi}
              >
                <CONENTSCROLL className="content_scroll">
                  {allTheater.map((mv, index) => {
                    if (mv.tarea === "경기") {
                      gyeonggi++;
                      //count를 위해 만듬
                      if (mv.able === "disable") {
                        ablegyeonggi++;
                      }
                      if (tabstate.gyeonggi) {
                        if (mv.able === "able") {
                          //영화나 날짜를 클릭해서 able이 된 상태
                          //영화가 클릭이 되어있으면 movietheater_to_day로 날짜 검색, 영화 데이터도 동시에 바꿔줘야함
                          // 날자가 클릭되어있으면 theaterday_to_movie로 영화검색, 극장클릭시 날짜도 같이 토글 극장에 맞게
                          //두개다 클릭이 되어있으면 날짜로 영화 데이터 검색

                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              onClick={() => {
                                onClickAble(mv);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else if (mv.able === "disable") {
                          return (
                            //disable된거를 클릭하면은 극장으로 처음부터 다시 검색해야함
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              style={{ opacity: 0.5 }}
                              onClick={() => {
                                onClickDisalbe(mv);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else {
                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              onClick={() => {
                                //alltheater 상태(첫 상태)
                                //극장으로 영화 검색 가능
                                //극장으로 날짜 검색 추가해야함★★★★★★
                                dispatch({
                                  type: THEATER_DATA,
                                  data: mv,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_DAY_REQUEST,
                                  data: mv.tid,
                                });
                                //theater로 day 검색
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        }
                      }
                    }
                  })}
                </CONENTSCROLL>
              </ALLTHEATERLISTGyonggi>
              ({gyeonggi - ablegyeonggi})
            </TheaterAreaListGyonggi>

            <TheaterAreaListIncheon
              id="incheon"
              incheon={tabstate.incheon}
              onClick={tabHandler}
            >
              <a>인천</a>
              <ALLTHEATERLISTIncheon
                className="all_theater"
                incheon={tabstate.incheon}
              >
                <CONENTSCROLL className="content_scroll">
                  {allTheater.map((mv, index) => {
                    if (mv.tarea === "인천") {
                      incheon++;
                      //count를 위해 만듬
                      if (mv.able === "disable") {
                        ableincheon++;
                      }
                      if (tabstate.incheon) {
                        if (mv.able === "able") {
                          //영화나 날짜를 클릭해서 able이 된 상태
                          //영화가 클릭이 되어있으면 movietheater_to_day로 날짜 검색, 영화 데이터도 동시에 바꿔줘야함
                          // 날자가 클릭되어있으면 theaterday_to_movie로 영화검색, 극장클릭시 날짜도 같이 토글 극장에 맞게
                          //두개다 클릭이 되어있으면 날짜로 영화 데이터 검색
                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              onClick={() => {
                                onClickAble(mv);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else if (mv.able === "disable") {
                          return (
                            //disable된거를 클릭하면은 극장으로 처음부터 다시 검색해야함
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              style={{ opacity: 0.5 }}
                              onClick={() => {
                                onClickDisalbe(mv);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else {
                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              onClick={() => {
                                //alltheater 상태(첫 상태)
                                //극장으로 영화 검색 가능
                                //극장으로 날짜 검색 추가해야함★★★★★★
                                dispatch({
                                  type: THEATER_DATA,
                                  data: mv,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_DAY_REQUEST,
                                  data: mv.tid,
                                });
                                //theater로 day 검색
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        }
                      }
                    }
                  })}
                </CONENTSCROLL>
              </ALLTHEATERLISTIncheon>
              ({incheon - ableincheon})
            </TheaterAreaListIncheon>

            <TheaterAreaListBusan
              id="busan"
              busan={tabstate.busan}
              onClick={tabHandler}
            >
              <a>부산</a>
              <ALLTHEATERLISTBUSAN
                className="all_theater"
                busan={tabstate.busan}
              >
                <CONENTSCROLL className="content_scroll">
                  {allTheater.map((mv, index) => {
                    if (mv.tarea === "부산") {
                      busan++;
                      if (mv.able === "disable") {
                        ablebusan++;
                      }
                      if (tabstate.busan) {
                        if (mv.able === "able") {
                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              onClick={() => {
                                onClickAble(mv);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else if (mv.able === "disable") {
                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              style={{ opacity: 0.5 }}
                              onClick={() => {
                                onClickDisalbe(mv);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else {
                          return (
                            <Theater
                              theaterData={theaterData}
                              t={mv.tid}
                              key={mv.tid}
                              onClick={() => {
                                //alltheater 상태(첫 상태)
                                //극장으로 영화 검색 가능
                                //극장으로 날짜 검색 추가해야함★★★★★★
                                dispatch({
                                  type: THEATER_DATA,
                                  data: mv,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_DAY_REQUEST,
                                  data: mv.tid,
                                });
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        }
                      }
                    } else {
                      return <></>;
                    }
                  })}
                </CONENTSCROLL>
              </ALLTHEATERLISTBUSAN>
              ({busan - ablebusan})
            </TheaterAreaListBusan>
          </TheaterList>
        </TheatersListWrapper>
      </TheatersRegionWrapper>
    </TheatersWrapper>
  );
};

const TheatersWrapper = styled.div`
  width: 265px;
  position: relative;
  float: left;
  height: 528px;
  margin-left: 2px;
  background-color: #f2f0e5;
  overflow: hidden;
  padding-right: 120px;
`;

const TheatersTitle = styled.div`
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

const TheatersSelector = styled.div`
  padding: 18px;
  > div {
    border: 1px solid #d8d9db;
    border-bottom: none;
    height: 35px;
    font-size: 16px;
    text-align: center;
    margin-top: 10;
    padding-top: 6px;
  }
`;

const TheatersListWrapper = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 323px;
  margin-top: 3px;
`;
const TheaterList = styled.ul`
  position: relative;
  float: left;
  width: 100%;
  height: 323px;
  margin-top: 3px;
`;
const TheaterAreaListSeoul = styled.li`
  clear: both;
  overflow: hidden;
  float: left;
  width: 109px;
  cursor: pointer;
  height: 31px;
  font-size: 14px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) =>
    props.seoul === true ? "gainsboro" : "#f2f0e5"};
`;
const TheaterAreaListGyonggi = styled.li`
  clear: both;
  overflow: hidden;
  cursor: pointer;
  float: left;
  width: 109px;
  height: 31px;
  font-size: 14px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) =>
    props.gyeonggi === true ? "gainsboro" : "#f2f0e5"};
`;
const TheaterAreaListIncheon = styled.li`
  clear: both;
  overflow: hidden;
  cursor: pointer;
  float: left;
  width: 109px;
  height: 31px;
  font-size: 14px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) =>
    props.incheon === true ? "gainsboro" : "#f2f0e5"};
`;

const TheaterAreaListBusan = styled.li`
  clear: both;
  overflow: hidden;
  cursor: pointer;
  float: left;
  width: 109px;
  height: 31px;
  font-size: 14px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) =>
    props.busan === true ? "gainsboro" : "#f2f0e5"};
`;

const ALLTHEATERLISTSEOUL = styled.div`
  position: absolute;
  top: 0;
  left: 110px;
  cursor: pointer;
  width: 160px;
  height: 100%;
  font-weight: bold;
  display: ${(props) => (props.seoul === true ? "block" : "none")};
`;
const ALLTHEATERLISTGyonggi = styled.div`
  position: absolute;
  font-weight: bold;
  top: 0;
  cursor: pointer;
  left: 110px;
  width: 160px;
  height: 100%;
  display: ${(props) => (props.gyeonggi === true ? "block" : "none")};
`;
const ALLTHEATERLISTIncheon = styled.div`
  position: absolute;
  font-weight: bold;
  top: 0;
  cursor: pointer;
  left: 110px;
  width: 160px;
  height: 100%;
  display: ${(props) => (props.incheon === true ? "block" : "none")};
`;
const ALLTHEATERLISTBUSAN = styled.div`
  position: absolute;
  font-weight: bold;
  top: 0;
  cursor: pointer;
  left: 110px;
  width: 160px;
  height: 100%;
  display: ${(props) => (props.busan === true ? "block" : "none")};
`;

const CONENTSCROLL = styled.ul`
  overflow-x: hidden;

  li {
    list-style-type: none;
  }
`;
const TheatersRegionWrapper = styled.div`
  display: flex;
`;

const TheatersSelectorText = styled.div`
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
const Theater = styled.li`
  background-color: ${(props) =>
    props.theaterData.tid === props.t ? "gray" : "#f2f0e5"};
  color: ${(props) =>
    props.theaterData.tid === props.t ? "white" : "#333333"};
`;

export default AllTheaterList;
