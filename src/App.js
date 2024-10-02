import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space, Avatar } from 'antd';
import app from './firebase';
import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Login, Signup, Mobile, Dashboard, Navbar, Header } from './components';
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import icon from './images/cryptocurrency.png';
import './App.css';

const App = () => {
  const { Content, Sider} = Layout;
  return (
    <div className="app">
      <Layout>
        <div className="header">
          <Header />
        </div>
        <Layout style={{paddingTop:90}}>
          {/* <Sider className="site-layout-background"> */}
            <div className="navbar">
              <Navbar />
            </div>
          {/* </Sider> */}
          <div className="main">
            <Layout style={{minHeight:'90vh' ,paddingLeft:220, paddingBottom:80}}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                }}
              >
                <div className="routes">
                  <UserAuthContextProvider>
                    <Routes>
                      <Route exact path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                      <Route exact path="/Login" element={<Login />} />
                      <Route exact path="/Login/mobile" element={<Mobile />} />
                      <Route exact path="/Signup" element={<Signup />} />
                      <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route exact path="/exchanges" element={<ProtectedRoute><Exchanges /></ProtectedRoute>} />
                      <Route exact path="/cryptocurrencies" element={<ProtectedRoute><Cryptocurrencies /></ProtectedRoute>} />
                      <Route exact path="/crypto/:coinId" element={<ProtectedRoute><CryptoDetails /></ProtectedRoute>} />
                      <Route exact path="/news" element={<News />} />
                      <Route exact path="/header" element={<Header />} />
                    </Routes>
                  </UserAuthContextProvider>
                </div>
              </Content>
              </Layout>
              <Layout>
                <div className="footer" style={{height:80,position: 'fixed',bottom: 0}}>
                  <Typography.Title level={5} style={{ paddingLeft:'20vh',color: 'white', textAlign: 'center'}}>Copyright © 2022 &nbsp;
                    <Link to="/">
                      Cryptomate
                    </Link> <br />
                    All Rights Reserved
                  </Typography.Title>
                </div>
              </Layout>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
