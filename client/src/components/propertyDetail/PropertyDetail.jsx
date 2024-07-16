import React, { useEffect, useState } from 'react';
import classes from './propertyDetail.module.css'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { request } from '../../util/fetchAPI';
import { FaSquareFull } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBed } from 'react-icons/fa';
import emailjs from '@emailjs/browser'

export default function PropertyDetail() {

  const {user}=useSelector((state)=> state.auth)
  const [PropertyDetail,setPropertyDetail]=useState(null)
  const [showForm,setShowForm]=useState(false)
  const [title,setTitle]=useState('')
  const [desc,setDesc]=useState('')
  const {id}=useParams()
  const formRef=useRef()

  const serviceId=process.env.REACT_APP_SERVICE_ID
  const templateId=process.env.REACT_APP_TEMPLATE_ID
  const publicKey =process.env.REACT_APP_PUBLIC_KEY
  
  console.log(serviceId,templateId)
  useEffect(()=>{
    const fetchDetails=async()=>{
      try {
        const data=await request(`/property/find/${id}`,'GET')
        setPropertyDetail(data)

        
      } catch (error) {
        console.error(error)
        
      }
    }
    fetchDetails()
  },[id])

  const handleCloseForm=()=>{
    setShowForm(false)
    setTitle("")
    setDesc("")
  }

  const handleContactOwner=async(e)=>{
    e.preventDefault()
    //sending email logic
    emailjs.sendForm("service_re92aa5", "template_2qv9usj", formRef.current, 'iVGFwzA5vOjgQ37xw')
    .then((result)=>console.log(result))
    .catch((err)=>console.log(err))

  }
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <img src={`http://localhost:5000/images/${PropertyDetail?.img}`} className={classes.owner}/>
          </div>
          <div className={classes.right}>
            <h3 className={classes.title}>
              TITLE: {`${PropertyDetail?.title}`}
            </h3>
            <div className={classes.details}>
              <div className={classes.typeAndContinent}>
                <div>Type: <span>{`${PropertyDetail?.type}`}</span></div>
                <div>Continent: <span>{`${PropertyDetail?.continent}`}</span></div>
              </div>
              <div className={classes.priceAndOwner}>
                <span className={classes.price}><span>Price : Rs</span>{`${PropertyDetail?.price}`}</span>
                <span style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  Owner <img src={`http://localhost:5000/images/${PropertyDetail?.currentOwner?.img3}`}/>
                </span>
              </div>
              <div className={classes.moreDetails}>
                <span>{PropertyDetail?.beds} <FaBed className={classes.icon}/> </span>
                <span>{PropertyDetail?.sqmeters} <FaSquareFull className={classes.icon}/></span>
              </div>
            </div>
            <p className={desc}>
              Desc : <span>{`${PropertyDetail?.desc}`}</span>
            </p>
            <button onClick={()=>setShowForm(true)} className={classes.contact}>
              Contact Owner
            </button>
          </div>
        </div>
        {
          showForm && (
            <div className={classes.contactForm} onClick={handleCloseForm}>
              <div className={classes.contactFormWrapper} onClick={(e)=> e.stopPropagation()}>
                  <h2>Send Email to Owner</h2>
                  <form  onSubmit={handleContactOwner} ref={formRef}>
                    <input value={user?.email} type="text" placeholder='My Email' name="from_email" />
                    <input  value={user?.username} type="text" placeholder='My Username' name="from_username" />
                    <input  value={PropertyDetail.currentOwner.email}type="email" placeholder='Owner Email' name="to_email" />
                    <input type="text" placeholder='Title' name="from_title" />
                    <input type="text" placeholder='Description' name="message" />
                    <button>Send</button>
                   </form>
                   <AiOutlineClose  onClick={handleCloseForm} className={classes.removeIcon}/>
              </div>
               
              
             

            </div>
          )
        }
    </div>
  );
}
