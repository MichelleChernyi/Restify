import React, { Component, useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
// import './style.css';
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
class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: "", password: "", email_error: "", password_error: "", 
        
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    logIn = e => {
      e.preventDefault();
       

      axios.post("http://127.0.0.1:8000/api/token/", {email: this.state.email, password: this.state.password})
      .then(res => {
        console.log(res);
        console.log(res.data.access);
        const token  = res.data.access;
        localStorage.setItem('token',  token);
        const refresh_token  = res.data.refresh;
        localStorage.setItem('refresh_token',  refresh_token);

        // window.location.assign("http://localhost:3000/");
      })
      .catch(err => {
        console.log(err.response.data)
        console.log(err.response.data)
        this.setState({ email_error: "" }); 
        this.setState({ password_error:"" });
        for (var key in err.response.data) {
            console.log("Key:" + key);
          console.log("Value:" + err.response.data[key]);
          if( key === 'email'){
            this.setState({ email_error: err.response.data[key][0] }); 
          }
          if(key === 'detail'){
            this.setState({ password_error: err.response.data[key] }); 
          }

          if( key === 'password'){
            // this.setState({ email_error: err.response.data[key]});
            this.setState({ password_error: err.response.data[key][0] }); 
          }

          
        }



      
      
    });
    };

    render() {
      return (
        <>
        < Header isLoggedIn='true'/>
        <div className="page">
          <main>
        <div className="card w-500 log-stuff register">
        <div className="card-body logs">
        <h5 className="card-title">Welcome to Restify</h5>
        <Form onSubmit={this.logIn} noValidate>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
             <p>{this.state.email_error}</p>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
            />
             <p>{this.state.password_error}</p>
          </FormGroup>
          <Button className="btn btn-primary sign-btn" >Sign In</Button>
        </Form>
       <Link to='/register'>Don't have an account yet?</Link>
            
        </div>
        </div>
        </main>
        </div>
        </>
      );
    }

}


export default Login
