import React from "react";
import ContentLoading from "../components/Board/ContentLoading";
import ContentPost from "../components/Board/ContentPost";
import ContentComment from "../components/Board/ContentComment";
import { useSelector, shallowEqual } from "react-redux"

const BoardPost = () => {

	// 필요한 리덕스 상태들
	const { BOARD_CONTENT_loading, BOARD_CONTENT_done } = useSelector(
		state => ({
			
			BOARD_CONTENT_loading: state.R_board.BOARD_CONTENT_loading,
			BOARD_CONTENT_done: state.R_board.BOARD_CONTENT_done,
		}),
		shallowEqual
	);

	// 내일 로딩창 부터 하는데 포스트에 있는걸 여기로 끌어와서 쓸지 고민해봐야함 useEffect

	return (
		<>
			{BOARD_CONTENT_loading && <ContentLoading/>}
			
			<ContentPost/>
			<ContentComment/>
		</>
	);
};

export default BoardPost;