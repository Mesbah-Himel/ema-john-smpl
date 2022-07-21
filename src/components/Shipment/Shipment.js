import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser , setLoggedInUser ] = useContext(UserContext)
  const onSubmit = data => {
    console.log('form submitted',data)};

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}> 
      <input  defaultValue={loggedInUser.name}{...register("name", { required: true })} placeholder="Your Name"/>
      {errors.name && <span className='error'>Name is required</span>}

      <input  efaultValue={loggedInUser.email}{...register("emai;", { required: true })} placeholder="Your Email"/>
      {errors.email && <span className='error'>email is required</span>}
      
      <input {...register("address", { required: true })} placeholder="Your Address"/>
      {errors.address && <span className='error'>address is required</span>}

      <input {...register("phnNumber", { required: true })} />
      {errors.phnNumber && <span className='error'>Your Pgone Number is required</span>}

      <input {...register("name", { required: true })} />
      {errors.name && <span className='error'>Name is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;