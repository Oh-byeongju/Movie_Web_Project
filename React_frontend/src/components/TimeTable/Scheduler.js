import React, { useEffect ,useState} from "react";
import styled from "styled-components";
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import { THEATER_DATAS ,AREA_DATAS,MOVIE_REQUEST,DAY_REQUEST ,MOVIE_DATAS} from "../../reducer/TimeTable";
import { useDispatch, useSelector } from "react-redux";
import {
    ALLTHEATER_REQUEST,
  } from "../../reducer/ticket";
import {
  T_ALLMOVIE_REQUEST,
} from "../../reducer/ticket";
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import Time from "./Time";
import MovieSchedule from "./MovieSchedule";
import TheaterSchedule from "./TheaterSchedule";
const Scheduler = () =>{
    const dispatch = useDispatch();
    const { movie,theater,area,allMovie,city} =useSelector((state)=>state.TimeTable)
    const { LOGIN_data } = useSelector((state) => state.R_user_login);

    let 서울 =0;
    let 경기= 0;
    let 인천 =0;
    let 부산 =0;
    const areaData=["서울", "경기", "인천", "부산"]
    const {
        allTheater
      } = useSelector((state) => state.ticket);
    const [ tab, setTab] = useState(1);
    const tabClick= (index)=>
    {
        setTab(index);
    }
    const [ tab2, setTab2] = useState("서울");
    const tabClick2= (index)=>
      {
          setTab2(index);
      }

    useEffect(()=>{
        dispatch({
            type: MOVIE_REQUEST,
            data:{
            uid: LOGIN_data.uid,
            button:"sort",
            search:""
    }});  
       
        dispatch({
                type:AREA_DATAS,
                data:"서울"
            })
        dispatch({
            type:THEATER_DATAS,
            data:1
        })
    },[]) 
   
    allTheater.map((t)=>{
        if(t.tarea==="서울"){
            서울++;
        }
        else if(t.tarea==="경기"){
            경기++;
        }
        else if(t.tarea==="인천"){
            인천++;
        }
        else{
            부산++;
        }
    })
  
  
    return(
        <TimeTableWrapper>
            <TimeTablePage>
                <MovieAreaChoice>  
                    <TabLeft>
                        <ul>
                            <li onClick={()=>tabClick(1)}
                            className={1==tab?"hover tab" : "tab"}
                            key={1}
                            ><a><i><MovieOutlinedIcon   style={{width:'40px' ,height:'40px'}}/></i>영화별</a></li>
                            <li onClick={()=>tabClick(2)}
                             key={2}
                            className={2==tab?"hover tab" : "tab"}
                                                    ><a><i><CoPresentOutlinedIcon style={{width:'40px' ,height:'40px'}} /></i>극장별</a></li>
                            
                        </ul>
                        </TabLeft> 

                        <TabCenter>
                            {tab===1? 
                            <MovieWrapper>
                            <ListSection>
                                <ScrollBar>
                                    <MovieContainer>
                                            <ul>
                                                {allMovie.map((num)=>
                                                
                                                <Movies
                                                    key={num.id}
                                                    movie={num.id}
                                                    movieData={movie}
                                                    >
                                                    <button onClick={()=>{
                                                        dispatch({
                                                            type:MOVIE_DATAS,
                                                            data:num
                                                        })
                                                      
                                                    }}>  {num.title}</button>
                                                  </Movies>)}
                                            </ul>
                                    </MovieContainer>
                                </ScrollBar>
                            </ListSection>
                            <Poster>
                                <Table> 
                                <img src={`${movie.imagepath}`} style={{width:"100%" ,height:"100%"}}/>
                    
                                </Table>
                            </Poster>
                        </MovieWrapper>
                        
                        : 
                        <TheaterWrapper>
        <Wrapper>
        <ListChoice>
            <ul>
                <li onClick={()=>tabClick2("서울")}
                className={tab2==="서울" ? "tab menu"  : tab2}>서울({서울})</li>
                <li onClick={()=>tabClick2("경기")}
                 className={tab2==="경기" ? "tab menu"  : tab2}>경기({경기})</li>
                <li onClick={()=>tabClick2("인천")}
                 className={tab2==="인천" ? "tab menu"  : tab2}>인천({인천})</li>
                <li onClick={()=>tabClick2("부산")}
                 className={tab2==="부산" ? "tab menu"  : tab2}>부산({부산})</li>
            </ul>
        </ListChoice>
        <ListSectionT>
            <ScrollBarT>
                <TheaterContainer>
                    <ul>
                       {tab2==="서울" ? <>{allTheater.map((t)=>{
                            if(t.tarea===tab2){
                                서울++
                                return(
                                    <TheaterLi onClick={()=>{
                                        dispatch({
                                            type:THEATER_DATAS,
                                            data:t.tid
                                        })
                                    }
                                    }
                                    city={city}
                                    cityName={t.tid}
                                    >
                                        {t.tname}
                                    </TheaterLi>
                                )
                            }
                       })}</> : ""}
                       {tab2==="경기" ? <>{allTheater.map((t)=>{
                            if(t.tarea===tab2){
                                경기++
                                return(
                                    <TheaterLi
                                    onClick={()=>{
                                        dispatch({
                                            type:THEATER_DATAS,
                                            data:t.tid
                                                                                })
                                    }
                                    }
                                    city={city}
                                    cityName={t.tid}
                                    >
                                        {t.tname}
                                    </TheaterLi>
                                )
                            }
                       })}</> : ""}
                       {tab2==="인천" ? <>{allTheater.map((t)=>{
                            if(t.tarea===tab2){
                                인천++
                                return(
                                    <TheaterLi
                                    onClick={()=>{
                                        dispatch({
                                            type:THEATER_DATAS,
                                            data:t.tid
                                                                                })
                                    }
                                    }
                                    city={city}
                                    cityName={t.tid}>
                                        {t.tname}
                                    </TheaterLi>
                                )
                            }
                       })}</>  : ""}
                       {tab2==="부산" ? <>{allTheater.map((t)=>{
                            if(t.tarea===tab2){
                                부산++
                                return(
                                    <TheaterLi
                                    onClick={()=>{
                                        dispatch({
                                            type:THEATER_DATAS,
                                            data:t.tid
                                                                                })
                                    }
                                    }
                                    city={city}
                                    cityName={t.tid}>
                                        {t.tname}
                                    </TheaterLi>
                                )
                            }
                       })}</> : ""}
                       </ul>
                </TheaterContainer>
            </ScrollBarT>
        </ListSectionT>
        </Wrapper>
    </TheaterWrapper>
    }
                        </TabCenter>
                </ MovieAreaChoice>
                <Time tab={tab}/>
                {tab===1? <TheaterTab>   
            <ul>

                {areaData.map((city)=>
                {
                    return(
                        <City
                        onClick={()=>{
                            tabClick(1)
                            dispatch({
                                type:AREA_DATAS,
                                data:city
                            })
                          
                        }}
                        city={city}
                        area={area}
                        >
                           <a>{city}</a>
                        </City>
                    )
                })}
                
            </ul>
        </TheaterTab> : ""}
                {tab===1?  <MovieSchedule /> : <TheaterSchedule />}
                {theater.length === 0 ?<NoTheater>
                    <div>
                    <EventBusyOutlinedIcon  style={{width: "120px", height:"120px"}}/><br />
                    해당 지역에 상영 시간표가 없습니다.<br />
다른지역을 선택해 주세요.</div> </NoTheater> : ""}
            </TimeTablePage>
        </TimeTableWrapper>
    )

}

