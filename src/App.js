import './App.css';
import Admin_Home from './admin/Admin_Home.js';
import Home from './screens/Home'
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import MyOrder from './screens/MyOrder.js';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer';
import QRcode from './components/QRcode';
import Client_OrderDetails from './components/Client_OrderDetails'
import AdminLogin from './admin/Admin_Login'
import Introduction from './components/Introduction'
import CustomerList from './components/CustomerList'
import DisplayOrders from './admin/DisplayOrders'

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/qrcode" element={<QRcode />} />
            <Route exact path="/adminHome" element={<Admin_Home />} />
            <Route exact path="/clientOrder" element={<Client_OrderDetails />} />
            <Route exact path="/adminlogin" element={<AdminLogin />} />
            <Route exact path="/intropage" element={<Introduction />} />
            <Route exact path="/customerList" element={<CustomerList />} />
            <Route exact path="/displayOrders" element={<DisplayOrders />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
