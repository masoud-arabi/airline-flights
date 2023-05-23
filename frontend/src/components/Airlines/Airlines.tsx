import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Airline from '../Airlines/Airline';
import NewAirlineForm from './NewAirlineForm';
import Pagination from './Pagination';
import SearchForm from './SearchForm';

const API_URL = "http://localhost:3000/api/v1/airlines"

const Airlines = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
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
        // axios.get(`http://localhost:3000/api/v1/airlines`).then(res=>{
        axios.get(`http://localhost:3000/api/v1/airlines?page=${page}&per_page=${perPage}&keyword=${name}`).then(res=>{
            if(mounted){
                console.log(res.data)
                setAirlines(res.data.data);
                setTotal(res.data.links.total)
              }
            }).catch(err=>err.message);
            return ()=>{(mounted = false)};
          }, [page, name]);

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

    
     const handleNextPage = ()=>{
      setPage(page + 1)
     }
     const handlePrevPage = ()=>{
      setPage(page - 1)
     }
     const handleFirstPage = ()=>{
      setPage(1)
     }
     const handleLastPage = ()=>{
      setPage(total/perPage)
     }


     const pagination =  (<Pagination 
     currentPage={page}
     handleNextPage={handleNextPage}
     handlePrevPage={handlePrevPage}
     totalPage={Math.round(total/perPage)+1}
     handleLastPage={handleLastPage}
     handleFirstPage={handleFirstPage}
   />)

   const handleSearchName = (data: any)=>{
    setName(data.name)
   }
  return(
    <div className='home'>
      <div>
        {pagination}
      </div>
        <div className='header'>
            <h1>Open flights</h1>
            <div className='subheader'>Honest, unbaised airlines</div>
            <button onClick={onLogout}>logout</button>
            <Link to={`/login`}>login</Link>
            <Link to={`/signup`}>signup</Link>
            <Link to={`/airlines/new`}>Add New Airline</Link>
            {name && <div >{name}
            <button onClick={()=>setName('')}>X</button>
            </div>}
            <SearchForm onSubmit={(data)=>handleSearchName(data)}/>
        </div>
        {list}
      <div>
        {pagination}
      </div>
    </div>
  )
  }

export default Airlines