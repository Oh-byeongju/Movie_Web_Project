import {
  SELECT_THEATER_REQUEST,
  SELECT_DAY_REQUEST,
  SELECT_MOVIETHEATER_TO_DAY_REQUEST,
  SELECT_THEATER_TO_MOVIE_REQUEST,
  SELECT_DAYMOVIE_TO_THEATER_REQUEST,
  SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
  MOVIE_DATA,
  THEATER_DATA,
  DAY_DATA,
  SCHEDULE_DATA,
  PAYMENT_REQUEST,
  RESERVE_LOGIN_PAGE,
} from "../../reducer/R_ticket";
import { useDispatch ,useSelector} from "react-redux";

  export function f1(data, dispatch) {
  dispatch({
    type: SELECT_THEATER_REQUEST,
    data: data.movie.id, //mid
  });
  dispatch({
    type: SELECT_DAY_REQUEST,
    data: data.movie.id, //,mid
  });
  dispatch({
    type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
    data: {
      mid: data.movie.id,
      tid: data.theater.tid,
    },
  });
  dispatch({
    type: SELECT_THEATER_TO_MOVIE_REQUEST,
    data: data.theater.tid, //tid
  });
  dispatch({
    //영화+날짜
    type: SELECT_DAYMOVIE_TO_THEATER_REQUEST,
    data: {
      miday: data.Day.miday,
      mid: data.movie.id,
    },
  });
  dispatch({
    type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
    data: {
      miday: data.Day.miday,
      tid: data.theater.tid,
    },
  });
  dispatch({
    type: MOVIE_DATA,
    data: data.movie,
  });
  dispatch({
    type: THEATER_DATA,
    data: data.theater,
  });
  dispatch({
    type: DAY_DATA,
    data: data.Day,
  });
  dispatch({
    type: SCHEDULE_DATA,
    data: data.schedule,
  });
}
//주문번호 만들기
export function createOrderNum() {
  
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let orderNum = year + month + day;
  for (let i = 0; i < 10; i++) {
    orderNum += Math.floor(Math.random() * 8);
  }
  return orderNum;
}

export function paymentCard(data, dispatch, uid, choiceSeat, miid,아이,학생,어른) {
  // 모바일로 결제시 이동페이지
  var IMP = window.IMP;
  
  IMP.init("imp57612323");

  IMP.request_pay(
    {
      // param
      pg: "html5_inicis",
      pay_method: data.payMethod,
      merchant_uid: data.orderNum,
      name: data.name,
      amount: data.amount,
      buyer_email: data.buyer_email,
      buyer_name: data.buyer_name,
      buyer_tel: data.phone,
      buyer_addr: data.buyerAddr,
      m_redirect_url: "/",
    },
    function (rsp) {
      // callback
      if (rsp.success) {
        alert(JSON.stringify(rsp));
        // 결제 성공 시 로직,
        data.impUid = rsp.imp_uid;
        data.merchant_uid = rsp.merchant_uid;
        data.uid = uid;
        data.amount = rsp.paid_amount;
        let people = "";
        if(아이 !==0 ){
          people += "아이 "+Object.values({아이})+"명, "
        }
        if(학생 !==0 ){
          people += "학생 "+Object.values({학생})+"명, "
        }
        if(어른 !==0 ){
          people += "어른 "+Object.values({어른})+"명, "
        }
        console.log(people);
        let seatnumber = "";
        choiceSeat.map((seat) => (seatnumber += seat.seat_id + ","));
        data.sid = seatnumber;
        data.miid = miid;
        data.people = people;
        data.ticket= 아이+학생+어른;
        paymentComplete(data, dispatch);
      } else {
        // 결제 실패 시 로직,
      }
    }
  );
}

export function paymentComplete(data, dispatch) {
  dispatch({
    type: PAYMENT_REQUEST,
    data: data,
  });
}
