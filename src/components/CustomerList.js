import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/Admin_Navbar'
import Footer from '../components/Footer'

export default function CustomerList() {
    const [matchingItems, setItems] = useState([]);
    const navigate = useNavigate();
    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/displayusers", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setItems(data[0]);
            console.log(matchingItems);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        console.log(matchingItems);
    }, [matchingItems]);

    const handleOrder = (email) => {
        localStorage.setItem('clickedEmail', email);
        navigate('/displayOrders');
    }
    return (

        <div>
            <AdminNavbar />
            <div className="navbar-brand fs-2" style={{ textAlign: 'center', marginTop: "10px" }}><b>Customer List</b></div>
            {Object.keys(matchingItems).length !== 0 ? matchingItems.map((item, index) => (
                <div key={index}>

                    <div className="d-flex justify-content-center mt-2">
                        <div className="card" style={{ width: "850px" }}>
                            <div className="card-body ">
                                <div className="d-flex justify-content-between align-items-center" style={{ backgroundColor: "#006367", color: "#ffffff", padding: "10px" }}>
                                    <h5 className="card-title">
                                        User {index + 1}
                                    </h5>
                                    <button className="btn me-2" style={{ backgroundColor: '#6BB7BB', color: '#006367' }} onClick={() => handleOrder(item.email)}>
                                        Order Details
                                    </button>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><b>StudentId:</b> {item.studentId}</li>
                                    <li className="list-group-item"><b>Name:</b> {item.name}</li>
                                    <li className="list-group-item"><b>Semester:</b> {item.semester}</li>
                                    <li className="list-group-item"><b>Email:</b> {item.email}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )) : ""}

            <Footer />
        </div>


    )
}