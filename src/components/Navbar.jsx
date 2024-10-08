import React, { useState, useEffect } from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { UserOutlined, HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';
import { useUserAuth } from "../context/UserAuthContext";

const Navbar = () => {
  
  // const { user} = useUserAuth();
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  
  return (
    <div className="nav-container">
      <div>
        {/* <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo"><Link to="/">Cryptomate</Link></Typography.Title> */}
        {/* <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button> */}
      </div>
      {activeMenu && (
        <Menu theme="dark" style={{backgroundColor:"rgb(1, 4, 28)" , width:230, height:"100vh"}}>
          
          <Menu.Item icon={<UserOutlined />}>
            <Link to="/dashboard">User</Link>
          </Menu.Item>
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
