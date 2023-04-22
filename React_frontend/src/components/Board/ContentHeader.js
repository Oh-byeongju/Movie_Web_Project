import React, { useState } from "react";
import styled from "styled-components";
import { EditTwoTone ,FireTwoTone,StarTwoTone ,QrcodeOutlined,SearchOutlined } from "@ant-design/icons";
import { useLocation,useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

const ContentHeader =()=>{
    const {page,category, free} = useParams();
    const dispatch= useDispatch();
    const menu =[
        {icon:QrcodeOutlined, sort:'최신순', category:'all'},
        {icon:FireTwoTone, sort:'인기', category:'like'},
        {icon:StarTwoTone, sort:'TOP', category:'top'}
    ]
    const { LOGIN_data } = useSelector((state) => state.R_user_login);
    //제목과 작성자로 검색
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

      //검색값
    const [text, setText] = useState("");
    const onChangeText  = (e)=>{
        setText(e.target.value)
        console.log(text);
    }
    const navigate = useNavigate();
    const onClickIcon  =(sort )=>{
        navigate(`/board/list/${category}/${sort}/${page}`)
    }

    const onClickSearch= ()=>{
        navigate(`/Board/search/${Selected}/${text}/1`)
        //boaard/search/category/text/page
    }
 
    return (
    <ContentWrapper>
    <SubMenu>
        <SubMenuHeader
        category={category}>
            <h2>{category==="popular" ? "자유 게시판" :
                category ==="news" ?"영화 뉴스 ": 
                category ==="interview" ? "인터뷰" : 
                category ==="myinfo" ? "내 게시글" : ""
            }   </h2>
            
            { category ==="myinfo" ?"" :
            <ul className="header">
                <li
                onClick={()=>{
                    if (LOGIN_data.uid === "No_login") {
                        if (
                          !window.confirm(
                            "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
                          )
                        ) {
                          return;
                        } else {
                          navigate(`/UserLogin`,{state:'/board/write'})
                        }
                }
                else{
                    navigate('/board/write')
                }
                }}><EditTwoTone style={{fontSize:'25px' }}/></li>
                </ul>
}
{ category ==="myinfo" ?"" :

            <SubMenuFooter>
            <ul>
                {menu.map((data)=>{
                    return(
                        <Li onClick={()=>{onClickIcon(data.category)}}
                        category={data.category}
                        data={free}
                        > 
                            <a><data.icon style={{fontSize:'25px', position:'relative', top:'4px' ,paddingRight:'5px'}} twoToneColor="grey"/>{data.sort}</a>
                        </Li>
                    )
                })}
            </ul>
            
                <Search>
                    <form>
                        <select onChange={handleSelect}>
                            {selectList.map((select)=>{
                                return(
                                    <option
                                    >{select}</option>
                                )
                            })}
                                
                        </select>
                        <input type="text" placeholder="검색"value={text} onChange={onChangeText}></input>
                        <button onClick={onClickSearch}><SearchOutlined style={{fontSize:'20px'}}/></button>
                    </form>
                </Search>
            </SubMenuFooter>}
        </SubMenuHeader>
    </SubMenu>
</ContentWrapper>
    )
}

const ContentWrapper =styled.div`
    width:728px;
    `
const SubMenu =styled.div`
position: relative;
margin-bottom: 8px;
background-color: #fff;
`
const SubMenuHeader = styled.div`
padding-top: 18px;
box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);

height:${(props)=>
props.category==="myinfo"? "30px" : ""}}
padding-bottom: 17px;
h2{
    padding-left: 16px;
    font-size: 18px;
    color: #1e2022;
    font-weight: 700;
    float:left;
    position:absolute;
    top:5px;
    left:5px;
}
.header{
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 16px;
    margin-right: 16px;
    list-style-type:none;
    li{
    cursor:pointer;
    }

}
`
const SubMenuFooter = styled.div`
margin-top:70px;
padding-bottom:30px;
position:relative;
left:-10px;
ul{
    list-style-type:none; 
}
`
const Li = styled.li`
float:left;
padding-right:40px;
cursor:pointer;
color: ${(props) =>
    props.category === props.data ? "green" : ""};
`;
const Search = styled.div`
display: block;
    position: absolute;
    right: 0;
    top:0;
    bottom: 0;
    margin-right: 6px;
    margin-bottom: 6px;
    cursor:pointer;
    select{
        float: left;
        width: 82px;
        padding: 9px 0 8px 15px;
        box-sizing: border-box;
        border: 1px solid #ebeef1;
        background: #fff;
        border-radius: 4px 0 0 4px;
        line-height: 17px;
        font-size: 14px;
        color: #98a0a7;
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
    right: 0;
    margin-top: 6px;
    margin-right: 8px;
    border:none;
    cursor:pointer;
    }
    
`
export default ContentHeader;