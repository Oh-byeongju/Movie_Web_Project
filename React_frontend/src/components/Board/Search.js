import React, { useEffect ,useState} from "react";
import styled from "styled-components";
import { SearchOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useParams,Link } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux"
import { BOARD_SEARCH_REQUEST } from "../../reducer/R_board";

const Search = () =>{








	// 서치부터 고치면 될듯
    const dispatch= useDispatch();
    const navigate=  useNavigate();
    const { title,target, page} = useParams();
    const {board , board_search_loading, board_search_done} = useSelector((state)=>state.R_board);
    
    const selectList = ["제목", "작성자"];
    const [Selected, setSelected] = useState("title");
    const handleSelect = (e) => {
        if(e.target.value==="제목"){
            setSelected("title");
        }
        else if(e.target.value==="작성자"){
            setSelected("name")
        }
      };
    const detailDate = (a) => {
        const milliSeconds = new Date() - a;
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const days = hours / 24;
        if (days < 7) return `${Math.floor(days)}일 전`;
        const weeks = days / 7;
        if (weeks < 5) return `${Math.floor(weeks)}주 전`;
        const months = days / 30;
        if (months < 12) return `${Math.floor(months)}개월 전`;
        const years = days / 365;
        return `${Math.floor(years)}년 전`;
    };
    const handleChange = (event, value) => {
        navigate(`/board/search/${target}/${title}/${value}`)
      };

      const onClickSearch= ()=>{
        navigate(`/Board/search/${Selected}/${text}/1`)
        //boaard/search/category/text/page
    }
    const [text, setText] = useState("");
    const onChangeText  = (e)=>{
        setText(e.target.value)
        console.log(text);
    }
    useEffect(()=>{
        dispatch({
            type:BOARD_SEARCH_REQUEST,
            data:
            {
                page:page-1,       //페이지네이션
                category:target, //검색하는 종류
                title:title,     //검색값
                
            }
        })
    },[page])
    if(board_search_loading && !board_search_done){
        return(
            <div>
                대기중...
            </div>
        )
    }
    else if (board_search_done&& !board_search_loading)
    {
    return(
        <Content>
            <SearchWrapper>
                <SearchHeader>
                    <SearchForm>
                        <SearchTitle>
                            <b>
                            {title}
                            </b>
                            에 대한 검색 결과입니다.
                        </SearchTitle>
                        <SearchOption>
                            <SearchOptionItem>
                                <label for>
                                    <select onChange={handleSelect}>
                                        {selectList.map((data)=>{
                                            return(
                                                <option>{data}</option>
                                            )
                                        })}
                                      
                                    </select>
                                </label>
                            </SearchOptionItem>
                            
                            <SearchOptionItem style={{top:'2px'}}>
                                <label for><input type="text" placeholder="검색" value={text} onChange={onChangeText}></input>
                                <button onClick={()=>onClickSearch()}><SearchOutlined style={{fontSize:'20px'}}/></button>
                                </label>

                            </SearchOptionItem>
                        </SearchOption>
                    </SearchForm>
                </SearchHeader>
            </SearchWrapper>
            <ContentWrapper>            
            {board.content.map((data)=>(
            <Link to ={`/board/content/${data.bid}/${data.btitle}`} >
            <Card >
                <Number><CaretUpOutlined twoToneColor="grey"/><div>{data.bid}</div></Number>
                <Detail><a><div><span>{data.btitle} [{data.commentCount}5]</span></div></a></Detail>
                <Item><div className="category">{data.bcategory}</div><div className="date"><span>{detailDate(new Date(data.bdate))}</span></div><div className="name">{data.uid}</div></Item>
            </Card>
            </Link>
))
}
        <Pagination count={board.totalPages} page={parseInt(page,10)} onChange={handleChange} />
        </ContentWrapper>
        </Content>
          )}
}
const Content=styled.div`
`
const SearchWrapper = styled.div`

box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
background: #fff;
`
const SearchHeader = styled.div`
    margin-top: 0;
    padding: 25px 24px 70px 30px;
    
    border-bottom: 1px solid #ebeef1;
    `
const SearchForm = styled.form`

`
const SearchTitle = styled.div`
    line-height: 23px;
    font-size: 18px;
    color: #7b858e;
    b{
        color: #1e2022;
    }
`
const SearchOption = styled.ul`
    margin-top: 16px;
    list-style-type:none;
    
`
const SearchOptionItem = styled.li`
    margin-left: 0;
    position: relative;
    float:left;
    left:-40px;
    padding-right:10px;
    select{
    width: 160px;
    box-sizing: border-box;
    border: 1px solid #dddfe4;
    border-radius: 4px;
    padding: 10px 38px 9px 15px;
    line-height: 19px;
    font-size: 16px;
    color: #1e2022;
    }
    input{
        float: left;
        border: none;
        width: 200px;
        box-sizing: border-box;
        padding: 10px 32px 9px 16px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: #ebeef1;
        line-height: 17px;
        font-size: 14px;
    }
    button{
        float: left;
        position: absolute;
        top: 0;
        right: 25px;
        margin-top: 6px;
        margin-right: 8px;
        border:none;
        }
`

const ContentWrapper = styled.div`
width:728px;
    margin-top: 0;
    border-top: 1px solid #ebeef1;
    background: #f8f9fa;
    margin-top: 8px;
    line-height: 18px;
    font-size: 14px;
    color: #7b858e;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
    a{
        text-decoration:none;
    }
`
const Card = styled.div`
position: relative;
display: table;
table-layout: fixed;
width: 100%;
min-height: 78px;
box-sizing: border-box;
border-top: 1px solid #ebeef1;
background-color: #fff;
padding: 8px 0;
`
const Number =styled.div`
width: 72px;
vertical-align: middle;
display: table-cell;
text-align: center;
`
const Detail =styled.div`
    vertical-align: middle;
    padding-top:10px;
    a{
        text-decoration: none;
    color: inherit;
    div{
        display: flex;
    overflow: auto;
    vertical-align: top;
    line-height: 15px;
    font-size: 14px;
    color: #1e2022;
    word-break: break-all;
    span{
        display: block;
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-right: 5px;
    }
    }
`
const Item = styled.div`
margin-top: 5px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-top:5px;
.category{
    float:left;
    display: inline-block;
    font-size: 14px;
    color: #98a0a7; 
    height:13px;
    line-height: 12px;
    padding-right:15px;
    border-right:1px solid #98a0a7;
}
.date{
    float:left;
    display: inline-block;
    font-size: 14px;
    color: #98a0a7;
    padding-right:15px;
    padding-left:15px;
    height:13px;
    padding-right:15px;
    line-height: 12px;
    border-right:1px solid #98a0a7;

}
.name{
    float:left;
    display: inline-block;
    font-size: 14px;
    color: #98a0a7;
    padding-right:15px;
    padding-left:15px;
    height:13px;
    padding-right:15px;
    line-height: 12px;


}
`
const Image =styled.div`
width: 93px;
padding: 0 24px 0 8px;
vertical-align: middle;
display: table-cell;
img{
    width: 93px;
    height: 60px;
    display: block;
}
`
export default Search;