const TimeTableWrapper = styled.div`
width:100%;
margin:0;
padding:40px 0 0 0 ;
`
const TimeTablePage = styled.div`
width: 1100px;
margin: 0 auto;
`;
const MovieAreaChoice= styled.div`
overflow: hidden;
position: relative;
width: 100%;
height: 300px;
margin: 0;
border: 3px solid #686571;
border-radius: 10px;
padding: 0;
`
const TabLeft = styled.div`
float: left;
    width: 145px;
    height: 100%;
    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
       .hover {
        background-color: #fff;
        border-right: none;
    
       }
        li{
            cursor:pointer;
            display: block;
    text-align: center;
    width: 100%;
    height: 149px;
    line-height: 150px;
    border: 1px solid #d8d9db;
    border-width: 0 1px 1px 0;
    background-color: #f2f4f5;

    a{
        display: block;
        color: #444;
        font-size: 1.2em;
        font-weight: 400;
        text-decoration: none;
        i{
            width: 39px;
    height: 32px;
    overflow: hidden;
    display: inline-block;
    margin-bottom:10px;
    margin-right:5px;
    padding: 0;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    background-position: 0 0;
    background-repeat: no-repeat;}
    }
        }
    }
`


const TheaterTab =styled.div`
position:relative;
right:40px;
width:100%;
border-bottom:30px !important;
height:36px;
padding-bottom:40px;
ul{
    list-style-type:none;
    width:100%;
    .hover {
        background-color: grey;
        border-right: none;
    
       }
    

}
`
const City = styled.li`

    cursor:pointer;
    float:left;
    width:137px;
    height:34px;
    border:1px solid #d8d9db;

    a{
        display:block;
        width:100%:
        height:34px;
        margin:0;
        padding:0;
        border:0;
        line-height:36px;
        text-align:center;
        text-decoration:none;
    
}
background-color: ${(props) =>
    props.area ===  props.city? "grey" : "white"};

`
const TabCenter = styled.div`
`


