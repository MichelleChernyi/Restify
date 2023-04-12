import {useEffect, useState} from 'react';
import PropertyCard from './PropertyCard';
import Header from '../Common/Header';
import {useLocation} from 'react-router-dom';
import './style.css'

function PropertyList(props) {
    const [properties, setProperties] = useState([])
    const {state} = useLocation()
    // const [isSearch, setSearch] = useState(false)

    useEffect(()=>{
      let query = '?'
      if (state !== null) {
        
        if (state.location !== undefined) {
          query = query + `location=${state.location}`
        }
        if (state.maxPrice !== undefined) {
          query = query + `price_less_than=${state.maxPrice}`
        }
        if (state.numGuests !== undefined) {
          query = query + `num_guests=${state.numGuests}`
        }
        if (state.numBaths !== undefined) {
          query = query + `num_baths=${state.numBaths}`
        }
        
      }
      if (query === '?') {
        query = ''
      } 
      fetch(`http://localhost:8000/properties/search/${query}`)
        .then(response => response.json())
        .then(body => {
          setProperties([...body.results])
          })
      }, [state])

    const findQueryParams = () => {
      let query = '?'
      if (state !== null) {
        
        if (state.location !== undefined) {
          query = query + `location=${state.location}`
        }
        if (state.maxPrice !== undefined) {
          query = query + `price_less_than=${state.maxPrice}`
        }
        if (state.numGuests !== undefined) {
          query = query + `num_guests=${state.numGuests}`
        }
        if (state.numBaths !== undefined) {
          query = query + `num_baths=${state.numBaths}`
        }
        
      }
      // if (query === '?') {
      //   query = ''
      // } 
      return query
    }

    const filterHighToLow = () => {
      let query = findQueryParams()
    
      query = query + 'price_high_to_low=True'
      fetch(`http://localhost:8000/properties/search/${query}`)
        .then(response => response.json())
        .then(body => {
          setProperties([...body.results])
          })
    }

    const filterLowToHigh = () => {
      let query = findQueryParams()
    
      query = query + 'price_low_to_high=True'
      fetch(`http://localhost:8000/properties/search/${query}`)
        .then(response => response.json())
        .then(body => {
          setProperties([...body.results])
          })
    }
    
    

    return (
        <>
        <Header isLoggedIn='true'/>
        <main>
        {/* <button class="dropdown-title" onClick={() => filterLowToHigh()}>Price Low to High</button> */}
        {/* <button class="dropdown-title" onClick={() => filterHighToLow()}>Price High to Low</button> */}
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle dropdown-title" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Price Filters
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" onClick={() => filterLowToHigh()}>Low to High</button></li>
            <li><button class="dropdown-item" onClick={() => filterHighToLow()}>High to Low</button></li>
          </ul>
        </div>
        <div className='search-results d-flex flex-wrap'>
          {properties.map(property =>
            <PropertyCard property={property}/>
            )}
        </div>
          
        </main>
          
        </>
    );
}

export default PropertyList;