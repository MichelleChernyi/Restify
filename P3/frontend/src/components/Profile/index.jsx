import React, { Component, useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
// import signupCSS from './signup.css';
import style from './style.css';
import {Link, useParams, Navigate, useNavigate, Route} from "react-router-dom";
import Header from '../Common/Header';
// import Parse from 'parse/dist/parse.min.js';

// States for registration
// const [firstName, setFirstName] = useState('');
// const [lastName, setLastName] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [phone, setPhone] = useState('');
// const [avatar, setAvatar] = useState('');
// const [error, setError] = useState(false);

// avatar:"",

// const getCurrentUser = async function () {
//     const currentUser = await Parse.User.current();
//     console.log(currentUser)
//     // Update state variable holding current user
//     // setCurrentUser(currentUser);
//     return currentUser;
//   };

class Profile extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: "",first_name: "", last_name: "", phone_num: "", avatar: "", email_error: "", first_name_error: "", last_name_error: "", phone_num_error: "", avatar_error: "", new_image: ""
        
      };
    }

    onChange = e => {
        if (e.target.name == 'avatar'){
            console.log("entered if")
            console.log(e.target.files[0])
            this.setState({ avatar:e.target.files[0]});
              
        }else{
            this.setState({ [e.target.name]: e.target.value });
        }
      
    };

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/accounts/profile/",{headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({ email: res.data.email }); 
          this.setState({ first_name: res.data.first_name }); 
          this.setState({ last_name: res.data.last_name}); 
          this.setState({ phone_num: res.data.phone_num }); 
          if(res.data.avatar !== null && res.data.avatar !== ""){
            this.setState({ new_image: res.data.avatar}); 
          }
  
          
        })
        .catch(err => {
          console.log(err.response.data)
          console.log(err.response.data)
        //   this.setState({ email_error: "" }); 
        //   this.setState({ first_name_error: "" }); 
        //   this.setState({ last_name_error: "" }); 
        //   this.setState({ password_error:"" });
        //   this.setState({ password2_error: ""}); 
        //   this.setState({ phone_num_error: ""}); 
        //   for (var key in err.response.data) {
        //     if( key === 'email'){
        //       this.setState({ email_error: err.response.data[key] }); 
        //     }
        //     if( key === 'first_name'){
        //       // this.setState({ email_error: err.response.data[key]});
        //       this.setState({ first_name_error: err.response.data[key] }); 
        //     }
        //     if( key === 'last_name'){
        //       // this.setState({ email_error: err.response.data[key]});
        //       this.setState({ last_name_error: err.response.data[key] }); 
        //     }
        //     if( key === 'password' || key === 'non_field_errors'){
        //       // this.setState({ email_error: err.response.data[key]});
        //       this.setState({ password_error: err.response.data[key] }); 
        //     }
        //     if( key === 'password2'){
        //       // this.setState({ email_error: err.response.data[key]});
        //       this.setState({ password2_error: err.response.data[key] }); 
        //     }
        //     if( key === 'phone_num'){
        //       // this.setState({ email_error: err.response.data[key]});
        //       this.setState({ phone_num_error: err.response.data[key] }); 
        //     }
  
        //     console.log("Key:" + key);
        //     console.log("Value:" + err.response.data[key]);
        //   }
  
    
  
      
      });
      }
       onSubmit = async () => {
        var formData = new FormData();
        formData.append('email', this.state.email)
        formData.append('first_name', this.state.first_name)
        formData.append('last_name', this.state.last_name)
        formData.append('phone_num', this.state.phone_num)
        formData.append('avatar', this.state.avatar)

        await axios.put("http://127.0.0.1:8000/accounts/profile/", formData,{headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({ email: res.data.email }); 
          this.setState({ first_name: res.data.first_name }); 
          this.setState({ last_name: res.data.last_name }); 
          this.setState({ phone_num: res.data.phone_num }); 
          this.setState({ avatar: res.data.avatar }); 
          console.log('avatar: ',this.state.avatar )
  
          
        })
        .catch(err => {
          console.log(err.response.data)
          console.log(err.response.data)
          this.setState({ email_error: "" }); 
          this.setState({ first_name_error: "" }); 
          this.setState({ last_name_error: "" }); 
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
        <h5 className="card-title card-t">Profile</h5>
        {/* <img src={"http://127.0.0.1:8000/" + this.state.avatar}></img> */}
        <i class="bi bi-person-circle"></i>
        <Form onSubmit={this.onSubmit} noValidate>
          <FormGroup>
            <Label for="name">First Name:</Label>
            <Input
              type="text"
              name="first_name"
              onChange={this.onChange}
              value={this.state.first_name}
            />
            {/* <p>{this.state.first_name_error[0]}</p> */}
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
             {/* <p>{this.state.email_error[0]}</p> */}
          </FormGroup>
        
          <FormGroup>
            <Label for="phone">Phone:</Label>
            <Input
              type="number"
              name="phone_num"
              onChange={this.onChange}
              value={this.state.phone_num}
            />
             {/* <p>{this.state.phone_num_error[0]}</p> */}
          </FormGroup>
          <FormGroup>
            <Label for="avatar">Avatar:</Label>
            <Input
              type="file"
              name="avatar"
              onChange={this.onChange}
              
            />
             {/* <p>{this.state.phone_num_error[0]}</p> */}
          </FormGroup>
          <Button className="btn btn-primary sign-btn" >Update</Button>
        </Form>
            
        </div>
        </div>
        </main>
        </div>
        </>
      );
    }

}


export default Profile
