import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate ,Link} from 'react-router-dom';
import classes from './properties.module.css'
import { request } from '../../util/fetchAPI';
import {   continentToIdx, idxToContinent } from '../../util/idxToContinent';
import { arrPriceRanges } from '../../util/idxToPriceRange';
import { AiOutlineSearch } from 'react-icons/ai';
import {FaBed,FaSquareFull} from 'react-icons/fa'
import estate3 from '../../assets/estate3.jpg'


export default function Properties() {
  const [allProperties, setAllProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1) // slice(1) to remove "?"
  const arrQuery = query.split("&")
  const navigate = useNavigate()

  const handleState=(e)=>{
    setState(prev=>{
      return {...prev,[e.target.name]: e.target.value}
    })
  }

  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async() => {
      const data = await request(`/property/getAll`, 'GET')
      setAllProperties(data)
    }
    fetchAllProperties()
  }, [])

  // parsing query params
  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        console.log(option.split('='));
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = { ...formattedQuery, [key]: value }

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          console.log(formattedQuery)
          setState( formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProperties, arrQuery])


const handleSearch=(param=state)=>{
  let options
  if (param?.nativeEvent) {
    options = state
  } else {
    options = param
  }
  const filteredProperties = allProperties.filter((property) => {

    const priceRange = arrPriceRanges[options.priceRange]
    const minPrice = Number(priceRange.split('-')[0])
    const maxPrice = Number(priceRange.split('-')[1])
    const continent = continentToIdx(property.continent)
    
    console.log(continent)
    if (
      property.type === options.type
      && continent === Number(options.continent)
      && property.price >= minPrice && property.price <= maxPrice
    ) {
      return property
    }
    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, { replace: true })
    setFilteredProperties( (prev)=>filteredProperties)


})

}

  return (
    <div className={classes.container}>
       <div className={classes.wrapper}>
         <div className={classes.options}>
         <select value={state?.type} name="type" onChange={handleState}>
                    <option disabled  style={{color:'black'}}>Select Type</option>
                    <option value="beach">Beach</option>
                    <option value="mountain">Mountain</option>
                    <option value="village">Village</option>
                </select>
                <select value={state?.priceRange} name="priceRange" onChange={handleState}>
                    <option disabled  style={{color:'black'}}>Select PriceRange</option>
                    <option value="0">0-1000000</option>
                    <option value="1">1000000-2000000</option>
                    <option value="2">2000000-3000000</option>
                    <option value="3">3000000-4000000</option>
                    <option value="4">4000000-5000000</option>
                </select>
                <select value={state?.continent} name="continent" onChange={handleState}>
                    <option disabled  style={{color:'black'}}>Select Continent</option>
                    <option value="0">Europe</option>
                    <option value="1">Asia</option>
                    <option value="2">Africa</option>
                    <option value="3">South America</option>
                    <option value="4">North America</option>
                    <option value="5">Australia</option>
                </select>
                <button className={classes.searchBtn}>
                <AiOutlineSearch   onClick={handleSearch} className={classes.searchIcon}/>
                </button>
            </div>
            {filteredProperties?.length > 0 ?
          <>
            <div className={classes.titles}>
              <h5>Selected properties</h5>
              <h2>Property you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
               <div key={property._id} className={classes.property}>
                <Link className={classes.imgContainer} to={`/propertyDetail/${property._id}`}>
                  <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
                </Link>
                <div className={classes.details}>
                  <div className={classes.priceAndOwner}>
                    <span className={classes.price}>Rs {property.price}</span>
                    <img src={estate3} className={classes.owner} />
                  </div>
                  <div className={classes.moreDetails}>
                    <span>{property.beds} <FaBed className={classes.icon}/></span>
                    <span>{property.sqmeters} sq. meters <FaSquareFull className={classes.icon}/></span>
                  </div>
                  <div className={classes.desc}>
                    {property.desc}
                  </div>
                </div>
               </div>
              ))}
            </div>
          </> : <h2 className={classes.noProperty}>We have no properties with the specified options.</h2>}
         </div>
       </div>
    
  );
}
