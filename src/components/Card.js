import React from 'react'

export default function Card(props) {

  let options = props.options;
  let priceOptions = Object.keys(options)//to display keys


  return (
    <div>
        <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img className="card-img-top" src={props.imageSrc} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.foodName}</h5>
            <p className="card-text">{props.des}</p>
            <div className="container w-100">
              <select className="m-3 h-100 bg-success rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-3 h-100 bg-success rounded">
                {priceOptions.map((item)=>{
                  return <option key = {item} value = {item}>{item}</option>
                })}
              </select>

              <div className="d-inline h-100 fs-5">
                Total Price
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