const MovieWrapper = styled.div`
position: absolute;
    left: 164px;
    top: 0;
    
    display: block;
    width: calc(100% - 164px);
    height: 300px;
    padding: 0;
`
const ListSection = styled.div`
overflow: hidden;
width:644px;
height: 240px;
padding: 20px 0;
`
const ScrollBar = styled.div`
height: 200px;
position: relative;
overflow: hidden;
height: 100%;
max-width: 100%;
outline: 0;
direction: ltr;   
max-height: none;
`
const MovieContainer = styled.div`
position: relative;
    top: 0;
    left: 0;
    overflow:auto;
    height:100%;

    ul{
        overflow: hidden;
        position: relative;
        display: block;
        min-height: 138px;
        list-style-type: none;
    margin: 0;
    padding: 0;
    
    }
`
const Movies = styled.li`
float: left;
width: 25%;
padding: 0;

background-color: ${(props) =>
    props.movieData.id === props.movie ? "gray" : "white"};
button{
    display: block;
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0 28px 0 10px;
    color: #444;
    border: 0;
    text-align: left;
    background-color: transparent;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    letter-spacing: -.5px;
    font-weight: 400;
    font-family: NanumBarunGothic,Dotum,'돋움',sans-serif;
}
`
const Poster = styled.div`
    position:absolute;
    right:0;
    top:0;
    width:206px;
    height:100%;
`
const Table =styled.div`
    display:block;
    width:100%;
    height:100%;
`

const TheaterWrapper = styled.div`
position: absolute;
    left: 164px;
    top: 0
    display: block;
    width: calc(100% - 164px);
    height: 300px;
    padding: 0;
    
`
const Wrapper = styled.div`
float: left;
    position: relative;
    width: 100%;
    height: 100%;
`
const ListSectionT = styled.div`
overflow: hidden;
height: 240px;
padding: 20px 0;
`
const ScrollBarT = styled.div`
height: 200px;
position: relative;
overflow: hidden;
height: 100%;
max-width: 100%;
outline: 0;
direction: ltr;   
max-height: none;
`
const TheaterContainer = styled.div`
position: relative;
    top: 0;
    left: 0;
    overflow:auto;
    height:100%;

    ul{
        overflow: hidden;
        position: relative;
        display: block;
        min-height: 138px;
        list-style-type: none;
    margin: 0;
    padding: 0;
    }
`
const ListChoice = styled.div`
width: 100%;
height: 54px;
border-bottom: 1px solid #d8d9db;
ul{
    position:relative;
    right:39px;
    list-style-type: none;
    padding-top:24px;
    .menu {
        border-bottom: 
        2px solid #555;
        font-weight: 400;
    }
    li{
        cursor:pointer;
        float: left;font-size: .9333em;
        margin-right: 15px;
        text-decoration: none;
        color: #555;
        border-bottom: 2px solid #fff;
        padding-bottom: 9px;
        letter-spacing: -1px;
    }
}
`
const TheaterLi=styled.li`
background-color: ${(props) =>
    props.cityName ===  props.city? "grey" : "white"};

    float: left;
    width: 25%;
    padding: 0;
    cursor:pointer;
    button{
        display: block;
        width: 100%;
        height: 50px;
        margin: 0;
        padding: 0 28px 0 10px;
        color: #444;
        border: 0;
        text-align: left;
        background-color: transparent;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        letter-spacing: -.5px;
        font-weight: 400;
        font-family: NanumBarunGothic,Dotum,'돋움',sans-serif;
    }

`
const NoTheater =styled.div`
    width:100%;
    height:200px;
    div{
        text-align:center;
        width:30%;
        position:relative;
        left:390px;
    }
`
export default Scheduler;