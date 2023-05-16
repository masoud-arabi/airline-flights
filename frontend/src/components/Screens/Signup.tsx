import React, { useState } from 'react'
import SignupForm from './SignupForm'
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Signup = () => {
    // const [email, setEmail] = useState('');
    // const [password, setpassword] = useState('');
    const [error, setError] = useState('');

    const [isSignup, setIsSignup] = useState(false);


    
        const handleSubmit = (data: any)=>{
            const assignedParams = {
                user:{
                    email: data.email,
                    password: data.password
                }
              }
              console.log()
            console.log(data)
            axios.post(`http://localhost:3000/api/v1/users`, assignedParams,)
                .then(res=>{
                    console.log(res.data)
                    setIsSignup(true)
                }).catch(err=>{
                    console.log(err)
                    if(!err.response){
                        setError('no server response')
                    }else if(err.response.status == 422){
                        setError('user taken')
                    }else if(err.response.status == 0){
                        setError('netork error')
                    }
                });
                
            }
            

  return (
        <>  {error && <div>{error}</div>}
            {isSignup && <Navigate to="/login" /> }               
            {!isSignup && <SignupForm  onSubmit={(data)=>handleSubmit(data)}/> }               
        </>
  )
}

export default Signup