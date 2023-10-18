import React, {useState} from 'react'
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
    navigate('/intropage');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#006367" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Food Flow</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') && (
                <li className="nav-item">
                  <Link className="nav-link" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {(!localStorage.getItem("authToken")) ?

              <div className='d-flex'>
                <Link className="btn me-2" style={{ backgroundColor: '#6BB7BB',color: '#006367', padding: '8px 15px', borderRadius: '5px' }} to="/login">Login</Link>
                <Link className="btn me-2" style={{ backgroundColor: '#6BB7BB',color: '#006367', padding: '8px 15px', borderRadius: '5px' }} to="/createuser">Sign Up</Link>

              </div>
              :
              <div className="d-flex">
                <div className='btn me-2' style={{ backgroundColor: '#6BB7BB', color: '#364B44' }} onClick={()=>{setCartView(true)}}>
                  MyCart {" "}
                  <Badge pill bg = 'btn bg-danger text-white mx-2'> {data.length}  </Badge>
                </div>
                {cartView? < Model onClose={()=>setCartView(false)}> <Cart /> </Model>:null}{/*if true display model, jab my cart click hoga tab the value of cartView will be true*/} 
                <div className='btn text-danger me-2' style={{ backgroundColor: '#6BB7BB' }} onClick={handleLogout}>
                  Logout
                </div>
              </div>

            }
          </div>
        </div>
      </nav>
    </div>
  )
}