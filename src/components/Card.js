import React, { useState, useRef, useEffect } from 'react'
import {useDispatchCart, useCart} from './ContextReducer'
import Badge from 'react-bootstrap/Badge';
export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart()

  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);//to display keys

  //below 2 - for setting default values 
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        // console.log("Size different so simply ADD one more to the list")
        return
      }
      return

    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })


  }
/*Context API allows data to be passed through a 
component tree without having to pass props manually at every leve*/
//using props - we can only go to child but if want to go below multiple levels we use context.

let finalPrice = qty * parseInt(options[size]);
useEffect(()=>{
  setSize(priceRef.current.value)
}, [])

  return (
    <div>
        <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img className="card-img-top" src={props.foodItem.img} alt="..."style={{height: "140px", objectFit: "fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">{props.des}</p>
            <div className="container w-100">
              <select className="m-3 h-100 bg-success rounded" onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-3 h-100 bg-success rounded" ref = {priceRef} onChange={(e)=> setSize(e.target.value)}>{/*ref is for default value of price*/}
                {priceOptions.map((item)=>{
                  return <option key = {item} value = {item}>{item}</option>
                })}
              </select>

              <div className="d-inline h-100 fs-5 ml-3">
                rs. {finalPrice}/-
              </div>
            </div>
            <hr></hr>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}> Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
