import { Layout, Typography, Space,Avatar,Menu, AutoComplete } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import icon from '../images/cryptocurrency.png';
import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { UserOutlined,  MenuOutlined } from '@ant-design/icons';
// import { useUserAuth } from "../context/UserAuthContext";

const Header = () => {

    // const { user} = useUserAuth();
    // console.log(user);

    return (
        <>
            <div className="logo-container"  style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo"><Link to="/">Cryptomate</Link></Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
                {/* <Menu theme="dark" style={{backgroundColor:"black"}}><Menu.Item icon={<UserOutlined />}><Link to="/dashboard">Dashboard</Link></Menu.Item></Menu>  */}
            </div>
        </>
    )
}
export default Header;