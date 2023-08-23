import React, { useEffect, useState } from 'react'
import Navbar from '/Users/kanyabhatt/Documents/goFood/mernapp/src/components/Navbar.js';
import Footer from '/Users/kanyabhatt/Documents/goFood/mernapp/src/components/Footer.js';
import Card from '/Users/kanyabhatt/Documents/goFood/mernapp/src/components/Card.js';
export default function Home() {
  //we are going to use map so that we only call card once and data is displayed
  const [search, setSearch] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async() => {
    let response = await fetch("http://localhost:3000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'appplication/json'
      }
    });
    response = await response.json();
    //after the data has been saved in setFoodItem and cat one,  we want the card component to be called
    await setFoodItem(response[0]);
    await setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])//if its loaded for the first time [] is empty(inside[] wea re adding dependency)
  //we will add dependency here which is dependent on footer








  return (
    <div>
      <div><Navbar /></div>
      <div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id="carousel">
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value = {search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?Pasta" className="d-block w-100 h-70" style={{ filter: "brightness(30%)" }} alt='...' />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?Pizza" className="d-block w-100 h-70" style={{ filter: "brightness(30%)" }} alt='...' />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?Cake" className="d-block w-100 h-70" style={{ filter: "brightness(30%)" }} alt='...' />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
      </div>
      <div className='container'>
        {
          //food category me 3 items hai
          //initially foodCat is empty array but if the value has been store
          //key used to make data distinct
          foodCat !== [] ? foodCat.map((data) => {
              return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem !== [] ? 
                foodItem.filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toString().toLocaleLowerCase()))) //jo item search kiya hai hamare items hai ki nahi
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodName = {filterItems.name}
                        options = {filterItems.options[0]}
                        imageSrc = {filterItems.img}
                        // des = {filterItems.description}
                        
                        > </Card>
                      </div>
                    )
                  })

                  : <div> no such data found </div>}
              </div>

              )
            })
            : ""



        }

   

      </div>

      <div className='fs-1'><Footer /></div>
    </div>
  )
}
