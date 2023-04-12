import React from 'react'
import './index.css'
import axios from 'axios'

class HostIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            r_filter: '',
            curr_prop_id: 0,
            create: false,
            properties: [{
                title: '',
                description: '',
                location: '',
                num_bed: '',
                num_bath: '',
                num_guests: '',
                price: '',
            }],
            reservations: [],
            update_name: -1,
            update_location: -1,
            update_description: -1,
            update_num_bed: -1,
            update_num_bath: -1,
            update_num_guests: -1,
            update_price: -1,
            error: '',
            add_image: -1,
            sidebar_header_width: '0%',
            sidebar_width: '40px',
            existing_changes: [],
            ex_start: -1,
            ex_end: -1,
            ex_una: -1,
            ex_price: -1,
        };
        this.setCreate = this.setCreate.bind(this);
        this.refresh = this.refresh.bind(this);
        this.submitCreateForm = this.submitCreateForm.bind(this);
        this.submitUpdateForm = this.submitUpdateForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.deleteProperty = this.deleteProperty.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.refresh_reservations = this.refresh_reservations.bind(this);
        this.collapseSidebarHeader = this.collapseSidebarHeader.bind(this);
        this.afterSubmission = this.afterSubmission.bind(this);
        this.refresh(0);
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
        if (this.state.add_image !== -1) {
            bodyd.append('image', this.state.add_image);
            this.state.add_image = -1;
        };
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/properties/create/",
            data: bodyd,
            headers: { 
                "Content-Type": "multipart/form-data", 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => this.setState({create: false}, () => this.refresh(this.state.curr_prop_id)))
        .catch((err) => {
            console.log(err.response.statusText);
            this.setState({error: err.response.statusText});
        });
    }

    submitUpdateForm() {
        console.log(this.state);
        var bodyd = new FormData();
        if (this.state.update_name !== -1) bodyd.append('title', this.state.update_name);
        if (this.state.update_description !== -1) bodyd.append('description', this.state.update_description);
        if (this.state.update_location !== -1) bodyd.append('location', this.state.update_location);
        if (this.state.update_num_bed !== -1) bodyd.append('num_bed', this.state.update_num_bed);
        if (this.state.update_num_bath !== -1) bodyd.append('num_bath', this.state.update_num_bath);
        if (this.state.update_num_guests !== -1) bodyd.append('num_guests', this.state.update_num_guests);
        if (this.state.update_price !== -1) bodyd.append('price', this.state.update_price);
        if (this.state.add_image !== -1) {
            bodyd.append('image', this.state.add_image);
            this.state.add_image = -1;
        };
        axios({
            method: "PATCH",
            url: `http://127.0.0.1:8000/properties/update/${this.state.properties[this.state.curr_prop_id].id}/`,
            data: bodyd,
            headers: { 
                "Content-Type": "multipart/form-data", 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            this.refresh(this.state.curr_prop_id);
        })
        .catch((err) => {
            console.log(err.response.statusText);
            this.setState({error: err.response.statusText});
        });
    }

    deleteProperty() {
        axios({
            method: "DELETE",
            url: `http://127.0.0.1:8000/properties/delete/${this.state.properties[this.state.curr_prop_id].id}/`,
            headers: { 
                "Content-Type": "multipart/form-data", 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => this.refresh(0))
    }

    refresh_reservations() {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/properties/reservations/list/?all=true`,
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            var x = Array(this.state.properties.length);
            for (let i = 0; i < x.length; i++) {
                x[i] = Array(0);
            }
            var mapping = {}
            for (let i = 0; i < x.length; i++) {
                mapping[this.state.properties[i].id] = i;
            }
            console.log(response.data.results);
            for (let i = 0; i < response.data.results.length; i++){
                x[mapping[response.data.results[i].prop]].push(response.data.results[i]);
            }
            this.setState({reservations: x});
        });
    }

    refresh(prop_id) {
        // pulls all info
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/properties/get_user_properties/",
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            var x = Array(Object.values(response.data)[0].length);
            for (let i = 0; i < x.length; i++) {
                x[i] = Array(0);
            }
            console.log(response.data);
            var imgs = Array(this.state.properties.length);
            for (let i = 0; i < x.length; i++) {
                imgs[i] = response.data.properties[i].images;
            }
            console.log('switching to: ' + prop_id);
            this.setState({
                properties: Object.values(response.data)[0], 
                curr_prop_id: prop_id, 
                reservations: x,    // be careful of deepcopy shallow copy shit
                images: imgs,
            }, this.refresh_reservations 
            );
        });
        
    }

    setCreate() {
        this.setState({create: true});
    }

    changeStatus(pk, status) {
        var bodyd = new FormData();
        bodyd.append('status', status);
        axios({
            method: "PATCH",
            url: `http://127.0.0.1:8000/properties/reservations/update/${pk}/`,
            data: bodyd,
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => this.refresh(this.state.curr_prop_id));
    }

    handleFileChange(e) {
        if (e.target.files) {
          this.setState({add_image: e.target.files[0]});
        }
    }

    collapseSidebarHeader() {
        if (this.state.sidebar_header_width == '0%') {
            this.setState({
                sidebar_header_width: '100%',
                sidebar_width: 'fit-content'})
        } else {
            this.setState({
                sidebar_header_width: '0%',
                sidebar_width: '40px'})
        }
    }

    afterSubmission(event) {
        event.preventDefault();
    }

    render() {
        const sidebarvals = this.state.properties.map((item, i) =>
                <a key={i} href="#" class="list-group-item list-group-item-action"  aria-current="true" onClick={() => {this.setState({curr_prop_id: i}); this.setState({create: false})}}>{item.title}</a>)
        
        var prop_res = <></>;
        var prop_images = <></>;
        var prop_image_elements = <></>;
        if (!this.state.create) {
            if (this.state.reservations.length == this.state.properties.length) {
                console.log('doing it');
                prop_res = this.state.reservations[this.state.curr_prop_id].map((item, i) => {
                    if (this.state.filter.length == 0 || (this.state.filter.length > 0 && item.status == this.state.filter)) {
                        return (
                            <>
                                <li key={`${this.state.curr_prop_id},${i}`} class="list-group-item d-flex justify-content-between align-items-start">
                
                                    <div class="request-card-info">
                                        <div><a href="#">User {item.pk}</a><span class="badge bg-dark">{item.status}</span></div>
                                        <p>Details: {item.start_data} to {item.end_date}</p>
                                    </div>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Status
                                        </button>
                                        <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" onClick={() => this.changeStatus(item.pk, "approved")}>Approve</a></li>
                                        <li><a class="dropdown-item" onClick={() => this.changeStatus(item.pk, "denied")}>Decline</a></li>
                                        <li><a class="dropdown-item" onClick={() => this.changeStatus(item.pk, "terminated")}>Terminate</a></li>
                                        </ul>
                                    </div>
                                </li>           
                            </>
                        )
                    } else {
                        return <></>
                    }
                    
                })
                prop_images = this.state.images[this.state.curr_prop_id].map((item, i) => {
                    return <li key={i} class="list-group-item d-flex justify-content-between align-items-center" id="photo-order">
                    {item.split('/').slice(-1)[0]} </li>
                })

                prop_image_elements = this.state.images[this.state.curr_prop_id].map((item, i) => {
                    return <div class="carousel-item active">
                            <img src={item} class="d-block w-100"></img>
                            </div>
                })
            } else {
                prop_res = <></>;
                prop_images = <></>;
                prop_image_elements = <></>;
            }
            return (
                <div class="content">
                    <main>
                        <div class="property-mgr-wrapper">
                            <div id="collapse-sidebar">
                                <div id="sidebar-header" style={{width: this.state.sidebar_width}}>
                                <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseExample" 
                                role="button" aria-expanded="false" aria-controls="collapseExample"  onClick={this.collapseSidebarHeader}>
                                    <i class="bi bi-list"></i>
                                </button>
                                <div id="properties-mgr-title" style={{width: this.state.sidebar_header_width}}><h5>Properties</h5></div>
                                </div>
                                <div class="collapse full-collapse-list" id="collapseExample">
                                <div class="list-group">
                                {/* <button onClick={this.refresh}>
                                <i class="bi bi-arrow-clockwise"></i>
                                    </button> */}
                                <button onClick={this.setCreate}>
                                    <i class="bi bi-plus"></i>
                                </button>
                                {
                                    sidebarvals
                                }
                                </div>
                                </div>
                            </div>
                        <div class="vr" id="v-bar"></div>
                        <div id="property-info-wrapper">
                            <div id="property-main-info">
                            <h5>Listing Information</h5>
                            <h6 id="property-crud-errors">{this.state.error}</h6>
                            <form onSubmit = {this.afterSubmission}>
                                <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name">Property Name</label>
                                    <input type="text" class="form-control" id="name" value={this.state.properties[this.state.curr_prop_id].title} onChange={this.handleInputChange} name="update_name"></input>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Address">Address</label>
                                    <input type="text" class="form-control" id="address" defaultValue={this.state.properties[this.state.curr_prop_id].location} onChange={this.handleInputChange} name="update_location"></input>
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="about">About</label>
                                <textarea type="text" class="form-control" id="about" defaultValue={this.state.properties[this.state.curr_prop_id].description} onChange={this.handleInputChange} name="update_description"></textarea>
                                </div>
                                <div class="row form-small-grid">
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="bedrooms">Bedrooms</label>
                                    <input type="text" class="form-control short-input" id="bedrooms" defaultValue={this.state.properties[this.state.curr_prop_id].num_bed} onChange={this.handleInputChange} name="update_num_bed"></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="bathrooms">Bathrooms</label>
                                    <input type="text" class="form-control short-input" id="bathrooms" defaultValue={this.state.properties[this.state.curr_prop_id].num_bath} onChange={this.handleInputChange} name="update_num_bath"></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="guests">Guests</label>
                                    <input type="text" class="form-control short-input" id="guests" defaultValue={this.state.properties[this.state.curr_prop_id].num_guests} onChange={this.handleInputChange} name="update_num_guests"></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="price">Price</label>
                                    <input type="text" class="form-control short-input" id="price" defaultValue={this.state.properties[this.state.curr_prop_id].price} onChange={this.handleInputChange} name="update_price"></input>
                                </div>
                                </div>
                                <button type="submit" class="btn btn-success submit-btn" onClick={this.submitUpdateForm}>Update</button>
                            </form>
                            <button type="submit" class="btn btn-danger submit-btn" onClick={this.deleteProperty}>Delete</button> <h6>Warning this is permanent!</h6>
                            </div>
                            <hr class="hr" /> 
                            <div id="photos">
                            <div>
                                <h5>Photos</h5>
                                <ul class="list-group ">
                                <li class="list-group-item d-flex justify-content-center align-items-center bg-light" id="photo-order">
                                    <label class="custom-file-upload">
                                    <input type="file" onChange={this.handleFileChange}/>
                                    <i class="bi bi-plus"></i>
                                    </label>
                                </li>
                                {
                                    prop_images
                                }
                                </ul>
                            </div>
                            <div>
                                <h5>Display</h5>
                                <div id="carouselExampleFade" class="carousel slide carousel-fade">
                                <div class="carousel-inner">
                                    {prop_image_elements}
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                                </div>
                            </div>
                            </div>
                            <hr class="hr" />
                            <div id="custom-rates">
                            <h5>Custom Rates & Availability</h5>
                            <div id="request-existing">
                                <h6>Existing Changes</h6>
                                <ul class="list-group ">
                                    {this.state.existing_changes.map((item, i) => {
                                        if (item.prop == this.state.properties[this.state.curr_prop_id].id) {
                                            return <li class="custom-li" key={i}>{item.start} to {item.end}, unavailable: {item.una}, price: {item.price}</li>
                                        }
                                    })}
                                </ul>
                            </div>
                            <div id="request-custom">
                                <h6>Set Custom</h6>
                                <form onSubmit = {this.afterSubmission}>
                                <div class="row">
                                    <div class="form-group col-md-6" id="req-custom-date-picker">
                                    <input onChange={this.handleInputChange} defaultValue="" id="custom-start" type="text" placeholder="Start" onblur="(this.type='text')" onfocus="(this.type='date')" class="form-control border-1" name="ex_start"></input>
                                    </div>
                                    <div class="form-group col-md-6" id="req-custom-date-picker">
                                    <input onChange={this.handleInputChange} defaultValue=""id="custom-end" type="text" placeholder="End" onblur="(this.type='text')" onfocus="(this.type='date')" class="form-control border-1" name="ex_end"></input>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label" for="unavailable">
                                    Unavailable
                                    </label>
                                    <input onChange={this.handleInputChange} defaultValue="" class="form-check-input" type="checkbox" value="" id="unavailable" name="ex_una"></input>
                                </div>  
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="rate">Rate ($/night)</label>
                                    <input onChange={this.handleInputChange} defaultValue="" type="text" class="form-control short-input" id="rate" name="ex_price"></input>
                                </div>
                                <button onClick={() => {
                                    var items = this.state.existing_changes;
                                    if (this.state.ex_end !== -1 && this.state.ex_start !== -1 && (this.state.ex_una !== -1 || this.state.ex_price !== -1)) {
                                        items.push({
                                            start: this.state.ex_start,
                                            end: this.state.ex_end,
                                            una: this.state.ex_una,
                                            price: this.state.ex_price,
                                            prop: this.state.properties[this.state.curr_prop_id].id,
                                        })
                                    }
                                    this.setState({existing_changes: items});
                                }} type="submit" class="btn btn-light submit-btn">Update</button>
                                </form>
                            </div>
                            </div>
                            <hr class="hr" />
                            <div id="requests-manager">
                            <h5>Requests</h5>
                            <div class="btn-group">
                                <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter
                                </button>
                                <ul class="dropdown-menu">
                                <li><a class="dropdown-item" onClick={() => this.setState({filter: ''})}>None</a></li>
                                <li><a class="dropdown-item" onClick={() => this.setState({filter: 'approved'})}>Approve</a></li>
                                <li><a class="dropdown-item" onClick={() => this.setState({filter: 'denied'})}>Denied</a></li>
                                <li><a class="dropdown-item" onClick={() => this.setState({filter: 'terminated'})}>Terminate</a></li>
                                </ul>
                            </div>
                            <ol class="list-group">
                                {
                                    prop_res
                                }
                                
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
                                <div id="sidebar-header" style={{width: this.state.sidebar_width}}>
                                <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseExample" 
                                role="button" aria-expanded="false" aria-controls="collapseExample" onClick={this.collapseSidebarHeader}>
                                    <i class="bi bi-list"></i>
                                </button>
                                <div id="properties-mgr-title" style={{width: this.state.sidebar_header_width}}><h5>Properties</h5></div>
                                </div>
                                <div class="collapse full-collapse-list" id="collapseExample">
                                <div class="list-group">
                                {/* <button onClick={this.refresh}>
                                <i class="bi bi-arrow-clockwise"></i>
                                    </button> */}
                                <button onClick={this.setCreate}>
                                    <i class="bi bi-plus"></i>
                                </button>
                                {
                                    sidebarvals
                                }
                                    {/* <a href="#" class="list-group-item list-group-item-action active"  aria-current="true">Private Isolated Mansion</a>
                                    <a href="host-property-created.html" class="list-group-item list-group-item-action"  aria-current="true">Vampire Mansion</a> */}
                                </div>
                                </div>
                            </div>
                        <div class="vr" id="v-bar"></div>
                        <div id="property-info-wrapper">
                            <div id="property-main-info">
                            <h5>Add New Property</h5>
                            <h6 id="property-crud-errors">{this.state.error}</h6>
                            <form onSubmit = {this.afterSubmission}>
                                <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name">Property Name</label>
                                    <input name="add_name" type="text" class="form-control" id="name" placeholder="Property Name" defaultValue="" onChange={this.handleInputChange}></input>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Address">Address</label>
                                    <input name="add_location" type="text" class="form-control" id="address" placeholder="(we won't share this)" defaultValue=""  onChange={this.handleInputChange}></input>
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="about">About</label>
                                <textarea name="add_description" type="text" class="form-control" id="about" placeholder="Tell us about the place!" defaultValue=""  onChange={this.handleInputChange}></textarea>
                                </div>
                                <div class="row form-small-grid">
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="bedrooms">Bedrooms</label>
                                    <input name="add_num_bed" type="text" class="form-control short-input" id="bedrooms" defaultValue=""  onChange={this.handleInputChange}></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="bathrooms">Bathrooms</label>
                                    <input name="add_num_bath" type="text" class="form-control short-input" id="bathrooms" defaultValue=""  onChange={this.handleInputChange}></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="guests">Guests</label>
                                    <input name="add_num_guests" type="text" class="form-control short-input" id="guests" defaultValue=""  onChange={this.handleInputChange}></input>
                                </div>
                                <div class="form-group col-md-6 form-small-grid-item">
                                    <label for="prive">Price</label>
                                    <input name="add_price" type="text" class="form-control short-input" id="price" defaultValue=""  onChange={this.handleInputChange}></input>
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
                                    <input type="file" onChange={this.handleFileChange}/>
                                    <i class="bi bi-plus"></i>
                                    </label>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center" id="photo-order">
                                {
                                    this.state.add_image !== -1 ?
                                        <h5>{this.state.add_image.name}</h5>
                                    :
                                    <h6>add an image</h6>
                                    
                                }
                                {/* <div class="photo-name-display">
                                    <input class="short-input form-control" type="number" required value="1"></input>
                                    <button class="btn p-0" type="button"><i class="bi bi-trash"></i></button>
                                </div> */}
                                </li>
                                </ul>
                            </div>
                            {/* <div>
                                <h5>Display</h5>
                                
                            </div> */}
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