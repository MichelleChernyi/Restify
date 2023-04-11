import './style.css'
import logo from '../../assets/logo.png'

function Header(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div className="d-flex align-items-center">
                  <a className="nav-link active" href="index.html" ><img id="home" src={logo} alt="Logo"/></a>
                  <a className="navbar-brand" href="index.html">Restify</a>
                </div>
                <div className="shadow-sm search-filter bg-white d-flex align-items-center p-1">
                  <input type="text" placeholder="Location" className="form-control shadow-none border-0 large-search"/>
                  <input type="text" placeholder="Check In" onBlur={() => this.type = 'text'} onFocus={() => this.type = 'date'} className="form-control shadow-none border-0 large-search"/>
                  <input type="text" placeholder="Check Out" onBlur={() => this.type = 'text'} onFocus={() => this.type = 'date'} className="form-control shadow-none border-0 large-search"/>
                  <input type="number" step="1" placeholder="Add Guests" className="form-control shadow-none border-0 large-search"/>

                  <button type="button" className="btn btn-outline-secondary border-0 small-search" data-bs-toggle="modal" data-bs-target="#searchModal">
                    Search...
                  </button>
                  
                  <div className="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="searchModalLabel">Search Options</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <input type="text" placeholder="Location" className="form-control shadow-none mb-1"/>
                          <input type="text" placeholder="Check In" onBlur={() => this.type = 'text'} onFocus={() => this.type = 'date'} className="form-control shadow-none mb-1"/>
                          <input type="text" placeholder="Check Out"  onBlur={() => this.type = 'text'} onFocus={() => this.type = 'date'} className="form-control shadow-none mb-1"/>
                        <input type="number" step="1" placeholder="Add Guests" className="form-control shadow-none mb-1"/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" onClick="location.href='search.html'"  className="btn btn-primary ">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div><a href="search.html" className="btn btn-primary m-1 rounded-circle search-button" type="submit"><i className="bi bi-search"></i></a></div>
                </div>
                {props.isLoggedIn ?
                    <div class="d-flex align-items-center">
                    <i class="bi bi-bell-fill m-1 w-150 fs-3"></i>
                  <div class="dropdown">
                  <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                    <i class="bi bi-person-fill m-4 w-150 fs-3"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end me-1">
                    <li><a class="dropdown-item" href="add-new-property.html">My Properties</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="no-reservations.html">My Reservations</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="profile.html">My Profile</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="signed-out.html">Log Out</a></li>
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