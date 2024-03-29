// import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import app from './firebase';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar, Login, Signup } from './components';
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <UserAuthContextProvider>
              <Routes>
                <Route exact path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Signup" element={<Signup />} />
                <Route exact path="/exchanges" element={<ProtectedRoute><Exchanges /></ProtectedRoute>} />
                <Route exact path="/cryptocurrencies" element={<ProtectedRoute><Cryptocurrencies /></ProtectedRoute>} />
                <Route exact path="/crypto/:coinId" element={<ProtectedRoute><CryptoDetails /></ProtectedRoute>} />
                <Route exact path="/news" element={<News />} />
              </Routes>
            </UserAuthContextProvider>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2022
            <Link to="/">
              Cryptomate Inc.
            </Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
