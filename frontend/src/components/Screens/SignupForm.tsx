import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().min(3).max(50),
  password: z.string()
})

type SignupFormData = z.infer<typeof schema>;

interface Props{
  onSubmit:(data: SignupFormData)=>void
}

const Signup = ({onSubmit}: Props) => {
    const {register, handleSubmit, reset, formState: { errors } } = useForm<SignupFormData>(
        {resolver: zodResolver(schema)}); // now we can remove validation fron nfront od the value below.

  return (
    <form onSubmit={handleSubmit(data=>{
        onSubmit(data);
        reset();
        })}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            {...register('email')}
            id='email' 
            type="text" 
            className="form-control" 
            />
        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">password</label>
          <input
            {...register('password')}     
            id='password' 
            type="text" 
            className="form-control" 
            />
        {errors.password && <p className='text-danger'>{errors.password.message}</p>}
        </div>
       
        <div className="mb-2">
          <button className="">Submit</button>
        </div>
      </form>
  )
}
export default Signup