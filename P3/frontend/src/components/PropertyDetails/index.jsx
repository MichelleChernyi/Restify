import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import Header from "../Common/Header";
import Comment from "./Comment";
import './style.css'
import axios from 'axios';

function PropertyDetails(props) {
    const {id} = useParams()
    const [property, setProperty] = useState()
    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    const [price, setPrice] = useState()
    const [tax, setTax] = useState()
    const [total, setTotal] = useState()
    const [numDays, setNumDays] = useState()
    const [comments, setComments] = useState()
    
    useEffect(()=>{
        console.log(id)
        fetch(`http://localhost:8000/properties/search/?id=${id}`)
          .then(response => response.json())
          .then(body => {
            // console.log(body)
            setProperty(...body['results'])
            })
        }, [])

    useEffect(()=>{
      fetch(`http://localhost:8000/properties/${id}/comments/`)
        .then(response => response.json())
        .then(body => {
          // console.log(body)
          setComments([...body.results])
          })
      console.log(comments)
      }, [])

    useEffect(() => {
        setPrice(0)
        if (checkIn !== undefined && checkOut !== undefined) {
            setNumDays((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24))
            let days = (new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24)
            let priceTemp = days * property.price
            let taxTemp = priceTemp * 0.13
            let totalTemp = priceTemp + taxTemp
            setPrice(priceTemp)
            setTax(taxTemp)
            setTotal(totalTemp)
        }

    }, [checkIn, checkOut])

    return (
        <>
            <Header/>
            {property && <main className="property-main">
        <h1 className="">
            {property.title}
        </h1>
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={property.images[0]} className="d-block carousel-img w-100" alt="..."/>
                </div>
                {property.images.slice(1).map((item, index) => (
                    <div className="carousel-item">
                    <img className="d-block carousel-img w-100" src={item} key={index}/>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        <div className="container ms-0 mt-5 p-0 property-details">
          <div className="row">
            <div className="col-8 p-0">
              <div className="container border-bottom pb-2 pe-2">
                <div className="row border-bottom">
                  <div className="col d-flex ">
                    <div className="d-flex flex-column">
                      <h3 className="">
                        Stay hosted by {property.owner_details[0]}
                      </h3>
                      <p className=" mb-0">
                        {property.num_guests} guests • {property.num_bed} bedrooms • {property.num_bath} bathrooms
                      </p>
                    </div>
                    <img src={property.owner_details[2]} id="host" className="img-fluid ms-auto" alt="Avatar"/> 
                  </div>
                
                </div>
                <div className="row mt-3 border-bottom">
                  <div className="col">
                    <p>
                    {property.description}
                  </p>
                  </div>
                </div>
                {comments !== undefined && <div className="row mt-3 border-bottom">
                  
                  <h4>Comments</h4>
                  {/* <Comment comment={comments[0]} /> */}
                  {comments.map((comment, index) =>
                    <Comment comment={comment} key={index}/>
                  )}
                </div>}
                
                <div className="row mt-3 ">
                  <div className="d-flex align-items-center mb-2">
                    <h4 className="mb-0">
                      Hosted by Edward
                    </h4>
                    <p className="mb-0 ms-4 mt-0"><i className="bi bi-star-fill"> 2.2</i></p>
                  </div>
                  
                  <p className="mb-1">Resonse rate: 97%</p>
                  <p>Response time: 1-2 business days</p>
                  <a href={'mailto:' + property.owner_details[1]} className="btn btn-primary contact-button ms-2">Contact host</a>
                </div>
              </div>
            </div>
            <div className="col border m-1 shadow d-flex " id="book-property">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h3>
                    ${property.price}/night
                </h3>
                <p><i className="bi bi-star-fill"> 4.3</i></p>
              </div>
              <div className=""  id="checkin-checkout">
                <div className="d-flex">
                  <input type="text" placeholder="Check In" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} className="form-control shadow-none" id="book-input-left" onChange={(e) => setCheckIn(e.target.value)}/>
                  <input type="text" placeholder="Check Out" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} className="form-control shadow-none" id="book-input-right" onChange={(e) => setCheckOut(e.target.value)}/>
                </div>
                <input type="number" step="1" placeholder="Number of Guests" className="form-control shadow-none" id="book-input-bottom"/>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <p>
                ${property.price} x {numDays} nights
                </p>
                <p>${price}</p>
              </div>
              <div className="d-flex justify-content-between border-bottom">
                <p>
                  Taxes
                </p>
                <p>${tax}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <h4>
                  Total
                </h4>
                <p className="text-center">${total}</p>
              </div>
              {/* sorry i ruined your beautiful code emily :( */}
              <a onClick={() => {
                  var bodyd = new FormData();
                  bodyd.append("start_date", checkIn);
                  bodyd.append("end_date", checkOut);
                  axios({
                    method: "POST",
                    url: `http://127.0.0.1:8000/properties/reservations/create/${id}/`,
                    data: bodyd,
                    headers: { 
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                  }).then((response) => {
                      console.log(response);
                  })
                }} 
              className="btn btn-primary mt-3">
                Reserve
              </a>
            </div>
            </div>
            </div>
            </main>}
            
        </>
    );
}

export default PropertyDetails;