import './style.css'

function PropertyCard(props) {
    return (
        <>
            <div className="card">
            <img className="card-img-top" src={props.property.images[0]}/>
            <div className="card-body">
              <h5 className="card-title">{props.property.title}</h5>
              <p className="card-text">{props.property.location}</p>
              <p className="card-text font-weight-bold">${props.property.price}/night</p>
              <button href="#" className="btn btn-primary mt-1">View more</button>
            </div>
          </div>
        </>
    );
}

export default PropertyCard;