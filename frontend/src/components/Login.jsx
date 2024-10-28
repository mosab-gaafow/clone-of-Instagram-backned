import React, { useState } from 'react'
import { useLoginMutation } from '../features/api/authApiSlice';

import {useSelector, useDispatch} from 'react-redux'
import { setCredentials } from '../features/appSlices/authSlice';
// useSelector: wxa loogu talagalay ina ku aqriso any state oo app kaada kamid ah oo redux ku hayo
// useDispatch: wxa lagu talagalay in lagu fuliyo actions-ka
// marka rabo actions sida deletePost,createPost waxa u wacanaa "useDispatch"
// marka aan helaayo cart-ga mxa kujiro
export default function Login() {

  const [email, setEmail] = useState('gaafow40@gmail.com');
  const [password, setPassword] = useState('gafow121212');

// mutation-ka waaarray
  const [login] = useLoginMutation();
  
  // useDispatch
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state) => state.auth);

  // console.log("state waa: ", state);
  
  // marku login dhaho dispatch wac
  

  // form
  const handleSubmit = async(e) => {
    e.preventDefault();

    const {error, data} = await login({email,password});
    console.log("waa data",data)

    if(!error){
      console.log("Success")
      dispatch(setCredentials({...data})) // state-ka wxi ku jiray wxba haka tirin

    }else{
      console.log("Cilad")
    }

  } 

  return (
    <div>
      <h1 className='text-blue-400'>{userInfo?.username}</h1>
      <form onSubmit={handleSubmit}>
        <h2 className='font-mono '>Login Form</h2>
        <div className='m-6 flex justify-center'>

        <input 
        className=' m-2 border border-blue-500' type="email" placeholder='Enter your Email' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        
        <input className=' m-2 border border-blue-500' type="password" placeholder='Enter your Password'  
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        
        <button className=' border   bg-green-500' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
