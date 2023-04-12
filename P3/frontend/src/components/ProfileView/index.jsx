import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import Header from "../Common/Header";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import './style.css'
import axios from 'axios';

function ProfileView(props) {
    const {id} = useParams()
    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState()
    // const [avatar, setAvatar] = useState() 
 
    
    useEffect(()=>{
        console.log(id)
        fetch(`http://localhost:8000/accounts/profile/?id=${id}`, {headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
          .then(response => response.json())
          .then(body => {
            console.log(body)
            console.log(body.phone_num)
            setFirstName(body.first_name)
            setlastName(body.last_name)
            setEmail(body.email)
            setPhone(body.phone_num)

            
            })
        }, [])


    return (
        <>
        <Header/>
        <div className="profile">
              <div className="card border-0 profile-card profile-image">
                <div className="card-body profile-body">
                </div>
              </div>
              <div className="card profile-card">
                <div className="card-body profile-body">
                  <h1 id="profile-title"> Hi, I'm {firstName} {lastName}</h1>
                  
                  <p> {email}</p>
                  <p>{phone}</p>
                  

                </div>
              </div>
              </div>
        </>
      );
}

export default ProfileView;