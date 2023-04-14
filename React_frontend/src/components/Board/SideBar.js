import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux";
import { useLocation,useNavigate, Link, useParams } from "react-router-dom";

const SideBar = () =>{
    const menus = [
        { name: "자유 게시판", path: "popular" },
        { name: "영화 뉴스", path: "news" },
        { name: "인터뷰", path: "interview" },
      ];
      const { LOGIN_data } = useSelector((state) => state.R_user_login);
      const navigate = useNavigate();
      const {page,category, free} = useParams();
      const location = useLocation();
      const handleChange = (data)=>{
        navigate(`/board/list/${data}/all/1`)
      }
      return(
        <SideBarWrapper>
                <SideBarContent>
                    <SideBarMenu>

                      <Info>
                        <div>
                      {LOGIN_data.uid!=="No_login"?

                        <AccountInfo>
                            <User><div className="name">{LOGIN_data.uid}</div>
                                  <div className="level">레벨 2</div>
                            </User>
                            <InfoSideBar>
                                <div className="item"
                                onClick={()=>
                                {
                                    navigate(`/board/list/myinfo/all/1`)

                                }}>
                                    <a >내가 쓴 글</a>
                                </div>
                                <div className="item write"
                                onClick={()=>{
                                    navigate('board/write')
                                }}>
                                    <a>글 쓰기</a>
                                </div>
                            </InfoSideBar>
                        </AccountInfo>
                        :
                        <Login
                        onClick={()=>{
                            if (LOGIN_data.uid === "No_login") {
                                if (
                                  !window.confirm(
                                    "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
                                  )
                                ) {
                                  return;
                                } else {
                                  navigate(`/UserLogin`,{state:location})
                                }
                        }
                        }}
                        >
                            <a>로그인</a>
                        </Login>
                        }
</div>
                      </Info>
                        <Title>
                            커뮤니티
                            <ul>
                                {menus.map((data)=>
                                 <Li
                                 pathname={data.path}
                                category={category}
                                 onClick={()=>{
                                    handleChange(data.path)
                                 }}><a>{data.name}</a></Li>
                                
                                )}
                               
                            </ul>
                        </Title>
                    </SideBarMenu>
                </SideBarContent>
            </SideBarWrapper>
    )
}

const SideBarWrapper = styled.div`
    width: 250px;
    position: relative;
    left:20px;
    float:left;
    
`
const SideBarContent = styled.div`
`


const SideBarMenu = styled.div`
    border : 1px solid #ebeef1;
    padding: 9px 16px 8px;
    `

const Title =styled.div`
    padding-bottom: 8px;
    line-height: 15px;
    font-size: 12px;
    color: #7b858e;
    ul{
        list-style-type:none;
    }
`
const Li = styled.li`
line-height: 17px;
            font-size: 14px;
            color: #1e2022;
            border-radius: 4px;
            cursor:pointer;
            position:relative;
            left:-20px;
            a{
                padding:8px 12px 7px;
                display:block;
            }
            
background-color: ${(props)=>
    props.pathname === props.category ?"grey" : ""}
}
`
const Info = styled.div`
padding-bottom:20px;


`
const AccountInfo= styled.div`
padding-bottom: 16px;
`
const User = styled.div`
    float: left;
    width: calc(100% - 62px);
    margin-left: 8px;
    padding-bottom:20px;
    .name{
        line-height: 17px;
        font-size: 14px;
        font-weight: 700;
        color: #1e2022;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .level{
        margin-top: 4px;
        line-height: 15px;
        font-size: 12px;
        color: #16ae81;
    }
`
const InfoSideBar = styled.div`
    display: table;
    width: 100%;
    table-layout: fixed;
    .item{
        padding-left: 0;
        display: table-cell;
        padding-right: 4px;
        cursor:pointer;
        a{
            display: block;
            box-sizing: border-box;
            text-align: center;
            padding: 11px 0 10px;
            line-height: 17px;
            font-size: 14px;
            background: transparent;
            border-color: #46cfa7;
            color: #46cfa7;
            text-decoration: none;
            border-radius: 4px;
            border: 1px solid #46cfa7;
        }
    }
    .write{
        background-color: #46cfa7;
        border-radius: 4px;

       a{ color:white;
    }}
`
const Login= styled.div`
padding-right: 0;
padding-left: 0;
a{
    display: block;
    padding: 11px 0 10px;
    line-height: 17px;
    font-size: 14px;
    box-sizing: border-box;
    text-align: center;
    background-color: #46cfa7;
    color: #fff;
    border-radius: 4px;
    border: 1px solid #46cfa7;
}
`
export default SideBar