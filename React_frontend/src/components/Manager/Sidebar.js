import React,{useState} from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Cinema from "./Cinema";
import Theater from "./Theater";
import Movie from "./Movie";
const { Header, Content, Footer, Sider } = Layout;

const Sidebar = () =>{
    const items = [
        {
            label: '영화관 관리',
            key: 'theater',
        },
        {
            label: '상영관 관리',
            key: 'cinema',
        }
        
    ]

    const [current, setCurrent] = useState("theater");
    const onClick = (e) => {
      console.log(e.key);
      setCurrent(e.key);
    };

    return(
        <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items}
           onClick={onClick}
          />
        </Sider>
        <Layout>
          
          <Content
            style={{
            }}
          >
            <div
              style={{
                minHeight: 360,
              }}
            >
                {current==="theater"
?              <Cinema /> : 
             <Theater />}
            </div>
          </Content>
     
        </Layout>
      </Layout>
    )
    }
    export default Sidebar;