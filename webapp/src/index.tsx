import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
    <div className='container'>
    <Routes>
      <Route path="/" element={<Welcome message=""/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
