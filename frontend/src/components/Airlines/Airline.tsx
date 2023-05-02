import React from 'react'
import { Link } from 'react-router-dom';

interface Props{
      airline:{
          id: number,
          type: string,
          attributes: {
              id: number,
              name: string,
              image_url: string,
              slug: string,
              avg_score: number,
          },
          relationships: {
              reviews:{
                  data:{
                      id: number,
                      type: string 
                  }[],
              },
          },
      };
  
  }
const Airline = ({airline}: Props) => {
  return (
    <div className='card'>
      <div className='airline-logo'>
        <img src={airline.attributes.image_url} alt={airline.attributes.name}/>
      </div>
      <div className='airline-name'>{airline.attributes.name}</div>
      <div className='airline-score'>{airline.attributes.avg_score}</div>
      <div className='airline-link'>
        <Link to={`/airlines/${airline.attributes.slug}`}>view airline</Link>
      </div>
    </div>
  )
}

export default Airline