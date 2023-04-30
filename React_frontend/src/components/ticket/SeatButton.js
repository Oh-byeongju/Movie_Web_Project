/*eslint-disable*/
/*
  23-04-30 예매 좌석 페이지 수정(오병주)
*/
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const SeatButton = ({
  seat,
  addSeats,
  totalNumber,
  selectedRows,
  is_reserved,
  removeSeats,
}) => {
  const [isChecked, setIschecked] = useState(true);
  const {
    selectinfoseat,
    choiceSeat,
    choiceUser,
    check_seat_error,
    어른,
    학생,
    아이,
  } = useSelector((state) => state.R_seat);

  useEffect(() => {
    setIschecked(true);
  }, [check_seat_error]);

  const checkedSeat = () => {
    if (어른 + 아이 + 학생 > choiceSeat.length && isChecked) {
      setIschecked((prev) => !prev);
      console.log(totalNumber);
    } else if (!isChecked) {
      setIschecked((prev) => !prev);
    }
    console.log(selectedRows);
    // // choiceSeat: state.choiceSeat.filter(
    //   (seat) => seat.seat_id !== action.data
    //   ),
  };
  return (
    <>
      <SeatNumber
        is_reserved={is_reserved} //able, disable
        isChecked={isChecked}
        seatnum={seat.id}
        sid={seat.sid}
        selectinfoseat={selectinfoseat}
        onClick={() => {
          checkedSeat();
          isChecked && !is_reserved
            ? addSeats(seat)
            : removeSeats(seat.sid);
        }}
      >
        {seat.sname}
      </SeatNumber>
    </>
  );
};

const SeatNumber = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  margin-right: ${(props) => (props.seatnum % 10 === 5 ? "40px" : "1px")};
  color: black;
  float: left;
  background-color: ${(props) =>
    props.is_reserved  ? "grey" : props.isChecked ? "lightblue" : ""};

  border: none;
  cursor: ${(props) => (props.is_reserved ? "default" : "pointer")};
`;

export default SeatButton;
