import { useState } from 'react';
import {ReactSession} from 'react-client-session';
import './App.css';

import { ToastContainer } from 'react-toastify';

import Login from './components/Users/Login';
import Productos from './components/Productos/Productos';
import Register from './components/Users/Register';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AniadirProducto from './components/Productos/AniadirProducto';

import 'react-toastify/dist/ReactToastify.css'
import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';
import Cart from './components/Cart/Cart';
import { Item } from './shared/sharedtypes';
import Orders from './components/Order/Orders';
import Order from './components/Order/Order';
import Payment from './components/Cart/Payment';
import Address from './components/Cart/Address';
import LoggedOut from './components/Authentification/LoggedOut';
import LoggedIn from './components/Authentification/LoggedIn';
import AdminRole from './components/Authentification/AdminRole';
import { VistaProducto } from './components/Productos/VistaProducto';
import { VistaProductoDelete } from './components/Productos/VistaProductoDelete';
import { DeleteProduct } from './components/Productos/DeleteProduct';

ReactSession.setStoreType("localStorage");

const App = ():JSX.Element => {
  const [cart] = useState<Item[]>([]);
  return (
      <div className='container'>
        <Navbar products={cart}/> 
        <Routes>
          <Route path="/" element={<Productos products={cart}/>}></Route>
            <Route path="/login" element={<LoggedOut><Login /></LoggedOut>}></Route>
            <Route path="/register" element={<LoggedOut><Register /></LoggedOut>}></Route>
            <Route path="/addProduct" element={<LoggedIn><AdminRole><AniadirProducto /></AdminRole></LoggedIn>}></Route>
            <Route path="/deleteProduct" element={<LoggedIn><AdminRole><DeleteProduct /></AdminRole></LoggedIn>}></Route>
            <Route path="/cart" element={<LoggedIn><Cart products={cart}/></LoggedIn>}></Route>
            <Route path="/cart/address" element={<LoggedIn><Address/></LoggedIn>}></Route>
            <Route path="/cart/payment" element={<LoggedIn><Payment/></LoggedIn>}></Route>
            <Route path="/order/list" element={<LoggedIn><Orders/></LoggedIn>}></Route>
            <Route path="/producto/:_id" element={<VistaProducto cart={cart}/>}></Route>
            <Route path="/productoDelete/:_id" element={<VistaProductoDelete />}></Route>
            <Route path="/order/details/:id" element={<LoggedIn><Order/></LoggedIn>}></Route>
            <Route path="*" element={
              <main style={{ padding: "1rem" }}>
                <h1>Wrong URL</h1>
              </main>}></Route>
        </Routes>
        <ToastContainer />
      </div>
  )
}

export default App;
