import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Airline from '../Airlines/Airline';
import NewAirlineForm from './NewAirlineForm';

const API_URL = "http://localhost:3000/api/v1/airlines"

const Airlines = () => {
    const [errors, setErrors] = useState([]);
    const [airlines, setAirlines] = useState([
      { id: 0,
        type: "airline",
        attributes:{
          name:'',
          image_url: ''
      }}
    ]);

    const [newAirline, setNewAirline] = useState({});
    useEffect(()=>{
        let mounted = true; 
        axios.get(API_URL).then(res=>{
            if(mounted){
                console.log(res.data.data)
                setAirlines(res.data.data);
              }
            }).catch(err=>err.message);
            return ()=>{(mounted = false)};
          }, [airlines.length]);

    const list = airlines.map(airline=>(
        <li key={airline.attributes.name}>
            <Airline airline={airline}/>
        </li>
        )
    )
    const onLogout = () => localStorage.clear()

    const handleSubmitNewAirline = (data: any)=>{
      const assignedNewAirline = {
        name: data.name,
        image_url: data.image_url
      
      }

      axios.post('http://localhost:3000/api/v1/airlines', (assignedNewAirline))
      .then((res) => {
        const included = [...airlines, res.data.data]
        setAirlines(included)
        setNewAirline({name: '', image_url: ''})
      })
      .catch(err=>{
        setErrors(err.message);
      })}

    const handleNewAirline = () => <NewAirlineForm onSubmit={(data) => console.log('test')} />

  return(
    <div className='home'>
        <div className='header'>
            <h1>Open flights</h1>
            <div className='subheader'>Honest, unbaised airlines</div>
            <button onClick={onLogout}>logout</button>
            <Link to={`/login`}>login</Link>
            <Link to={`/signup`}>signup</Link>
            <Link to={`/airlines/new`}>Add New Airline</Link>
            {/* <button onClick={()=><NewAirlineForm onSubmit={(data) => console.log('test')}/>}>Add New Airline</button> */}

        </div>
        <div className='grid'>
            <ul>{list}</ul>
        </div>
    </div>
  )
  }

export default Airlines