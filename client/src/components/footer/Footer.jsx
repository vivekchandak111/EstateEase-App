import React from 'react';
import classes from './footer.module.css'

export default function Footer() {
  return (
    <footer>
          <div className={classes.wrapper}>
            <div className={classes.col}>
              <h2>About the App</h2>
              <p>These apps leverage technology to streamline the real estate process and provide users with easy access to property information</p>
            </div>
            <div className={classes.col}>
              <h2>Contact</h2>
              <span>+91 9999999999</span>
            </div>
            <div className={classes.col}>
              <h2>Location</h2>
              <span>Continent :Asia</span>
              <span>Country :India</span>
              <span>Current Location:Banjara Hills</span>
            </div>
          </div>
    </footer>
  );
}
