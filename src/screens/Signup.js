import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer.js';
export default function Signup() {
    const [credentials, setcredentials] = useState({ studentId: "", name: "", semester: "", email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentId: credentials.studentId,
                name: credentials.name,
                semester: credentials.semester,
                email: credentials.email,
                password: credentials.password
            })
        });

        const json = await response.json()//body se response mila hai

        if (!json.success) {//value is true
            console.log(json);
            alert("enter valid credentials")
        }
        document.location.reload();
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })//state ki value update kar rhe hai with the value
    }
    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center">
                <div className="card" style={{ width: '70%', marginTop: '50px' }}>
                    <div className="card-body">
                        <h3 className="card-title text-center"><b>SignUp Here</b></h3>
                        {/* event, hitting an end point*/}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="studentId" className="form-label">Student Id</label>
                                <input type="text" className="form-control" name='studentId' value={credentials.studentId} onChange={onChange} />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />

                            </div>

                            <div className="mb-3">
                                <label htmlFor="semester" className="form-label">Semester</label>
                                <input type="text" className="form-control" name='semester' value={credentials.semester} onChange={onChange} />

                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
                            </div>

                            <button type="submit" className="m-3 btn" style={{ backgroundColor: '#6BB7BB', color: '#006367', padding: '8px 15px', borderRadius: '5px' }}>Submit</button>
                            <Link to="/login" className='m-3 btn' style={{ backgroundColor: '#006367', color: '#6BB7BB', padding: '8px 15px', borderRadius: '5px' }}>Already a user?</Link>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
