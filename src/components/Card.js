import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
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
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
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
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "380px" }}
        >
          <img className="card-img-top" src={props.foodItem.img} alt="..." style={{ height: "140px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h6 style={{ marginRight: '12px' }}>Quantity:</h6>
                <select className="h-100 rounded" style={{ backgroundColor: '#6BB7BB', color: '#364B44' }} onChange={(e) => setQty(e.target.value)}>
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <select className="m-3 h-100 rounded" style={{ backgroundColor: '#6BB7BB', color: '#364B44' }} ref={priceRef} onChange={(e) => setSize(e.target.value)}>{/*ref is for default value of price*/}
                {priceOptions.map((item) => {
                  return <option key={item} value={item}>{item}</option>
                })}
              </select>
                </div>
                <div className="container w-100 d-flex justify-content-between align-items-center">
                <div className="d-inline" style={{ fontSize: '1.2rem' }}>
                rs. {finalPrice}/-
              </div>
              </div>
            
            <hr></hr>
            <button className={'btn justify-center ms-1'} style={{ backgroundColor: '#6BB7BB', color: '#364B44' }} onClick={handleAddToCart}> Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
