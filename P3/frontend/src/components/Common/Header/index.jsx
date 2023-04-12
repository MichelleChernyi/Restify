import style from './style.css'
import logo from '../../../assets/logo.png'
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Header(props) {
  let navigate = useNavigate(); 
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState(0)
  const [numGuests, setNumGuests] = useState(0)
  const [numBaths, setNumBaths] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [canComment, setCanComment] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      // const foundUser = JSON.parse(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

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
      
      localStorage.clear();
      console.log(res);
      console.log(res.data.access);
      window.location.assign("http://localhost:3000/logout/");

    })
    .catch(err => {
      console.log(err.response.data)
      console.log(err.response.data)
  



    
    
  });
  }

  const logIn = () => {
    window.location.assign("http://localhost:3000/login/");
    
  }

  const signUp = () => {
    window.location.assign("http://localhost:3000/register/");
    
  }

  const profile = () => {
    window.location.assign("http://localhost:3000/profile/");
    
  }

  const notifs = () => {
    window.location.assign("http://localhost:3000/notifications/");
    
  }
  
  return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div className="d-flex align-items-center">
                  <a className="nav-link active" onClick={() => navigate('/')}><img id="home" src={logo} alt="Logo"/></a>
                  <a className="navbar-brand" onClick={() => navigate('/')}>Restify</a>
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
                {isLoggedIn ?
                    <div className="d-flex align-items-center">
                    <i className="bi bi-bell-fill m-1 w-150 fs-3" onClick={notifs}></i>
                  <div className="dropdown">
                  <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                    <i className="bi bi-person-fill m-4 w-150 fs-3"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end me-1">
                    <li><a className="dropdown-item" href="add-new-property.html">My Properties</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="no-reservations.html">My Reservations</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" onClick={profile}>My Profile</a></li>
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
                      <li><a className="dropdown-item" onClick={logIn}>Log In</a></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li><a className="dropdown-item" onClick={signUp}>Sign Up</a></li>
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