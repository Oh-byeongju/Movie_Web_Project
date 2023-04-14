import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as Payment from "../Common_components/Function";
import seat, { CHECK_SEAT_REQUEST } from "../../reducer/seat";
import { Login } from "@mui/icons-material";
const PaymentModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { movieData, theaterData, DayData, scheduleData, payment_done } = useSelector(
    (state) => state.ticket
  );
  const {  아이, 학생, 어른, choiceSeat, price ,check_seat_error} = useSelector(
    (state) => state.seat
  );
  const { LOGIN_data } = useSelector((state) => state.R_user_login);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  
  // 체크박스 true / false 변경
  const ClickCheck1 = (check1) => {
    setCheck1(!check1);
  };
  const ClickCheck2 = (check2) => {
    setCheck2(!check2);
  };
  const ClickCheck3 = (check3) => {
    setCheck3(!check3);
  };
  const ClickCheck4 = (check4) => {
    setCheck4(!check4);
  };

  const onClickPayment = () => {

    const date = new window.Date().getTime();

    const data = {
      pg: "html5_inicis.INIpayTest", //pg사
      payMethod: "card", //결제수단
      oderNum: Payment.createOrderNum(), //주문번호
      name: movieData.title, //결제이름
      buyerEmail: "", //구매자 이메일
      buyerName: LOGIN_data.uname, //구매자 이름
      buyerTel: "010-1234-1234", //구매자 번호
      buyerAddr: "부산광역시 ", //구매자 주소
      amount:price, 
    };
    Payment.paymentCard(
      data,
      dispatch,
      LOGIN_data.uid,
      choiceSeat,
      scheduleData.miid
      ,아이,학생,어른
    );
    
  };
  return (
    <Container>
      <Background>
        <ModalBlock>
          <HeadModal>
            <TitleArea>
              <h4>예매내역 확인</h4>
            </TitleArea>
          </HeadModal>
          <BodyModal>
            <ReserveInfo>
              <h5>
                예매정보
                <span>결제하시기 전 예매내역을 다시 한번 확인해주세요</span>
              </h5>
              <Content>
                <Poster>
                  <img src={`${movieData.imagepath}`}></img>
                </Poster>
                <Table>
                  <caption>예매정보</caption>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <th>영화명</th>
                      <td>{movieData.title}</td>
                    </tr>
                    <tr>
                      <th>극장</th>
                      <td>
                        {theaterData.tarea} &nbsp;
                        {theaterData.tname}점
                      </td>
                    </tr>
                    <tr>
                      <th>상영관</th>
                      <td>
                        {scheduleData.type} &nbsp;{scheduleData.name}
                      </td>
                    </tr>
                    <tr>
                      <th>일시</th>
                      <td>
                        {scheduleData.miday}&nbsp;&nbsp;
                        {scheduleData.mistarttime.substring(11, 16)}~
                        {scheduleData.miendtime.substring(11,16)}
                      </td>
                    </tr>
                    <tr>
                      <th>인원</th>
                      <td>
                        {아이 === 0 ? "" : <>아이 {아이}명 </>}
                        {학생 === 0 ? "" : <>학생 {학생}명 </>}
                        {어른 === 0 ? "" : <>어른 {어른}명 </>}
                      </td>
                    </tr>
                    <tr>
                      <th>좌석</th>
                      <td>
                        {choiceSeat.map((seat) => {
                          return <>{seat.location}&nbsp;</>;
                        })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Content>
            </ReserveInfo>
            <PaymentInfo>
              <h5>
                결제 정보
                <span>결제하기 버튼을 클릭하시면 결제가 완료됩니다.</span>
              </h5>
              <InfoTable>
                <caption>결제정보</caption>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>결제금액</th>
                    <td>
                    {price}원
                    </td>
                  </tr>
                  <tr>
                    <th>결제수단</th>
                    <td>
카드                    </td>
                  </tr>
                </tbody>
              </InfoTable>
            </PaymentInfo>
            <Agreement>
              <PaymentAgreement>
                <AllCheck>
                  <input
                    type="checkbox"
                    name="agree1"
                    id="agree1"
                    value={check1}
                    onClick={() => ClickCheck1(check1)}
                  />
                  <label htmlFor="agree1">
                    결제대행서비스 약관에 모두 동의
                  </label>
                </AllCheck>
                <AllCheck>
                  <input
                    type="checkbox"
                    name="agree2"
                    id="agree2"
                    value={check2}
                    onClick={() => ClickCheck2(check2)}
                  />
                  <label htmlFor="agree2">전자금융거래 이용약관</label>
                </AllCheck>
                <AllCheck>
                  <input
                    type="checkbox"
                    name="agree3"
                    id="agree3"
                    value={check3}
                    onClick={() => ClickCheck3(check3)}
                  />
                  <label htmlFor="agree3">개인정보 수집 이용약관</label>
                </AllCheck>
              </PaymentAgreement>
              <PaymentAgreement>
                <AllCheck>
                  <input
                    type="checkbox"
                    name="agree4"
                    id="agree4"
                    value={check4}
                    onClick={() => ClickCheck4(check4)}
                  />
                  <label htmlFor="agree4">상기 내용을 모두 확인했습니다.</label>
                </AllCheck>
              </PaymentAgreement>
            </Agreement>

            <Reserve onClick={() => {
                  if(check1&&check2&&check3&&check4){
                let seatnumber = " ";
                choiceSeat.map((seat) => (seatnumber += seat.seat_id + ", ")); //레디스
                console.log(seatnumber)
                dispatch({
                  type: CHECK_SEAT_REQUEST,
                  data: {
                    user:LOGIN_data.uid,
                    name:scheduleData.miid,
                    age: seatnumber,
                  },
                });
                if(check_seat_error===null){
                onClickPayment()
                }
              closeModal()
            }
          else{
            alert('모든 약관에 동의하세요')
          }}
              
              
              }>결제하기</Reserve>
            <FAIL onClick={()=>closeModal()}>취소</FAIL>
          </BodyModal>
        </ModalBlock>
      </Background>
    </Container>
  );
};
export default PaymentModal;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`;

const ModalBlock = styled.div`
  position: absolute;
  top: 3rem;
  left: 15rem;
  background-color: white;
  color: black;
  width: 62rem;
  height: 37rem;
  box-shadow: 1px 1px 1px 1px gray;
