import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Header from "./Header";
import ReviewFormValidation from "./ReviewFormValidation";
import Review from "./Review";

interface RouteParams{
  slug: string;
}

const Airline = () => {
  const [errors, setErrors] = useState([]);

  const [airline, setAirline]= useState({ id: 0,
    type: "airline",
    attributes:{
      name:'',
      image_url: '',
      slug: '',
      avg_score: 0
  }})
  const [reviews, setReviews]= useState([
    { id: 0,
      type: "review",
      attributes:{
        title:'',
        description: '',
        score: 0,
        airline_id: 0
    }}
  ])
  const [review, setReview]= useState(
    {   
      title:'',
      description: '',
      score: 0,
      airline_id: 0
    })
  const [loaded, setLoaded]= useState(false)
  const params = useParams<RouteParams>();

  useEffect(()=>{
    let mounted = true; 
    axios.get(`http://localhost:3000/api/v1/airlines/${params.slug}`).then(res=>{
        if(mounted){
            setAirline(res.data.data);
            setReviews(res.data.included);
            setLoaded(true)

          }
        }).catch(err=>err.message);
        return ()=>{(mounted = false)};
      }, []);

    const handleDestroy = (id: number) => {
      axios.delete(`http://localhost:3000/api/v1/reviews/${id}`)
      .then((res)=>{
        // const included = [...reviews]
        // const index = included.findIndex( (data) => data.id == id )
        // included.splice(index, 1)
        // setReviews(included)
        setReviews(reviews.filter((data) => data.id !== id))

      })
      .catch( data => console.log('Error', data) )
    }

    const handleSubmit = (data) =>{
      const assignedReview = {
        title: data.title,
        description: data.description,
        score: data.score,
        airline_id: parseInt(airline.id)
      
      }
      axios.post('http://localhost:3000/api/v1/reviews', (assignedReview))
      .then((res) => {
        const included = [...reviews, res.data.data]
        setReviews(included)
        setReview({title: '', description: '',score: 0, airline_id: 0})
      })
      .catch(err=>{
          setErrors(err.message);
      })}

      const reviewsShow = reviews.map((item)=>{
        return(
          <Review 
          id={item.id}
          attributes={item.attributes}
          handleDestroy={handleDestroy}
          />
        )
      })

      const avgg_score= (reviews.reduce((a,v) =>  a = a + v.attributes.score, 0 )/reviews.length).toFixed(2)


  return (
    <>
      {loaded &&
        <div className="wrapper">
          <div className="column">
            <Header attributes={airline.attributes} avgg_score={avgg_score}/>
          </div>
          {reviewsShow}
          <br/>
          <div className="reviews">
            <ReviewFormValidation onSubmit={(data)=>handleSubmit(data)}
            />
          </div>
        </div>
      }
    </>
  )
}

export default Airline