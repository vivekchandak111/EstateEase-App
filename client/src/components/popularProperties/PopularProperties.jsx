import React, { useEffect,useState } from 'react';
import classes from './popularProperties.module.css'
import img1 from '../../assets/realestatebeach.jpg'
import img2 from '../../assets/realestatemountain.jpg'
import img3 from '../../assets/realestatecountryside.jpg'
import {request} from '../../util/fetchAPI'

import {Link} from 'react-router-dom';

export default function PopularProperties() {
  const [numProperties,setNumproperties]=useState({})

  useEffect(()=>{
    const fetchNumberProperties=async()=>{
        try {
            const data=await request('/property/find/types',"GET")
            setNumproperties(data)
            
        } catch (error) {
            console.log(error.message)
            
        }
    }
    fetchNumberProperties()
  },[])

  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <h5>Different Types of properties</h5>
                <h2>Best type of properties for you</h2>
            </div>
            <div className={classes.properties}>
                <Link className={classes.property} to={`/properties?type=beach&continent=1&priceRange=2`}>
                    <img src={img1} />
                    <div className={classes.quantity}>{numProperties?.beach}</div>
                    <h5>Beach Properties</h5>
                </Link>
                <Link  className={classes.property} to={`/properties?type=mountain&continent=1&priceRange=2`}>
                    <img src={img2} />
                    <div className={classes.quantity}>{numProperties?.mountain}</div>
                    <h5>Mountain Properties</h5>
                </Link>
                <Link className={classes.property} to={`/properties?type=village&continent=1&priceRange=2`}>
                    <img src={img3} />
                    <div className={classes.quantity}>{numProperties?.village}</div>
                    <h5> Village Properties</h5>
                </Link>
            </div>
        </div>
    </div>
  );
}
