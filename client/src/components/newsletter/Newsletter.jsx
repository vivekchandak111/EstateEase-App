import React from 'react';
import classes from './newsletter.module.css'
import {FiSend} from 'react-icons/fi'

export default function Newsletter() {
  return (
    <div className={classes.container}>
       <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Want to get the latest offers?</h5>
          <h2>Please provide ur email id</h2>
        </div>
        <div className={classes.inputContainer}>
          <input type="email" placeholder='Enter Your EmailId'/>
          <FiSend className={classes.sendIcon}/>
        </div>
       </div>
    </div>
  );
}
