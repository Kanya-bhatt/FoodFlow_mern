import React from 'react'

function OrderDetails(props) {
    const { result } = props;

    console.log(JSON.stringify(result))

    async function updateStatus(event) {
        await fetch("http://localhost:3000/api/updateStatus", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.dataId,
                status: "Received"
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log(response)
            if (response) {
                window.alert("Status Updated successfully")
                window.location.reload();
            }
        });
    }

    return (
        <div>

            {/* Conditionally render based on result length */}
            {result.length === 0 && (
                <div className='text-center m-5'>
                    <b className="display-6"> No pending order found </b>
                </div>
            )}
            {result.length !== 0 && <div className="d-flex justify-content-center mt-4">
                <div className="card" style={{ width: "850px" }}>
                    <div className="card-body">
                        <div className="navbar-brand fs-4" style={{ textAlign: 'center', marginBottom: "10px" }}><b>Current Order</b></div>

                        {/* Mapping over the result array */}
                        {result != null && result.map((item, index) => (
                            <ul className="list-group list-group-flush" key={index}>
                                <li className="list-group-item text-center mt-2" style={{ color: 'white', backgroundColor: '#006367' }}><b>Item {index + 1}</b></li>
                                {Object.keys(item).map((key, i) => (
                                    <li className="list-group-item" key={i}>
                                        <span className='card-text text-info'><b>{`${key}: `}</b></span>
                                        <strong>{item[key]}</strong>
                                    </li>
                                ))}
                            </ul>
                        ))}

                        {/* Conditional rendering based on result length */}
                        {result != null && result.length > 0 && (
                            <div className="d-flex justify-content-center mt-4">
                                <button type="button" className="btn" style={{ backgroundColor: '#6BB7BB', color: '#006367', padding: '5px 10px', borderRadius: '5px' }} onClick={updateStatus}>Update Status</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default OrderDetails