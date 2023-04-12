import './style.css'

function PropertyCard(props) {
    return (
        <>
            <div className="card">
            <img className="card-img-top" src={props.image}/>
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">{props.location}</p>
              <p className="card-text font-weight-bold">${props.price}/night</p>
              <a href="#" className="btn btn-primary mt-1">View more</a>
            </div>
          </div>
        </>
    );
}

export default PropertyCard;