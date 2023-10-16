import React, { useEffect, useState } from 'react'

function OrderDetails(props) {
    const {result} = props;
    const [newStatus, setNewStatus] = useState('')

    // const [orders, setOrders] = useState([])
    // useEffect(()=> {
    //     if(result)
    //     setOrders(JSON.stringify(result))
    // }, [orders])
    console.log(JSON.stringify(result))

    async function updateStatus(event){
        await fetch("http://localhost:3000/api/updateStatus", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : props.dataId,
                status : "Received"
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log(response)
            if (response) {
                setNewStatus(JSON.stringify(response))
            }
        });
    }

    return (
        <div>
            {result != null && result.map((item, index) => (
                <div key={index}>
                    <p><b>Order Details:</b></p>
                    {Object.keys(item).map((key, i) => (
                        <p key={i}>{`${key}: ${item[key]}`}</p>
                    ))}
            <hr></hr>
                </div> 
            ))}
            {result != null && <div style={{ textAlign: 'right' }}>
                <button type="button" className="btn btn-info" onClick = {updateStatus} value={newStatus}>Status Update</button>
            </div>}
            <hr style={{ width: '50%' }}></hr>
        </div>
    )
}

export default OrderDetails