import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import Welcome from './components/Welcome';
import Login from './components/Users/Login';
import Productos from './components/Productos/Productos';
import Register from './components/Users/Register';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import 'react-toastify/dist/ReactToastify.css'
import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Welcome message="" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/products" element={<Productos />}></Route>
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
