import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart, useDispatchCart } from './components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate();

  const handleQr = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);
    navigate('/clientOrder');
  }

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 text-center fs-3'>The Cart is Empty!</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button className="btn" style={{ backgroundColor: '#006367', color: '#6BB7BB' }} onClick={handleQr}>Get Qr</button>
        </div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);
    let response = await fetch("http://localhost:3000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
        status: "Pending"
      })
    });
    console.log(response);
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {    //true
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text fs-4' style={{ color: '#6BB7BB' }}>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn w-50 h-50" style={{ backgroundColor: '#006367' }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>x</button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn mt-5 mx-auto' style={{ backgroundColor: '#006367', color: '#6BB7BB' }} onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
    </div>
  )
}