import React, { useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
import classes from './hero.module.css'
import { useNavigate } from 'react-router-dom';

export default function Hero() {

  const [type,setType]=useState("beach")
  const [continent,setContinent]=useState("0")
  const [PriceRange,setPriceRange]=useState("0")
  const navigate=useNavigate()
  const handleSearch=()=>{
    //navigate to properties
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${PriceRange}`)


  }
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <h2>Let me find your dream place right now</h2>
            <h5>Search the best selection of luxury real estate</h5>
            <div className={classes.options}>
                <select onChange={(e)=>setType(e.target.value)}>
                    <option disabled  style={{color:'black'}}>Select Type</option>
                    <option value="beach">Beach</option>
                    <option value="mountain">Mountain</option>
                    <option value="village">Village</option>
                </select>
                <select  onChange={(e)=>setPriceRange(e.target.value)}>
                    <option disabled  style={{color:'black'}}>Select PriceRange</option>
                    <option value="0">0-1000000</option>
                    <option value="1">1000000-2000000</option>
                    <option value="2">2000000-3000000</option>
                    <option value="3">3000000-4000000</option>
                    <option value="4">4000000-5000000</option>
                </select>
                <select  onChange={(e)=>setContinent(e.target.value)}>
                    <option disabled  style={{color:'black'}}>Select Continent</option>
                    <option value="0">Europe</option>
                    <option value="1">Asia</option>
                    <option value="2">Africa</option>
                    <option value="3">South America</option>
                    <option value="4">North America</option>
                    <option value="5">Australia</option>
                </select>
                <AiOutlineSearch  onClick={handleSearch} className={classes.searchIcon}/>
            </div>
        </div>
    </div>
  );
}
