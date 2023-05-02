import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';


const schema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  score: z.number(),
})

type ReviewFormData = z.infer<typeof schema>;
     
interface Props{
  onSubmit:(data: ReviewFormData)=>void
}

  

  const ReviewFormValidation = ({onSubmit}: Props) => {
    const {register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>(
        {resolver: zodResolver(schema)}); // now we can remove validation fron nfront od the value below.
    
    //     const rationgOptions = [5,4,3,2,1].map((score, index)=>{
    //   return(
    //     <>
    //       <input
    //           {...register('score', {valueAsNumber: true})}            
    //           id={`rating-${score}`} type="radio" className="form-control"
    //           />
    //       <label htmlFor="score" className="form-label"></label>
    //     </>
    //   )
    // })

  return (
    <form onSubmit={handleSubmit(data=>{
        onSubmit(data);
        reset();
        })}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
              {...register('title')}
              id='title' 
              type="text" 
              className="form-control" 
              />
        {errors.title && <p className='text-danger'>{errors.title.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <input
              {...register('description')}
              id='description' 
              type="text" 
              className="form-control" 
              />
        {errors.description && <p className='text-danger'>{errors.description.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="score" className="form-label">Score</label>
          <input
              {...register('score', {valueAsNumber: true})}            
              id="age" type="number" className="form-control"
              />
              {/* {rationgOptions} */}
        {errors.score && <p className=''>{errors.score.message}</p>}
        </div>

       
        <div className="mb-2">
          <button className="">Submit</button>
        </div>
      </form>
  )
}

export default ReviewFormValidation