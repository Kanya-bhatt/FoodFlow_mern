// eslint-disable-next-line
import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-scroll shadow-0" style={{ backgroundColor: "#006367" }}>
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/adminlogin">Food Flow</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    </div>
                </div>
            </nav>
        </div>
    );
}