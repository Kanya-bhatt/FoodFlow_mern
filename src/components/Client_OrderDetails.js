import React, { useState, useEffect } from 'react';
import QrCode from '../components/QRcode';


export default function Client_OrderDetails() {
    const [matchingItems, setMatchingItems] = useState([]);
    const isMatched = (email) => {
        if(email === localStorage.getItem('userEmail')){
            return true;
        }
        return false;
    }
    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/orderEmail", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                
            });
            const data = await response.json();
            // Filter items based on email comparison
            // const filteredItems = data[0].filter(item => item.email === localStorage.getItem('userEmail') && console.log(item.email));
            
            
            setMatchingItems(data[0]);
            //console.log(matchingItems);
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


  return (
    <div>

{Object.keys(matchingItems).length !== 0 ? matchingItems.map((item, index) => (
                <div key={index}>
                    {/* Conditionally render email */}
                    {isMatched(item.email) ? (
                        <div>
                            {/* <p> {item._id} </p> */}
                            <QrCode id = {item._id} />
                            {/* Render order data */}
                            
                        </div>
                    ) : null}
                </div>
            )) : ""}
    </div>
  )
}