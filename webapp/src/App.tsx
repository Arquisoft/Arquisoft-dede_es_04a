import React, { useState } from 'react';
import {ReactSession} from 'react-client-session';
import './App.css';

import { ToastContainer } from 'react-toastify';

import Login from './components/Users/Login';
import Productos from './components/Productos/Productos';
import Register from './components/Users/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AniadirProducto from './components/Productos/AniadirProducto';

import 'react-toastify/dist/ReactToastify.css'
import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';

ReactSession.setStoreType("localStorage");
ReactSession.set("username",undefined)

const App = ():JSX.Element => {
  return (
  <BrowserRouter>
      <Navbar/> 
      <div className='container'>
        <Routes>
          <Route path="/" element={<Productos />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/addProduct" element={<AniadirProducto />}></Route>
          <Route path="*" element={
            <main style={{ padding: "1rem" }}>
              <h1>This URL dont exist</h1>
            </main>}></Route>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App;
