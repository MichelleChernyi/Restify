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
    const [comment, setComment] = useState()
    const [trigger, setTrigger] = useState(0)
    // const [avatar, setAvatar] = useState() 
 
    
    useEffect(()=>{
        console.log(id)
        fetch(`http://localhost:8000/accounts/profile/${id}`, {headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
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
      }, [trigger]);

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

        
        const postComment = () => {
      
          var bodyd = new FormData();
                      bodyd.append("content", comment);
          axios({
            method: "POST",
            url: `http://localhost:8000/accounts/guest/${id}/comments/`,
            headers: { 
              'Content-type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: bodyd,
            }).then((response) => {
              let temp = trigger
                setTrigger(temp + 1)
            });
        }

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
                {comments.length > 0 && <div className="row mt-3">
                  <h4>Comments</h4>
                  {/* <Comment comment={comments[0]} /> */}
            
                  {comments.map((comment, index) =>
                 
                    <ProfileComment comment={comment} key={index}/>
                  )}
                  
                 
              </div>}
              {console.log(canComment)}
              {canComment && <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">Comment</button>}
              
              <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="commentModalLabel">Comment</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <textarea type="text" placeholder="Comment..." className="form-control shadow-none mb-1" onChange={(e) => setComment(e.target.value)}></textarea>

                        </div>
                        <div className="modal-footer">
                          <button type="button"  className="btn btn-primary " data-bs-dismiss="modal" onClick={() => postComment()}>Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
                </div>

              </div>
              
              </div>

        </>
      );
}

export default ProfileView;