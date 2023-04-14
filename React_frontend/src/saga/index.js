import { all, fork } from "redux-saga/effects";
import S_user_join from "./S_user_join";
import ticketSaga from "./ticket";
import S_user_login from "./S_user_login";
import movieSaga from "./movie";
import S_user_movie from "./S_user_movie";
import seatSaga from "./seat";
import timeTableSaga from "./TimeTable";
import S_mypage_movie from "./S_mypage_movie";
import BoardSaga from "./Board";
import S_mypage_reserve from "./S_mypage_reserve";
import S_manager_user from "./S_manager_user";
import S_manager_theater from "./S_manager_theater";
import S_manager_movieinfo from "./S_manager_movieinfo";
import S_manager_board from "./S_manager_board";

//사가 파일 추가 시 rootSaga 안에 fork해주면 됨
export default function* rootSaga() {
  yield all([
    fork(S_user_join),
    fork(ticketSaga),
    fork(S_user_login),
    fork(movieSaga),
    fork(S_user_movie),
    fork(seatSaga),
    fork(timeTableSaga),
    fork(S_mypage_movie),
    fork(BoardSaga),
    fork(S_mypage_reserve),
    fork(S_manager_user),
    fork(S_manager_theater),
    fork(S_manager_movieinfo),
    fork(S_manager_board)
  ]);
}
