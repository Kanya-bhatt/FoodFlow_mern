import React, { useEffect, useState } from 'react'


function DisplayOrders(props) {
    const [matchingItems, setMatchingItems] = useState([]);
    const isMatched = (id) => {
        if(id === props.id){
            return true;
        }
        return false;
    }
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/displayOrders", {
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
    
    useEffect(()=> {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(matchingItems);
    }, [matchingItems]);


    return (
        <div>
            
            {Object.keys(matchingItems).length !== 0 ? matchingItems.map((item, index) => (
                <div key={index}>
                    {/* Conditionally render email */}
                    {isMatched(item._id) ? (
                        <div class="card text-center">
                        <div class="card-header">
                            item.email
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        <div class="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                    ) : null}
                </div>
            )) : ""}
        </div>
    )
}

export default DisplayOrders