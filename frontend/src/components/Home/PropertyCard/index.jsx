import './style.css'
import {useNavigate} from 'react-router-dom';

function PropertyCard(props) {
  const navigate = useNavigate()
    return (
        <>
            <div className="card e-card">
            <img className="card-img-top e-card-img-top" src={props.property.images[0]}/>
            <div className="card-body e-card-body">
              <h5 className="card-title">{props.property.title}</h5>
              <p className="card-text">{props.property.location}</p>
              <p className="card-text font-weight-bold">${props.property.price}/night</p>
              <button onClick={() => navigate(`/property/${props.property.id}`)} className="btn btn-primary mt-1">View more</button>
            </div>
          </div>
        </>
    );
}

export default PropertyCard;