import React from 'react';
import axios from 'axios';

class Reservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_reservations: Array(0),
        }
        this.refresh = this.refresh.bind(this);
        this.refresh();
    }

    refresh() {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/properties/reservations/user_reservations/`,
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response.data);
            this.setState({
                user_reservations: response.data.reservations,
            })
        });
    }

    render() {
        const resv = this.state.user_reservations.map((item, i) => {
            return (
                <div class="card m-5" key={i}>
                    <img style={{width: '100px'}} class="card-img-top" src={item.image} alt="Edward's house"></img>
                    <div class="card-body">
                    <span class="badge text-bg-warning">{item.status}</span>
                        <h5 class="card-title">{item.location}</h5>
                        <p class="card-text">4347 km away</p>
                        <p class="card-text">{item.checkin} to {item.checkout}</p>
                        <p class="card-text font-weight-bold">Hosted by {item.host}</p>
                        <button class="btn btn-danger mt-1" onClick={() => {
                            axios({
                                method: "DELETE",
                                url: `http://127.0.0.1:8000/properties/reservations/cancel/${item.pk}/`,
                                headers: { 
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                }
                            }).then((response) => {
                                this.refresh();
                            })
                        }}>Cancel</button>
                    </div>
                </div>
            )
            })
        return (
            <main>
                <h1 class="m-5">
                    Reservations
                </h1>
                {resv}
            </main>
        );
    }
}

export default Reservations;