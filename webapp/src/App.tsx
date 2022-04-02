import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import './App.css';

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
import AniadirProducto from './components/Productos/AniadirProducto';
import Carrito  from './components/Carrito/Carrito';
import Sidebar from './components/SideBar/Sidebar';

const App = ():JSX.Element => {
  const [show, setShow] = useState(false);

  return (
  <BrowserRouter>
      
      <Navbar handleOpen={setShow}/> 
      <div className='container'>
        <Routes>
          <Route path="/" element={<Productos />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/aniadirProducto" element={<AniadirProducto />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="*" element={
            <main style={{ padding: "1rem" }}>
              <h1>This URL dont exist</h1>
            </main>}></Route>
        </Routes>
        <ToastContainer />
      </div>
      {show && <Sidebar handleClose={setShow}/>}
    </BrowserRouter>
  )
}

export default App;
