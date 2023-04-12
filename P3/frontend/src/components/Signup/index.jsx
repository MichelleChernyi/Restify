import React, { Component, useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
import './style.css';
import {Link, useParams, Navigate, useNavigate, Route} from "react-router-dom";
import Header from '../Common/Header';

// States for registration
// const [firstName, setFirstName] = useState('');
// const [lastName, setLastName] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [phone, setPhone] = useState('');
// const [avatar, setAvatar] = useState('');
// const [error, setError] = useState(false);

// avatar:"",

const Nav = () => {
  const navigate = useNavigate();
  return navigate('/')
};
class Signup extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: "", password: "",password2 :"",first_name: "", last_name: "", phone_num: "", email_error: "", password_error: "", password2_error :"",first_name_error: "", last_name_error: "", phone_num_error: "",
        
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    signUp = e => {
      e.preventDefault();
       

      axios.post("http://127.0.0.1:8000/accounts/signup/", {email: this.state.email, password: this.state.password ,password2 :this.state.password2,first_name: this.state.first_name, last_name: this.state.last_name, phone_num: this.state.phone_num})
      .then(res => {
        console.log(res);
        console.log(res.data);

        window.location.assign("http://localhost:3000/login/");
      })
      .catch(err => {
        console.log(err.response.data)
        console.log(err.response.data)
        this.setState({ email_error: "" }); 
        this.setState({ first_name_error: "" }); 
        this.setState({ last_name_error: "" }); 
        this.setState({ password_error:"" });
        this.setState({ password2_error: ""}); 
        this.setState({ phone_num_error: ""}); 
        for (var key in err.response.data) {
          if( key === 'email'){
            this.setState({ email_error: err.response.data[key] }); 
          }
          if( key === 'first_name'){
            // this.setState({ email_error: err.response.data[key]});
            this.setState({ first_name_error: err.response.data[key] }); 
          }
          if( key === 'last_name'){
            // this.setState({ email_error: err.response.data[key]});
            this.setState({ last_name_error: err.response.data[key] }); 
          }
          if( key === 'password' || key === 'non_field_errors'){
            // this.setState({ email_error: err.response.data[key]});
            this.setState({ password_error: err.response.data[key] }); 
          }
          if( key === 'password2'){
            // this.setState({ email_error: err.response.data[key]});
            this.setState({ password2_error: err.response.data[key] }); 
          }
          if( key === 'phone_num'){
            // this.setState({ email_error: err.response.data[key]});
            this.setState({ phone_num_error: err.response.data[key] }); 
          }

          console.log("Key:" + key);
          console.log("Value:" + err.response.data[key]);
        }



      
        // this.setState({ error: err.response.data });
    });
    };

//     signUp = e => {
//     e.preventDefault();
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({email: this.state.email, password: this.state.password ,password2 :this.state.password2,first_name: this.state.first_name, last_name: this.state.last_name, phone_num: this.state.phone_num})
//   };
//  fetch('http://127.0.0.1:8000/accounts/signup/', requestOptions)
//       .then(response => response.json())
//       .then(text => {
//         console.log(text)
//         console.log
//         console.log(text.detail)
//         for (var key in text) {
//           console.log("Key:" + key);
//           console.log("Value:" + text[key]);
//         }
//       })
//       .catch(error=>{console.log(error)});
        
  

//   };
    render() {
      return (
        <>
        <Header/>
        <div className="page">
          <main>
        <div className="card w-500 log-stuff register">
        <div className="card-body logs">
        <h5 className="card-title">Welcome to Restify</h5>
        <Form onSubmit={this.signUp} noValidate>
          <FormGroup>
            <Label for="name">First Name:</Label>
            <Input
              type="text"
              name="first_name"
              onChange={this.onChange}
              value={this.state.first_name}
            />
            <p>{this.state.first_name_error[0]}</p>
          </FormGroup>
          
          <FormGroup>
            <Label for="last_name">Last Name:</Label>
            <Input
              type="text"
              name="last_name"
              onChange={this.onChange}
              value={this.state.last_name}
            />
             <p>{this.state.last_name_error[0]}</p>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
             <p>{this.state.email_error[0]}</p>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
            />
             <p>{this.state.password_error[0]}</p>
          </FormGroup>
          <FormGroup>
            <Label for="password">Repeat password:</Label>
            <Input
              type="password"
              name="password2"
              onChange={this.onChange}
              value={this.state.password2}
            />
             <p>{this.state.password2_error[0]}</p>
          </FormGroup>
          
          <FormGroup>
            <Label for="phone">Phone:</Label>
            <Input
              type="number"
              name="phone_num"
              onChange={this.onChange}
              value={this.state.phone_num}
            />
             <p>{this.state.phone_num_error[0]}</p>
          </FormGroup>
          <Button className="btn btn-primary sign-btn" >Sign Up</Button>
        </Form>
       <Link to='/'>Already have an account?</Link>
            
        </div>
        </div>
        </main>
        </div>
        </>
      );
    }

}


export default Signup

{/* <>
<div className="card w-500 log-stuff register">
<img src="images/home.png" className="card-img-top sign-up-image">
<div className="card-body logs">
  <h5 className="card-title">Welcome to Restify</h5>
  <form action="signed-up.html">
    <div className="mb-3">
        <label className="form-label">First name</label>
        <input className="form-control" type="text" required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Last name</label>
        <input className="form-control" type="text" required/>
      </div>
    <div className="mb-3">
      <label className="form-label">Email address</label>
      <input type="email" className="form-control" aria-describedby="emailHelp" required/>
    </div>
    <div className="mb-3">
      <label className="form-label">Phone number</label>
      <input type="number" className="form-control" required/>
    </div>
    <div className="mb-3">
      <label className="form-label">Password</label>
      <input type="password" className="form-control" required/>
      <div className="form-text">Your password must be 8-20 characters long</div>
    </div>
    <div className="mb-3">
        <label className="form-label">Confirm password</label>
        <input type="password" className="form-control" required/>
    </div>
    <input className="btn btn-primary" type="submit" value="Sign Up" />
  </form>
<a href="login.html">Already have an account? Log in.</a>
</div>
</div>

</> */}