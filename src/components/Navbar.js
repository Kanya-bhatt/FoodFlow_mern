import React, {useState, Component} from 'react'
import Badge from 'react-bootstrap/esm/Badge';
import Model from '../Model'
import Cart from '../Cart'
import { useCart } from './ContextReducer';


import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {
  let data = useCart();

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate('/login');

  }

  return (
    <div>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            </ul>
        </div>
        </div>
        </nav> */}

      <nav className="navbar navbar-expand-lg navbar-scroll shadow-0" style={{ backgroundColor: "#006367" }}>
        <div className="container">
          <Link className="navbar-brand" to="/">Go Food</Link>
          <button className="navbar-toggler ps-0" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="d-flex justify-content-start align-items-center">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/"> My Orders </Link>
                </li>
                : ""

              }
            </ul>

            {(!localStorage.getItem("authToken")) ?

              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>

              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                  myCart {" "}
                  <Badge pill bg = 'btn bg-danger text-white mx-2'> {data.length}  </Badge>
                </div>
                {cartView? < Model onClose={()=>setCartView(false)}> <Cart /> </Model>:null}{/*if true display model, jab my cart click hoga tab the value of cartView will be true*/} 
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout

                </div>
              </div>

            }
            {/* <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <Link className="nav-link pe-3" to="/">
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ps-3" to="/">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </div>
  )
}