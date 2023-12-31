import React, { Component, useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
import signupCSS from './signup.css';
// import style from './style.css';
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



      

    });
    };

    render() {
      return (
        <>
        <Header/>
        <div className="page">
          <main className='mainy'>
        <div className="card w-500 log-stuff register">
        <div className="card-body logs">
        <h5 className="card-title card-t">Welcome to Restify</h5>
        <Form onSubmit={this.signUp} noValidate>
          <FormGroup>
            <Label for="name">First Name:</Label>
            <Input
              type="text"
              name="first_name"
              onChange={this.onChange}
              value={this.state.first_name}
            />
            <p className="warnings">{this.state.first_name_error[0]}</p>
          </FormGroup>
          
          <FormGroup>
            <Label for="last_name">Last Name:</Label>
            <Input
              type="text"
              name="last_name"
              onChange={this.onChange}
              value={this.state.last_name}
            />
             <p className="warnings">{this.state.last_name_error[0]}</p>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
             <p className="warnings">{this.state.email_error[0]}</p>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
            />
             <p className="warnings">{this.state.password_error[0]}</p>
          </FormGroup>
          <FormGroup>
            <Label for="password">Repeat password:</Label>
            <Input
              type="password"
              name="password2"
              onChange={this.onChange}
              value={this.state.password2}
            />
             <p className="warnings">{this.state.password2_error[0]}</p>
          </FormGroup>
          
          <FormGroup>
            <Label for="phone">Phone:</Label>
            <Input
              type="number"
              name="phone_num"
              onChange={this.onChange}
              value={this.state.phone_num}
            />
             <p className="warnings">{this.state.phone_num_error[0]}</p>
          </FormGroup>
          <Button className="btn btn-primary sign-btn" >Sign Up</Button>
        </Form>
       <Link to='/login'>Already have an account?</Link>
            
        </div>
        </div>
        </main>
        </div>
        </>
      );
    }

}


export default Signup
