import './style.css'
import logo from '../../../assets/logo.png'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Header(props) {
  let navigate = useNavigate(); 
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState(0)
  const [numGuests, setNumGuests] = useState(0)
  const [numBaths, setNumBaths] = useState(0)
  const search = () => {
    let state = {}
    if (location !== '') {
      state['location'] = location
    }
    if (maxPrice > 0) {
      state['maxPrice'] = maxPrice
    }
    if (numGuests > 0) {
      state['numGuests'] = numGuests
    }
    if (numBaths > 0) {
      state['numBaths'] = numBaths
    }
    console.log(state)
    navigate('/', {state})
  }

  const logOut = () => {
    axios.post("http://127.0.0.1:8000/accounts/logout/", {refresh_token: localStorage.getItem('refresh_token')}, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then(res => {
      console.log(res);
      console.log(res.data.access);
      // const token  = res.data.access;
      // localStorage.setItem('token',  token);

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
  }
  
  return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div className="d-flex align-items-center">
                  <a className="nav-link active" href="index.html" ><img id="home" src={logo} alt="Logo"/></a>
                  <a className="navbar-brand" href="index.html">Restify</a>
                </div>
                <div className="shadow-sm search-filter bg-white d-flex align-items-center p-1">
                  <input type="text" placeholder="Location" className="form-control shadow-none border-0 large-search" onChange={(e) => setLocation(e.target.value)}/>
                  <input type="number" step="1" placeholder="Max Price" className="form-control shadow-none border-0 large-search" onChange={(e) => setMaxPrice(e.target.value)}/>
                  <input type="number" step="1" placeholder="Add Guests" className="form-control shadow-none border-0 large-search" onChange={(e) => setNumGuests(e.target.value)}/>
                  <input type="number" step="1" placeholder="Bathrooms" className="form-control shadow-none border-0 large-search" onChange={(e) => setNumBaths(e.target.value)}/>

                  <button type="button" className="btn btn-outline-secondary border-0 small-search" data-bs-toggle="modal" data-bs-target="#searchModal">
                    Search...
                  </button>
                  
                  <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="searchModalLabel">Search Options</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <input type="text" placeholder="Location" className="form-control shadow-none mb-1" onChange={(e) => setLocation(e.target.value)}/>
                          <input type="number" step="1" placeholder="Max Price" className="form-control shadow-none mb-1" onChange={(e) => setMaxPrice(e.target.value)}/>
                        <input type="number" step="1" placeholder="Add Guests" className="form-control shadow-none mb-1" onChange={(e) => setNumGuests(e.target.value)}/>
                        <input type="number" step="1" placeholder="Bathrooms" className="form-control shadow-none mb-1" onChange={(e) => setNumBaths(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" onClick={search}  className="btn btn-primary ">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div><button type="button" onClick={search} className="btn btn-primary m-1 rounded-circle search-button"><i className="bi bi-search"></i></button></div>
                </div>
                {props.isLoggedIn ?
                    <div className="d-flex align-items-center">
                    <i className="bi bi-bell-fill m-1 w-150 fs-3"></i>
                  <div className="dropdown">
                  <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                    <i className="bi bi-person-fill m-4 w-150 fs-3"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end me-1">
                    <li><a className="dropdown-item" href="add-new-property.html">My Properties</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="no-reservations.html">My Reservations</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="profile.html">My Profile</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" onClick={logOut}>Log Out</a></li> 
                  {/* href="signed-out.html"  */}
                  </ul>
                  </div> 
                </div> :
                    <div className="d-flex align-items-center">
                    <div className="dropdown">
                    <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                      <i className="bi bi-person-fill m-4 w-150 fs-3"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end me-1">
                      <li><a className="dropdown-item" href="login.html">Log In</a></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li><a className="dropdown-item" href="sign-up.html">Sign Up</a></li>
                    </ul>
                  </div> 
                  </div>
                }
           
              </div>
          </nav>
        </>
    );
}

export default Header;