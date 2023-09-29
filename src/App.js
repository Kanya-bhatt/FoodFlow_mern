import './App.css';
import Home from './screens/Home.js';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import MyOrder from './screens/MyOrder.js';
import React from 'react';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer';
import QRcode from './components/QRcode';
import QRReader from './components/QRCodeReader';
function App() {
  return (//in tis return you can only put a single div
  //here are trying to achieve single page application
  //to globally access
  <CartProvider>
  <Router>
    
    <div>
      <Routes>
        <Route exact path= "/" element={<Home/>}/>
        <Route exact path= "/login" element={<Login/>}/>
        <Route exact path= "/createuser" element={<Signup/>}/>
        <Route exact path= "/myOrder" element={<MyOrder/>}/>
        <Route exact path= "/qrcode" element={<QRcode/>}/>
        <Route exact path= "/qrreader" element={<QRReader/>}/>
      </Routes>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
