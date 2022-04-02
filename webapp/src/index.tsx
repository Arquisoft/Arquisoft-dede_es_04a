import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import Logout from './components/Users/Logout';
import Login from './components/Users/Login';
import Productos from './components/Productos/Productos';
import Register from './components/Users/Register';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import {ReactSession} from 'react-client-session';

import 'react-toastify/dist/ReactToastify.css'
import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';

ReactSession.setStoreType("localStorage");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Productos />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="*" element={
            <main style={{ padding: "1rem" }}>
              <h1>This URL dont exist</h1>
            </main>}></Route>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
