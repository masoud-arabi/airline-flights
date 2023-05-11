import {z} from 'zod';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Airlines from '../Airlines/Airlines';

const schema = z.object({
  email: z.string().min(3).max(50),
  password: z.number()
})

type LoginFormData = z.infer<typeof schema>;
     

// interface Props{
//     setToken: (data:any)=>void
//   }

const Login = () => {
        const [email, setEmail] = useState('');
        const [token, setToken] = useState('');
        const [authenticated, setAuthenticated] = useState(false);


        
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
                    }).catch(err=>err.message);
                    
                }
                
                return ( 
                    <>
                    {token && <Navigate to="/" /> }               
                    {!token && <LoginForm onSubmit={(data: any)=>handleSubmit(data)} /> }               
                    </>
                )
    }

export default Login