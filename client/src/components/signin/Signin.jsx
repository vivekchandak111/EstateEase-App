import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'
import classes from './signin.module.css'

export default function Signin() {
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const options = {
        "Content-Type": "application/json"
      }
      const data = await request('/auth/login', "POST", options, { email, password })
      dispatch(login(data))
      navigate('/')
      }catch(error){
        console.log(error)
      }
    }


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Enter your mail' onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit">Please Sign in</button>
          <p>Dont have an account<Link to='/signup'>Sign up</Link></p>
        </form>
      </div>
        
    </div>
  );
  }