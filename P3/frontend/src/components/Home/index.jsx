import {useEffect, useState} from 'react';
import PropertyCard from './PropertyCard';
import Header from '../Common/Header';
import {useLocation} from 'react-router-dom';

function PropertyList(props) {
    const [properties, setProperties] = useState([])
    const {state} = useLocation()
    // const [isSearch, setSearch] = useState(false)

    useEffect(()=>{
      let query = '?'
      if (state.location !== undefined) {
        query = query + `location=${state.location}`
      }
      if (state.maxPrice !== undefined) {
        query = query + `price_less_than=${state.maxPrice}`
      }
      if (state.numGuests !== undefined) {
        query = query + `num_guests=${state.numGuests}`
      }
      if (query === '?') {
        query = ''
      }
      fetch(`http://localhost:8000/properties/search/${query}`)
        .then(response => response.json())
        .then(body => {
          setProperties([...body.results])
          console.log(body.results)})
      }, [state])

    return (
        <>
          <Header isLoggedIn='true'/>
          {properties.map(property =>
            <PropertyCard location={property.location} price={property.price} title={property.title} image={property.images[0]}/>
            )}
        </>
    );
}

export default PropertyList;