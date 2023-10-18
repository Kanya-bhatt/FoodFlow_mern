import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/Admin_Navbar'
import Footer from '../components/Footer';

export default function DisplayOrders() {
  const [matchingItems, setMatchingItems] = useState([]);
  const isMatched = (email) => {
    console.log(localStorage.getItem('clickedEmail'));
    return email === localStorage.getItem('clickedEmail');
  }

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/displayOrdersHistory", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },

      });
      const data = await response.json();

      setMatchingItems(data[0]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log(matchingItems);
  }, [matchingItems]);

  return (
    <div>
      <AdminNavbar />

      <div className="d-flex justify-content-center mt-5">
        <div className="card" style={{ width: "850px" }}>
          <div className="card-body">
            <div className="navbar-brand fs-3" style={{ textAlign: 'center', marginBottom: "10px" }}><b>Order History</b></div>
            {Object.keys(matchingItems).length !== 0 ? matchingItems.map((item, index) => (
              <div key={index}>
                {isMatched(item.email) ? (
                  <div>
                    <p className="navbar-brand fs-5" style={{ textAlign: 'center' }}>Email: {item.email}</p>
                    {item.order_data && item.order_data.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {item.order_data.map((orderArray, orderIndex) => (
                          <div key={orderIndex}>
                            {orderArray.map((orderItem, subOrderIndex) => (
                              <div key={subOrderIndex}>
                                {subOrderIndex === 0 && orderItem.Order_date && (
                                  <li className="list-group-item text-center" style={{ color: 'white', backgroundColor: '#006367' }}>
                                    <b>Date:- {orderItem.Order_date}</b>
                                  </li>
                                )}
                                {orderItem.name && (
                                  <li className="list-group-item">
                                    <b>Name - </b>{orderItem.name}
                                  </li>
                                )}
                                {orderItem.size && (
                                  <li className="list-group-item">
                                    <b>Size- </b>{orderItem.size}
                                  </li>
                                )}
                                {orderItem.price && (
                                  <li className="list-group-item">
                                    <b>Price- </b>₹{orderItem.price}
                                  </li>
                                )}
                                {orderItem.qty && (
                                  <li className="list-group-item">
                                    <b>Quantity- </b>{orderItem.qty}
                                  </li>
                                )}
                                <br />
                              </div>
                            ))}
                          </div>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )) : ""}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}