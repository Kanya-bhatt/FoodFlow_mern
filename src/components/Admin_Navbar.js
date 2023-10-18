// eslint-disable-next-line
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/intropage');
    }

    const handleQR = () => {
        navigate('/adminHome');
    }

    const handlecustomer = () => {
        console.log('hello')
        navigate('/customerList');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-scroll shadow-0" style={{ backgroundColor: "#006367" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/adminlogin">Food Flow</Link>
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
                    <div className="d-flex justify-content-end w-100">
                        {(!localStorage.getItem("authToken")) ?
                            <div>
                            </div>
                            :
                            <div className='d-flex'>
                                <div className='btn me-2' style={{ backgroundColor: '#6BB7BB', color: '#006367', padding: '5px 10px', borderRadius: '5px' }} onClick={handleQR}>
                                    QrcodeReader
                                </div>

                                <div className='btn me-2' style={{ backgroundColor: '#6BB7BB',color: '#006367', padding: '5px 10px', borderRadius: '5px' }} onClick={handlecustomer}>
                                    customerList
                                </div>

                                <div className='btn text-danger me-2' style={{ backgroundColor: '#6BB7BB', padding: '5px 10px', borderRadius: '5px' }}onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}