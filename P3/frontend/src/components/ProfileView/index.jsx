import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import Header from "../Common/Header";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import ProfileComment from "./Comment";

import './style.css'
import axios from 'axios';

function ProfileView(props) {
    const {id} = useParams()
    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState()
    const [comments, setComments] = useState([])
    const [canComment, setCanComment] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [avatar, setAvatar] = useState() 
 
    
    useEffect(()=>{
        console.log(id)
        fetch(`http://localhost:8000/accounts/profile/?id=${id}`, {headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
          .then(response => response.json())
          .then(body => {
            console.log(id)
            console.log(body)
            console.log(body.phone_num)
            setFirstName(body.first_name)
            setlastName(body.last_name)
            setEmail(body.email)
            setPhone(body.phone_num)

            
            })
        }, [])

    useEffect(()=>{
      fetch(`http://localhost:8000/accounts/guest/${id}/comments/`, {headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then(response => response.json())
      .then(body => {
        // console.log(body)
        setComments([...body.results])
        })
      }, [])

      useEffect(() => {
        const loggedInUser = localStorage.getItem("token");
        if (loggedInUser) {
          // const foundUser = JSON.parse(loggedInUser);
          setIsLoggedIn(true);
          
        }
      }, []);

      useEffect(()=>{
        if (isLoggedIn == true) {
          axios({
            method: "GET",
            url: "http://127.0.0.1:8000/properties/reservations/list/",
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            }).then((response) => {
                if (response.data.results.length > 0) {
                  for (var reservation of response.data.results) {
                    if (reservation.prop_owner == id && (reservation.status == 'terminated' || reservation.status == 'completed')) {
                        setCanComment(true)
                    }
                  }
                }
            });
        }
        
        }, [firstName])

        


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
                  
                  <div>
                {comments.length > 0 && <div className="row mt-3 border-bottom">
                  <h4>Comments</h4>
                  {/* <Comment comment={comments[0]} /> */}
            
                  {comments.map((comment, index) =>
                 
                    <ProfileComment comment={comment} key={index}/>
                  )}
                  
                 
              </div>}
              {console.log(canComment)}
              {canComment && <button class='btn btn-primary'>comment</button>}
              </div>
                </div>

              </div>
              
              </div>

        </>
      );
}

export default ProfileView;