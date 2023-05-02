import { useEffect, useState } from 'react';
import Airlines from './components/Airlines/Airlines'
import axios from 'axios';
import Airline from './components/Airline/Airline';

import {
  Route,
  createRoutesFromElements,
} from "react-router-dom";



const API_URL = "http://localhost:3000/api/v1/airlines"
function App() {
  
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
          }, []);
        
        return (
          
            <div></div>
               
))}

export default App
