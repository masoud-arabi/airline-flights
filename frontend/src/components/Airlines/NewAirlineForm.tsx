import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';


const schema = z.object({
    name: z.string().min(3).max(50),
    image_url: z.string().min(3).max(50)
})

type AirlineFormData = z.infer<typeof schema>;
     
interface Props{
  onSubmit:(data: AirlineFormData)=>void
}
  

  const ReviewFormValidation = ({onSubmit}: Props) => {
    const {register, handleSubmit, reset, formState: { errors } } = useForm<AirlineFormData>(
        {resolver: zodResolver(schema)});

  return (
    <form onSubmit={handleSubmit(data=>{
        onSubmit(data);
        reset();
        })}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">name</label>
          <input
              {...register('name')}
              id='name' 
              type="text" 
              className="form-control" 
              />
        {errors.name && <p className='text-danger'>{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="image_url" className="form-label">image_url</label>
          <input
              {...register('image_url')}
              id='image_url' 
              type="text" 
              className="form-control" 
              />
        {errors.image_url && <p className='text-danger'>{errors.image_url.message}</p>}
        </div>
       
        <div className="mb-2">
          <button className="">Submit</button>
        </div>
      </form>
  )
}

export default ReviewFormValidation