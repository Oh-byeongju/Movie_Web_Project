import React from "react";
import styled from "styled-components";
import Content from "./Content";
import ContentHeader from "./ContentHeader";
import SideBar from "./SideBar";
const BoardList = () =>{
 
    //사이드 메뉴 
    
    //관람 후기, 영화 뉴스, 인터뷰, 동영상
    //페이지 네이션
    //영화 상세 정보가 들어가야함 
    //한페이지에는 20개 최대 
    //페이지네이션해야함
    //주소는 메뉴 이름/게시판 넘버/타이틀?

    
    return(
       <BoardWrapper>
        <Header>
            <h1></h1>
        </Header>
        <ContentWrapper>
            <SideBar />
            <Card>
            <ContentHeader />

            <Content>

            </Content>
            </Card>
        </ContentWrapper>
       </BoardWrapper>
    )
}
const BoardWrapper = styled.div`
padding: 0;
  width: 1235px;
  margin : 0 auto;
  box-sizing: border-box; 
  margin-bottom: 0;

`
const Header = styled.div`
    width:100%;
    height:50px;
    border-bottom:3px solid black;

    h1{
        font-weight:1000;
        padding-left:50px;
    }
`
const ContentWrapper = styled.div`
display: flex;
width: 1060px;
padding: 50px 0px 80px;
margin: 0px auto;
flex-direction: row;
-webkit-box-pack: justify;
justify-content: space-between;

`
const Card = styled.div`
float: right;
box-sizing: border-box;
width: 728px;`

export default BoardList;