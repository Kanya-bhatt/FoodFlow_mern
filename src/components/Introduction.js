import React from 'react'

import IntroNavbar from '../components/Intro_Navbar'
import Footer from '../components/Footer'

function Introduction() {
    return (
        <div>
            <IntroNavbar />
            <div className="d-flex justify-content-center mt-5">
                <div class="card">
                    <div class="card-header text-center">
                        <h4 className='text-info mt-2'><b>Admin</b></h4>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Admins can scan Qr code, see the customers list and individual<br/> order History.</p>
                        <div style={{ textAlign: 'center' }}>
                            <a href="/adminlogin" className="btn" style={{ backgroundColor: '#6BB7BB', color: '#006367' }}><b>Login</b></a>
                        </div>
                    </div>
                </div>
                <div style={{ width: '40px' }}></div>
                <div class="card">
                    <div class="card-header text-center">
                        <h4 className='text-info mt-2'><b>User</b></h4>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Users can add items to cart, search the products, view their own<br/>
                        order history, place order and generate Qr code on order.</p>
                        <div style={{ textAlign: 'center' }}>
                            <a href="createuser" className="btn" style={{ backgroundColor: '#6BB7BB', color: '#006367' }}><b>SignUp</b></a>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
                <Footer />
            </div>
        </div>
    );
}
export default Introduction;