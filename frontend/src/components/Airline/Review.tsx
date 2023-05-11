interface Props{
    auth: boolean;
    id: number;
    attributes:{
        score: number,
        description: string,
        title: string,
    }
    handleDestroy:(id: number)=>void
    handleEdit:(id: number)=>void
}
const Review = ({auth, id, attributes, handleEdit, handleDestroy}: Props) => {
  return (
    <div className='card'>
        <div className='wrapper-container' key={id}>
            <div className='rating-score'>
                {attributes.score}
            </div>
            <div className='title'>
                {attributes.title}
            </div>
            <div className='descrition'>
                {attributes.description}

            </div>
           
            {auth && <button onClick={()=>handleDestroy(id)}>delete</button>}
            
            {auth && <button onClick={()=>handleEdit(id)}>edit</button>}
            {/* <Link to={`/reviews/${id}`}>edit</Link> */}
        </div>
    </div>
  )
}

export default Review