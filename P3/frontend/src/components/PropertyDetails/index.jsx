import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import Header from "../Common/Header";
import './style.css'

function PropertyDetails(props) {
    const {id} = useParams()
    const [property, setProperty] = useState()
    
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
                <img src={property.images[0]} class="d-block w-100" alt="..."/>
                </div>
                {property.images.slice(1).map((item, index) => (
                    <div class="carousel-item">
                    <img class="d-block w-100" src={item} key={index}/>
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
        {/* <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" src={property.images[0]}/>
                </div>
                {property.images.map((item, index) => (
                    <div class="carousel-item">
                    <img class="d-block w-100" src={item} key={index}/>
                    </div>
                ))}
                <div class="carousel-item active">
                <img class="d-block w-100" src="..." alt="First slide"/>
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="..." alt="Second slide"/>
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="..." alt="Third slide"/>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            </div> */}
        {/* <div class="container m-0 property-images-container p-0">
            <img class="property-image main-img" id="main-img" src={property.images[0]}/> */}
          {/* <div class="row">
            <div class="col-6 p-1">
              <img class="property-image main-img" id="main-img" src={property.images[0]}/>
            </div>
            <div class="col-3 p-1">
              <img class="property-image mini-img" id="kitchen-img" src="images/cullen_kitchen.jpg" alt="Kitchen"/>
              <img class="property-image mini-img" id="living-img" src="images/cullen_living_room.jpg" alt="Living room"/>
            </div>
            <div class="col-3 p-1">
              <img class="property-image mini-img" id="kitchen-img" src="images/cullen-side-house-view.jpg" alt="Interior of house"/>
              <img class="property-image mini-img" id="living-img" src="images/cullen-bedroom.jpg" alt="Bedroom"/>
            </div>
          </div> */}
        {/* </div> */}
        <div class="container ms-0 mt-5 p-0 property-details">
          <div class="row">
            <div class="col-8 p-0">
              <div class="container border-bottom pb-2 pe-2">
                <div class="row border-bottom">
                  <div class="col d-flex ">
                    <div class="d-flex flex-column">
                      <h3 class="">
                        Entire house hosted by Edward
                      </h3>
                      <p class=" mb-0">
                        {property.num_guests} guests • {property.num_bed} bedrooms • {property.num_bath} bathrooms
                      </p>
                    </div>
                    <img src="images/edwards.png" id="host" class="img-fluid ms-auto" alt="Avatar"/> 
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
                  <a href="mailto:edward.cullen@gmail.com" class="btn btn-primary contact-button ms-2">Contact host</a>
                </div>
              </div>
            </div>
            <div class="col border m-1 shadow d-flex " id="book-property">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h3>
                  $1000/night
                </h3>
                <p><i class="bi bi-star-fill"> 4.3</i></p>
              </div>
              <div class=""  id="checkin-checkout">
                <div class="d-flex">
                  <input type="text" placeholder="Check In" onblur="(this.type='text')" onfocus="(this.type='date')" class="form-control shadow-none" id="book-input-left"/>
                  <input type="text" placeholder="Check Out" onblur="(this.type='text')" onfocus="(this.type='date')" class="form-control shadow-none" id="book-input-right"/>
                </div>
                <input type="number" step="1" placeholder="Number of Guests" class="form-control shadow-none" id="book-input-bottom"/>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <p>
                  $1000 x 5 nights
                </p>
                <p>$5000</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>
                  Cleaning fee
                </p>
                <p>$250</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>
                  Service fee
                </p>
                <p>$200</p>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <p>
                  Taxes
                </p>
                <p>$250</p>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-1">
                <h4>
                  Total
                </h4>
                <p class="text-center">$5700</p>
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