import React, { useState } from 'react'
import NewAirlineForm from './NewAirlineForm'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

const NewAirlines = () => {
    const[airline, setAirline] = useState('');
    const handleSubmitNewAirline = (data: any)=>{
        const assignedNewAirline = {
          name: data.name,
          image_url: data.image_url
        
        }
  
        axios.post('http://localhost:3000/api/v1/airlines', (assignedNewAirline))
        .then((res) => {
            setAirline(res.data)
            console.log(res);
        })
        .catch(err=>{
            // setErrors(err.message);
            console.log(err.message);
        })} 
  return (
    <>
    {!airline && <NewAirlineForm onSubmit={(data) => handleSubmitNewAirline(data)}/>}
    {airline && <Navigate to="/" />}
    </>
  )
}

export default NewAirlines