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


class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
          notifications: "",
          counter:1,
          errors: ""
          
        };
      }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/accounts/notification/list",{headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
          console.log(res);
          console.log(res.data);
          console.log(res.data.results)

          this.setState({ notifications: res.data.results }); 
          var loopData = ''
          for (var key in  res.data.results) {
            loopData += `<p>${res.data.results[key].content}</p> <hr className="line"/>`
            console.log(res.data.results[key].content)
          }
          this.setState({ notifications: loopData }); 
        //   this.setState({ first_name: res.data.first_name }); 
        //   this.setState({ last_name: res.data.last_name}); 
        //   this.setState({ phone_num: res.data.phone_num }); 
  
           
        })
        .catch(err => {
          console.log(err.response.data)
          console.log(err.response.data)
       
  
    
  
      
      });
      }

      Delete = e => {
        e.preventDefault();
        this.setState({ errors: "",  counter: 1  }, () => {
            axios.post(`http://127.0.0.1:8000/accounts/notification/delete/`,{}, {headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            console.log("in here")
          console.log(res);
        //   console.log(res.data);
        //   console.log(res.data.results)

        //   this.setState({ notifications: res.data.results }); 
        //   var loopData = ''
        //   for (var key in  res.data.results) {
        //     loopData += `<p>${res.data.results[key].content}</p> <hr className="line"/>`
        //     // console.log(res.data.results[key].content)
        //   }
           this.setState({ notifications: "" }); 
        //   this.setState({ first_name: res.data.first_name }); 
        //   this.setState({ last_name: res.data.last_name}); 
        //   this.setState({ phone_num: res.data.phone_num }); 
  
          
        })
        .catch(err => {
            
            // this.setState({ errors: "No more pages.", counter: this.state.counter -1}); 
    
  
      });
          }); 
        // this.setState({ counter: this.state.counter +1 }); 
        
      };
      Next = e => {
        e.preventDefault();
        this.setState({ errors: "",  counter: this.state.counter +1  }, () => {
            axios.get(`http://127.0.0.1:8000/accounts/notification/list/?page=${this.state.counter}`,{headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
    
          console.log(res);
        //   console.log(res.data);
        //   console.log(res.data.results)

          this.setState({ notifications: res.data.results }); 
          var loopData = ''
          for (var key in  res.data.results) {
            loopData += `<p>${res.data.results[key].content}</p> <hr className="line"/>`
            // console.log(res.data.results[key].content)
          }
          this.setState({ notifications: loopData }); 
        //   this.setState({ first_name: res.data.first_name }); 
        //   this.setState({ last_name: res.data.last_name}); 
        //   this.setState({ phone_num: res.data.phone_num }); 
  
          
        })
        .catch(err => {
            
            this.setState({ errors: "No more pages.", counter: this.state.counter -1}); 
    
  
      });
          }); 
        // this.setState({ counter: this.state.counter +1 }); 
        
      };

      Prev = e => {
        e.preventDefault();
        this.setState({errors: "", counter: this.state.counter -1  }, () => {
            console.log("counter: ", this.state.counter)
            if(this.state.counter ===1){
                        axios.get(`http://127.0.0.1:8000/accounts/notification/list/`,{headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then(res => {
            
                console.log(res);
                //   console.log(res.data);
                //   console.log(res.data.results)

                this.setState({ notifications: res.data.results }); 
                var loopData = ''
                for (var key in  res.data.results) {
                    loopData += `<p>${res.data.results[key].content}</p> <hr className="line"/>`
                    // console.log(res.data.results[key].content)
                }
                this.setState({ notifications: loopData }); 
                //   this.setState({ first_name: res.data.first_name }); 
                //   this.setState({ last_name: res.data.last_name}); 
                //   this.setState({ phone_num: res.data.phone_num }); 
        
                
        })
        .catch(err => {
            
            this.setState({ errors: "No more pages." }); 
    
  
             });

        }else if (this.state.counter > 1){
            axios.get(`http://127.0.0.1:8000/accounts/notification/list/?page=${this.state.counter}`,{headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
        
              console.log(res);
            //   console.log(res.data);
            //   console.log(res.data.results)
    
              this.setState({ notifications: res.data.results }); 
              var loopData = ''
              for (var key in  res.data.results) {
                loopData += `<p>${res.data.results[key].content}</p> <hr className="line"/>`
                // console.log(res.data.results[key].content)
              }
              this.setState({ notifications: loopData }); 
            //   this.setState({ first_name: res.data.first_name }); 
            //   this.setState({ last_name: res.data.last_name}); 
            //   this.setState({ phone_num: res.data.phone_num }); 
      
              
            })
            .catch(err => {
                
                
        
      
          });
        }else{
            this.setState({  counter: 1 })
        }
            
        }); 
        // this.setState({ counter: this.state.counter +1 }); 
        
      };


    render() {
      return (
        <>
        < Header/>
        <Button className="btn btn-primary erase-btn" onClick={this.Delete}>Erase all notifications</Button> <br></br>
        <ul dangerouslySetInnerHTML={{__html: this.state.notifications}}></ul>
        <Button className="btn btn-primary notif-btn" onClick={this.Next}>Next Page</Button>
        <Button className="btn btn-primary notif2-btn" onClick={this.Prev}>Previous Page</Button>
        <p className='warnings2'>{this.state.errors}</p>
         </>
      );
    }

}


export default Notification
