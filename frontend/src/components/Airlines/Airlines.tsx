import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Airline from '../Airlines/Airline';

// interface Props{
//     airlines:{
//         id: number,
//         type: string,
//         attributes: {
//             id: number,
//             name: string,
//             image_url: string,
//             slug: string,
//         },
//         relationships: {
//             reviews:{
//                 data:{
//                     id: number,
//                     type: string 
//                 }[],
//             },
//         },
//     }[];

// }
const API_URL = "http://localhost:3000/api/v1/airlines"

const Airlines = () => {
    const [airlines, setArilines] = useState([]);
    useEffect(()=>{
        let mounted = true; 
        axios.get(API_URL).then(res=>{
            if(mounted){
                console.log(res.data.data)
                setArilines(res.data.data);
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
        
  return (
    <div className='home'>
        <div className='header'>
            <h1>Open flights</h1>
            <div className='subheader'>Honest, unbaised airlines</div>
        </div>
        <div className='grid'>
            <ul>{list}</ul>
        </div>
    </div>
  )
}

export default Airlines