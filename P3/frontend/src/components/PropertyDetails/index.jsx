import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import Header from "../Common/Header";
import './style.css'

function PropertyDetails(props) {
    const {id} = useParams()
    const [property, setProperty] = useState()
    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    const [price, setPrice] = useState()
    const [tax, setTax] = useState()
    const [total, setTotal] = useState()
    const [numDays, setNumDays] = useState()
    
    useEffect(()=>{
        console.log(id)
        fetch(`http://localhost:8000/properties/search/?id=${id}`)
          .then(response => response.json())
          .then(body => {
            // console.log(body)
            setProperty(...body['results'])
            })
        console.log(property)
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
            {property && <main class="property-main">
        <h1 class="">
            {property.title}
        </h1>
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src={property.images[0]} class="d-block carousel-img w-100" alt="..."/>
                </div>
                {property.images.slice(1).map((item, index) => (
                    <div class="carousel-item">
                    <img class="d-block carousel-img w-100" src={item} key={index}/>
                    </div>
                ))}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
        <div class="container ms-0 mt-5 p-0 property-details">
          <div class="row">
            <div class="col-8 p-0">
              <div class="container border-bottom pb-2 pe-2">
                <div class="row border-bottom">
                  <div class="col d-flex ">
                    <div class="d-flex flex-column">
                      <h3 class="">
                        Stay hosted by {property.owner_details[0]}
                      </h3>
                      <p class=" mb-0">
                        {property.num_guests} guests • {property.num_bed} bedrooms • {property.num_bath} bathrooms
                      </p>
                    </div>
                    <img src={property.owner_details[2]} id="host" class="img-fluid ms-auto" alt="Avatar"/> 
                  </div>
                
                </div>
                <div class="row mt-3 border-bottom">
                  <div class="col">
                    <p>
                    {property.description}
                  </p>
                  </div>
                </div>
                <div class="row mt-3 border-bottom">
                  <h4>Comments</h4>
                  <div class="profile-comment mb-3 p-0">
                    <div class="border-bottom p-3">
                      <div class="d-flex justify-content-between">
                        <h6>Terrific home! Creepy host</h6> 
                        <p><i class="bi bi-star-fill"> 3.5</i></p>
                      </div>
                      <p >Our stay was amazing but we couldn't help but think the host might've been watching us sleep...</p>
                      <p class="comment-date">July 15, 2022</p>
                    </div>
                    <div class="host-response m-0 p-3">
                      <h6>
                        Edward's response:
                      </h6>
                      <p>I like watching you sleep</p>
                    </div>
                  </div>

                </div>
                <div class="row mt-3 ">
                  <div class="d-flex align-items-center mb-2">
                    <h4 class="mb-0">
                      Hosted by Edward
                    </h4>
                    <p class="mb-0 ms-4 mt-0"><i class="bi bi-star-fill"> 2.2</i></p>
                  </div>
                  
                  <p class="mb-1">Resonse rate: 97%</p>
                  <p>Response time: 1-2 business days</p>
                  <a href={'mailto:' + property.owner_details[1]} class="btn btn-primary contact-button ms-2">Contact host</a>
                </div>
              </div>
            </div>
            <div class="col border m-1 shadow d-flex " id="book-property">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h3>
                    ${property.price}/night
                </h3>
                <p><i class="bi bi-star-fill"> 4.3</i></p>
              </div>
              <div class=""  id="checkin-checkout">
                <div class="d-flex">
                  <input type="text" placeholder="Check In" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} class="form-control shadow-none" id="book-input-left" onChange={(e) => setCheckIn(e.target.value)}/>
                  <input type="text" placeholder="Check Out" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} class="form-control shadow-none" id="book-input-right" onChange={(e) => setCheckOut(e.target.value)}/>
                </div>
                <input type="number" step="1" placeholder="Number of Guests" class="form-control shadow-none" id="book-input-bottom"/>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <p>
                ${property.price} x {numDays} nights
                </p>
                <p>${price}</p>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <p>
                  Taxes
                </p>
                <p>${tax}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-1">
                <h4>
                  Total
                </h4>
                <p class="text-center">${total}</p>
              </div>
              
              <a href="log-in-to-reserve.html" class="btn btn-primary mt-3">
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