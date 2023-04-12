import React, { Component, useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
import './style.css';
import {Link, useParams, Navigate, useNavigate, Route} from "react-router-dom";
import Header from '../Common/Header';




class Logout extends Component {
   
    onClick = e => {
        window.location.assign("http://localhost:3000/login/");
      };
    render() {
      return (
        <>
        < Header isLoggedIn='true'/>
        <div class="page">
        <main>
        <div class="card log-stuff">
            <div class="card-body logs">
              <h5 class="card-title">You have been logged out </h5>
              <Button className="btn btn-primary sign-btn" onClick={this.onClick}>Sign In</Button>
            </div>
          </div>
        </main>
      </div>
        </>
      );
    }

}


export default Logout
