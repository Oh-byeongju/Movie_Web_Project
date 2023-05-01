/*eslint-disable*/
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link ,useNavigate} from "react-router-dom";

const Complete = ()=>{
  const { movieData, theaterData, DayData, scheduleData,payment } = useSelector(
    (state) => state.R_ticket
  );
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  const { choiceSeat, choiceUser, price, 어른, 아이, 학생 } = useSelector(
    (state) => state.seat
  );
  const navigate= useNavigate();
  const location = useLocation();
  return (
        <CompleteWrapper>
            <CompleteHead>
            <Title>
                예매완료
        </Title>

        <Content>
            <h5>예매가 완료 되었습니다.</h5>
                <Poster>
                <img src={`${movieData.imagepath}`}></img>
                </Poster>
                <Table>
                  <caption>예매정보</caption>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <th>예매번호</th>
                      <td style={{color:"red"}}>{payment}</td> 
                    
                    </tr>
                    <tr>
                      <th>영화</th>
                      <td>{movieData.title}
                      </td>
                    </tr>
                    <tr>
                      <th>극장</th>
                      <td>{theaterData.tarea}&nbsp;{theaterData.tname}점
                  </td>
                    </tr>
                    <tr>
                      <th>일시</th>
                      <td>
{scheduleData.miday}&nbsp; {scheduleData.mistarttime}                      </td>
                    </tr>
                    <tr>
                      <th>인원</th>
                      <td>
                      {아이 === 0 ? "" : <>아이 {아이}명 </>}
                        {학생 === 0 ? "" : <>학생 {학생}명 </>}
                        {어른 === 0 ? "" : <>성인 {어른}명 </>}
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
                    <tr>
                      <th>결제금액</th>
                      <td>
                        <span style={{color:'red'}}>{price}</span>원
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Check>예매확인/취소</Check>
                <Reserve onClick={()=>window.location.replace('/')}>메인 페이지</Reserve>

                <Agreement>
              <PaymentAgreement>
               예매 유의사항 
               <p>CJ ONE 포인트는 상영일 익일 적립됩니다 홈티켓 출력 시, 별도의 티켓 발권 없이 바로 입장 가능합니다<br /><br />

                그 외에는 신분증 소지 후, 티켓판매 혹은 매표소에서 티켓을 발권 받으셔야 합니다.<br /><br />
                영화 상영 스케줄은 영화관사정에 의해 변경될 수 있습니다.<br /><br />
                비회원 예매하신 경우에는 예매내역이 이메일로 발송되지 않습니다.<br />
               </p>
              </PaymentAgreement>
            </Agreement>
              </Content>
              <Food>
                <Pop><span style={{fontSize: '18px'}}>영화만 보시려구요?</span><br/>
                <span style={{fontSize:'10px'}}>온라인 구매 시, 콤보 500원 더 할인해 드립니다!</span></Pop>
                <Pop2><Img src={"img/pop/pop.jpg"} />CGV 콤보<br/> <span>8,000원</span>
                <div className="gift">선물하기</div><div className="buy">구매하기</div></Pop2>
                <Pop2><Img src={"img/pop/pop.jpg"} />나초콤보<br/> <span>10,000원</span>
                <div className="gift">선물하기</div><div className="buy">구매하기</div>
                </Pop2>
                <Pop2><Img src={"img/pop/pop.jpg"} />오징어콤보<br/> <span>12,000원</span>
                <div className="gift">선물하기</div><div className="buy">구매하기</div></Pop2>

              </Food>

            </CompleteHead>
        </CompleteWrapper>
    )
}


const CompleteWrapper= styled.div`
display: block;
  min-height: 710px;
  width: 930px;
  height: 100%;
`
const CompleteHead= styled.div`
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
`
const Title = styled.div`

  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  background-color: #333333;
  color: white;
  font-weight: bold;
`;

const Content = styled.div`
width:35rem;
  overflow: hidden;
  height:38rem;
  float:left;
  padding-left:60px;
  font-size:12px;
  h5{
    font-size :25px;
    text-align:center;
}
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
      width: 60px;
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

const Reserve = styled.button`
  position: relative;
  top: 2rem;
  cursor: pointer;
  border: none;
  display: inline-block;
  color:white;
    width:10rem;
    height:3rem;
  border-radius: 5px;
  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background-color: #392f31;
  margin-right:20px;
`;
const Check = styled.button`
position: relative;
top: 2rem;
cursor: pointer;
border: none;
display: inline-block;
width:10rem;
height:3rem;
border-radius: 5px;
font-family: "paybooc-Light", sans-serif;
box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
text-decoration: none;
font-weight: 600;
transition: 0.25s;
background-color: #800000;

color: white;
margin-right:20px;

`;


const Agreement = styled.div`
  border-top: 1px solid rgb(204, 204, 204);
  padding-top:20px;
  float: left;
  width: 100%;
  margin-top: 60px;
  padding-bottom: 19px;
  height: 90px;
  line-height: 13px;
  text-align: center;
  text-align: left;
`;
const PaymentAgreement = styled.div`
  float: left;
  width: 100%;
  height: 100%;
  padding-left: 3%;
  text-align: left;
  
  
  `;
const Food = styled.div`
  height:30rem;
  width:28%;  
  float:left;
  margin-top:5%;  
  margin-left:20px;
  border: 1px solid rgb(204, 204, 204);

`
const Pop = styled.div`

width:80%;
margin-left:1.6rem; 
height:4.95rem;
padding-top:25px;
border-bottom: 1px solid rgb(204, 204, 204);
font-weight:bold;
font-size:15px;
`
const Pop2= styled.div`
width:80%;
margin-left:1.6rem; 
height:4.95rem;
padding-top:20px;
padding-bottom:25px;
border-bottom: 1px solid rgb(204, 204, 204);
font-weight:bold;
font-size:15px;
span{
  color:red;
  width:100px;
  font-size:12px;
  float:left;
  padding-top:5px;
}
.gift{
  font-size:11px;
  margin-top:5px;
  margin-right:3px;
  padding-top:5px;
  float:left;
  width:3rem;
  height:1rem;
  border-radius:5px;
  text-align:center;
  color:#392f31;
  border: 1px solid #392f31;
}
.buy{
  font-size:11px;
  margin-top:5px;
  margin-right:3px;
  padding-top:5px;
  float:left;
  width:3rem;
  height:1rem;
  border-radius:5px;
  text-align:center;
color: red;
  border: 1px solid  red;
}
`
const Img = styled.img`
float: left;
width: 80px;
height: 80px;
line-height: 158px;
margin-right: 19px;
overflow: hidden;
`
export default Complete;