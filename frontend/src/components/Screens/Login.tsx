import {z} from 'zod';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Airlines from '../Airlines/Airlines';
const schema = z.object({
  email: z.string().min(3).max(50).regex(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)),
  password: z.number()
})

type LoginFormData = z.infer<typeof schema>;
     

// interface Props{
//     setToken: (data:any)=>void
//   }

const Login = () => {
        const [email, setEmail] = useState('');
        const [token, setToken] = useState('');
        const [error, setError] = useState('');


        
            const handleSubmit =(data:LoginFormData)=>{
                console.log(data)
                // let mounted = true; 
                axios.post(`http://localhost:3000/api/v1/login?email=${data.email}&password=${data.password}`)
                    .then(res=>{
                        setToken(res.data.token)
                        setEmail(res.data.email)
                        // setAuthenticated(true)
                        console.log(res.data)
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('exp', res.data.expired_at);
                        localStorage.setItem('email', res.data.email);
                    }).catch(err=>{
                        console.log(err)

                        if(err.request.status == 0){
                            setError('network error')
                        }else if(err.response.status == 401){
                            setError('please check your email or password')
                        }else if(!err.response){
                                setError('no server response')
                        }else{
                            setError('somthing wrong')

                        }
                    });
                    
                }
                
                return ( 
                    <>
                    {error && <div>{error}</div>}
                    {token && <Navigate to="/" /> }               
                    {!token && <LoginForm onSubmit={(data: any)=>handleSubmit(data)} /> }               
                    </>
                )
    }

export default Login