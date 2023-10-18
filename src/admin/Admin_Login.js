import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/Admin_Navbar";
import Footer from "../components/Footer";
export default function Login() {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/loginadmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()//body se response mila hai
        console.log(json);
        if (!json.success) {//value is true
            alert("enter valid credentials")
        }

        if (json.success) {
            localStorage.setItem("adminEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken)
            console.log(localStorage.getItem("authToken"))
            navigate("/adminHome");
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })//state ki value update kar rhe hai with the value
    }
    return (
        <>
            {/* <dataContext.provider value = {{email:localStorage.getItem('adminEmail') }}> */}
            <AdminNavbar />
            <div className="d-flex justify-content-center">
                <div className="card" style={{ width: '70%', marginTop: '50px' }}>
                    <div className="card-body">
                        <h3 className="card-title text-center mb-5"><b>Login Here</b></h3>
                        {/* event, hitting an end point*/}
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
                            </div>

                            <button type="submit" className="mt-3 btn" style={{ backgroundColor: '#6BB7BB', color: '#364B44', padding: '8px 15px', borderRadius: '5px' }}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
            <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
                <Footer />
            </div>
            {/* </dataContext.provider> */}
        </>
    )
}