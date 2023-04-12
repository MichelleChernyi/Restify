import React from 'react'
import './index.css'
import axios from 'axios'

class HostIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            curr_prop_id: '',
            create: false,
        };
        this.setCreate = this.setCreate.bind(this);
        this.refresh = this.refresh.bind(this);
        this.submitCreateForm = this.submitCreateForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    } 

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    submitCreateForm() {
        var bodyd = new FormData();
        bodyd.append('title', this.state.add_name);
        bodyd.append('description', this.state.add_description);
        bodyd.append('location', this.state.add_location);
        bodyd.append('num_bed', this.state.add_num_bed);
        bodyd.append('num_bath', this.state.add_num_bath);
        bodyd.append('num_guests', this.state.add_num_guests);
        bodyd.append('price', this.state.add_price);
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/properties/create/",
            data: bodyd,
            headers: { 
                "Content-Type": "multipart/form-data", 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => console.log(response.json()));
    }

    refresh() {
        // need a route for this
        fetch('http://localhost:8000/properties/get_user_properties/')
    }

    setCreate() {
        this.setState({create: true});
    }

    render() {
        if (!this.state.create) {
            return (
                <div class="content">
                    <main>
                        <div class="property-mgr-wrapper">
                            <div id="collapse-sidebar">
                                <div id="sidebar-header">
                                <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseExample" 
                                role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <i class="bi bi-list"></i>
                                </button>
                                <div id="properties-mgr-title"><h5>Properties</h5></div>
                                </div>
                                <div class="collapse full-collapse-list" id="collapseExample">
                                <div class="list-group">
                                <button onClick={this.refresh}>
                                <i class="bi bi-arrow-clockwise"></i>
                                    </button>
                                    <button onClick={this.setCreate}>
                                        <i class="bi bi-plus"></i>
                                    </button>
                                    <a href="#" class="list-group-item list-group-item-action active"  aria-current="true">Private Isolated Mansion</a>
                                    <a href="host-property-created.html" class="list-group-item list-group-item-action"  aria-current="true">Vampire Mansion</a>
                                </div>
                                </div>
                            </div>
                        <div class="vr" id="v-bar"></div>
                        <div id="property-info-wrapper">
                            <div id="property-main-info">
                            <h5>Listing Information</h5>
                            <form action="#" method="PUT">
                                <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name">Property Name</label>
                                    <input type="text" class="form-control" id="name" placeholder="Listing Name"></input>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Address">Address</label>
                                    <input type="text" class="form-control" id="address" placeholder="(we won't share this)"></input>
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="about">About</label>
                                <textarea type="text" class="form-control" id="about" placeholder="Tell us about the place!"></textarea>
                                </div>
                                <div class="row form-small-grid">
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="bedrooms">Bedrooms</label>
                                    <input type="text" class="form-control short-input" id="bedrooms"></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="bathrooms">Bathrooms</label>
                                    <input type="text" class="form-control short-input" id="bathrooms"></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="sleeps">Sleeps</label>
                                    <input type="text" class="form-control short-input" id="sleeps"></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="guests">Guests</label>
                                    <input type="text" class="form-control short-input" id="guests"></input>
                                </div>
                                </div>
                                <button type="submit" class="btn btn-primary submit-btn">Update</button>
                            </form>
                            </div>
                            <hr class="hr" /> 
                            <div id="photos">
                            <div>
                                <h5>Photos</h5>
                                <ul class="list-group ">
                                <li class="list-group-item d-flex justify-content-center align-items-center bg-light" id="photo-order">
                                    <label class="custom-file-upload">
                                    <input type="file"/>
                                    <i class="bi bi-plus"></i>
                                    </label>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center" id="photo-order">
                                    cabin.jpg
                                    <div class="photo-name-display">
                                    <input class="short-input form-control" type="number" required value="1"></input>
                                    <button class="btn p-0" type="button"><i class="bi bi-trash"></i></button>
                                    </div>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center" id="photo-order">
                                    interior.jpg
                                    <div class="photo-name-display">
                                    <input class="short-input form-control" type="number" required value="2"></input>
                                    <button class="btn p-0" type="button"><i class="bi bi-trash"></i></button>
                                    </div>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center" id="photo-order">
                                    living-room.jpg
                                    <div class="photo-name-display">
                                    <input class="short-input form-control" type="number" required value="3"></input>
                                    <button class="btn p-0" type="button"><i class="bi bi-trash"></i></button>
                                    </div>
                                </li>
                                </ul>
                            </div>
                            <div>
                                <h5>Display</h5>
                                
                            </div>
                            </div>
                            <hr class="hr" />
                            <div id="custom-rates">
                            <h5>Custom Rates & Availability</h5>
                            <div id="request-existing">
                                <h6>Existing Changes</h6>
                                <ul class="list-group ">
                                
                                </ul>
                            </div>
                            <div id="request-custom">
                                <h6>Set Custom</h6>
                                <form action="#" method="PUT">
                                <div class="row">
                                    <div class="form-group col-md-6" id="req-custom-date-picker">
                                    <input id="custom-start" type="text" placeholder="Start" onblur="(this.type='text')" onfocus="(this.type='date')" class="form-control border-1"></input>
                                    </div>
                                    <div class="form-group col-md-6" id="req-custom-date-picker">
                                    <input id="custom-end" type="text" placeholder="End" onblur="(this.type='text')" onfocus="(this.type='date')" class="form-control border-1"></input>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label" for="unavailable">
                                    Unavailable
                                    </label>
                                    <input class="form-check-input" type="checkbox" value="" id="unavailable"></input>
                                </div>  
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="rate">Rate ($/night)</label>
                                    <input type="text" class="form-control short-input" id="rate"></input>
                                </div>
                                <a href="host-property-1-custom-datetime.html" type="submit" class="btn btn-light submit-btn">Update</a>
                                </form>
                            </div>
                            </div>
                            <hr class="hr" />
                            <div id="requests-manager">
                            <h5>Requests</h5>
                            <ol class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="request-card-info">
                                    <div><a href="#">User #1</a><span class="badge bg-success">Approved</span></div>
                                    <p>Details: 12-04-2022 to 12-05-2022, 5 guests</p>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">Contact</button>
                                    <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Status
                                    </button>
                                    <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Approve</a></li>
                                    <li><a class="dropdown-item" href="#">Decline</a></li>
                                    <li><a class="dropdown-item" href="host-booking-terminated.html">Terminate</a></li>
                                    </ul>
                                </div>
                                </li>
                            </ol>
                            </div>
                        </div>
                        </div>
                    </main>
                </div>
            );
        } else {
            return (
                <div class="content">
                    <main>
                        <div class="property-mgr-wrapper">
                            <div id="collapse-sidebar">
                                <div id="sidebar-header">
                                <a role="button" class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseExample" 
                                aria-expanded="false" aria-controls="collapseExample" onclick="collapseSidebarHeader()">
                                    <i class="bi bi-list"></i>
                                </a>
                                <div id="properties-mgr-title"><h5>Properties</h5></div>
                                </div>
                                <div class="collapse full-collapse-list" id="collapseExample">
                                <div class="list-group">
                                    <button onClick={function() {return}}>
                                        <i class="bi bi-plus"></i>
                                    </button>
                                    <a href="manage-properties-1-property.html" class="list-group-item list-group-item-action"  aria-current="true">Private Isolated Mansion</a>
                                </div>
                                </div>
                            </div>
                        <div class="vr" id="v-bar"></div>
                        <div id="property-info-wrapper">
                            <div id="property-main-info">
                            <h5>Add New Property</h5>
                            <form action="#" method="PUT">
                                <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name">Property Name</label>
                                    <input name="add_name" type="text" class="form-control" id="name" placeholder="Property Name" onChange={this.handleInputChange}></input>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Address">Address</label>
                                    <input name="add_address" type="text" class="form-control" id="address" placeholder="(we won't share this)" onChange={this.handleInputChange}></input>
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="about">About</label>
                                <textarea name="add_description" type="text" class="form-control" id="about" placeholder="Tell us about the place!" onChange={this.handleInputChange}></textarea>
                                </div>
                                <div class="row form-small-grid">
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="bedrooms">Bedrooms</label>
                                    <input name="add_num_bed" type="text" class="form-control short-input" id="bedrooms" onChange={this.handleInputChange}></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="bathrooms">Bathrooms</label>
                                    <input name="add_num_bath" type="text" class="form-control short-input" id="bathrooms" onChange={this.handleInputChange}></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="guests">Guests</label>
                                    <input name="add_num_guests" type="text" class="form-control short-input" id="guests" onChange={this.handleInputChange}></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="prive">Price</label>
                                    <input name="add_price" type="text" class="form-control short-input" id="price" onChange={this.handleInputChange}></input>
                                </div>
                                </div>
                                <button type="submit" class="btn btn-success submit-btn" onClick={this.submitCreateForm}>Create</button>
                            </form>
                            </div>
                            <hr class="hr" /> 
                            <div id="photos">
                            <div>
                                <h5>Photos</h5>
                                <ul class="list-group ">
                                <li class="list-group-item d-flex justify-content-center align-items-center bg-light" id="photo-order">
                                    <label class="custom-file-upload">
                                    <input type="file" href="manage-properties.html"
                                    onclick="showCarousel()"/>
                                    <i class="bi bi-plus"></i>
                                    </label>
                                </li>
                                <div id="hide-me-2">
                                    <li class="list-group-item d-flex justify-content-between align-items-center" id="photo-order">
                                    interior.jpg
                                    <div class="photo-name-display">
                                        <input class="short-input form-control" type="number" required value="1"></input>
                                        <button class="btn p-0" type="button"><i class="bi bi-trash"></i></button>
                                    </div>
                                    </li>
                                </div>
                                </ul>
                            </div>
                            <div>
                                <h5>Display</h5>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                    </main>
                </div>
            );
        }
        
    }
}
export default HostIndex;