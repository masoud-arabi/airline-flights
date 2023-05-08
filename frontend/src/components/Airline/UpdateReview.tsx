import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  score: z.number(),
})

interface Props{
    id: number;
    attributes:{
        title: string;
        description: string;
        score: number
    };
    onSubmit:(data: ReviewFormData, id: number)=>void;
}

type ReviewFormData = z.infer<typeof schema>;
     

const UpdateReview = ({id, onSubmit, attributes}: Props) => {

    const {register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>(
        {resolver: zodResolver(schema)}); // now we can remove validation fron nfront od the value below.

  return (
    <form onSubmit={handleSubmit((data)=>{
        onSubmit(data, id);
        reset();
        })}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
              {...register('title', {
                value: attributes.title})}
              id='title' 
              type="text" 
              className="form-control" 
              />
              {}
        {errors.title && <p className='text-danger'>{errors.title.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <input
              {...register('description', {
                value: attributes.description})}
              id='description' 
              type="text" 
              className="form-control"
            //   onChange={(e)=> handleInputChange(e)}
              />
        {errors.description && <p className='text-danger'>{errors.description.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="score" className="form-label">Score</label>
          <input
              {...register('score', {valueAsNumber: true,
                value: attributes.score})}            
              id="age" type="number"
              className="form-control"
            //   onChange={(e)=> handleInputChange(e)}
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

export default UpdateReview