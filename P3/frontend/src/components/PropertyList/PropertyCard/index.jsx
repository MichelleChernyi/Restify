import './style.css'

function PropertyCard(props) {
    return (
        <>
            <div class="card">
            <img class="card-img-top" src={props.image}/>
            <div class="card-body">
              <h5 class="card-title">{props.title}</h5>
              <p class="card-text">{props.location}</p>
              <p class="card-text font-weight-bold">${props.price}/night</p>
              <a href="#" class="btn btn-primary mt-1">View more</a>
            </div>
          </div>
        </>
    );
}

export default PropertyCard;