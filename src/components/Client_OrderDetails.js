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
            setMatchingItems(data[0]);
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
                    {isMatched(item.email) ? (
                        <div>
                            <QrCode id = {item._id} />
                        </div>
                    ) : null}
                </div>
            )) : ""}
    </div>
  )
}