import React, { useState } from 'react'
import { Link } from "react-router-dom";
export default function Signup() {
    const [credentials, setcredentials] = useState({ studentId: "", name: "", semester: "", email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentId: credentials.studentId, name: credentials.name, semester: credentials.semester, email: credentials.email, password: credentials.password })
        });
        document.location.reload();
        const json = await response.json()//body se response mila hai
        console.log(json);
        if (!json.success) {//value is true
            alert("enter valid credentials")

        }
        



    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })//state ki value update kar rhe hai with the value
    }
    return (
        <>
            <div className='container'>
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

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
                </form>
            </div>
        </>
    )
}