`;
const HeadModal = styled.div`
  position: relative;
  bottom: 29px;

  width: 100%;
  border-bottom: 4px solid #333;
  height: 3rem !important;
  background-color: #333 !important;
  padding-top: 0 !important;
  padding-left: 0 !important;
  margin-bottom: 0 !important;
`;
const TitleArea = styled.div`
  display: block;
  h4 {
    float: none !important;
    width: auto !important;
    margin-right: 0 !important;
    background: none !important;
    color: #f2f0e5;

    border: 1px solid #707070;
    height: 35px !important;
    padding-top: 14px;
    padding-left: 20px;
    font-family: Nanum Gothic, 나눔고딕, Apple SD Gothic Neo, AppleGothic, 돋움,
      dotum, Sans-serif;
    font-size: 22px;
    line-height: 22px;
    letter-spacing: -1px;
  }
`;

const BodyModal = styled.div`
  position: relative;
  margin: 0 auto;
  bottom: 2rem;
  padding: 40px 40px 20px 40px;
  overflow: hidden;
  background-color: #f6f6f4;
  height: 81%;
`;
const ReserveInfo = styled.div`
  width: 452px;
  height: 257px;
  float: left;
  overflow: hidden;
  border-top: solid 2px #bebebd;
  h5 {
    display: block;
    height: 35px;
    line-height: 38px;
    margin: 0 0;
    font-size: 18px;
    padding: 0 0;
    padding-left: 23px;
    border-bottom: solid 1px #bebebd;
  }
  span {
    font-size: 12px;
    padding-left: 20px;
  }
`;
const Content = styled.div`
  padding: 20px 0 40px 0;
  overflow: hidden;
`;
const Poster = styled.div`
  float: left;
  width: 110px;
  height: 158px;
  line-height: 158px;
  margin-right: 19px;
  overflow: hidden;
  img {
    width: 100px;
    height: 158px;
  }
`;
const Table = styled.table`
  border: none;
  table-layout: fixed;
  caption {
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
  }
  tr {
    height: 24px;
    line-height: 24px;

    th {
      width: 52px;
      font-weight: normal;
      text-align: left;
    }
    td {
      width: 271px;
      font-weight: bold;
      height: inherit;
      line-height: inherit;
      background: none;
    }
  }
`;
const PaymentInfo = styled.div`
  width: 454px;
  height: 257px;
  float: left;
  overflow: hidden;
  border-left: solid 1px #bebebd;
  border-top: solid 2px #bebebd;

  h5 {
    display: block;
    height: 35px;
    line-height: 38px;
    margin: 0 0;
    padding: 0 0;
    padding-left: 23px;
    border-bottom: solid 1px #bebebd;
    font-size: 18px;
  }
  span {
    font-size: 12px;
    padding-left: 20px;
  }
`;
const InfoTable = styled.table`
  margin-top: 20px;
  margin-left: 20px;
  width: 434px;
  border: none;
  margin-bottom: 10px;
  caption {
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
  }
  tr {
    height: 24px;
    line-height: 24px;
    vertical-align: top;
    th {
      width: 58px;
      font-weight: normal;
    }
    .amount {
      line-height: 22px;
      color: #c62424;
      font-size: 16px;
      font-family: Verdana;
      font-weight: bold;
    }
    td {
      width: 376px;
      height: inherit;
      line-height: inherit;        
      font-weight: bold;
      background: none;
      span {
      }
    }
  }
`;
const Agreement = styled.div`
  border-top: 1px solid rgb(204, 204, 204);
  padding-top: 15px;
  float: left;
  width: 100%;
  margin-top: 16px;
  padding-bottom: 19px;
  height: 90px;
  line-height: 13px;
  text-align: center;
  text-align: left;
`;
const PaymentAgreement = styled.div`
  float: left;
  width: 46.6%;
  height: 100%;
  padding-left: 3%;
  border-right: 1px solid rgb(204, 204, 204);
  text-align: left;
`;

const AllCheck = styled.span`
  display: block;
  width: 410px;
  min-height: 15px;
  margin: 0px 0px 10px;
`;

const Reserve = styled.button`
  position: relative;
  left: 20rem;
  top: 2rem;
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
const FAIL = styled.button`
  position: relative;
  left: 22rem;
  top: 2rem;

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

  color: #6e6e6e;
`;
