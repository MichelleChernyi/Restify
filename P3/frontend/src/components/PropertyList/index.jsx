import {useEffect, useState} from 'react';

function PropertyList(props) {
    const [properties, setProperties] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8000/properties/search/')
          .then(response => response.json())
          .then(body => {
            setProperties([...body.results])})
       }, [])
    return (
        <>
          {properties.map(property =>
            <div>{property.title}</div>
            )}
        </>
    );
}

export default PropertyList;