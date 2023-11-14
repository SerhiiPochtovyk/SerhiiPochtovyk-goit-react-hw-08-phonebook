import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserThunk } from 'redux/auth/operations';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import img_1 from '../images/img_1.jpg';
import { FcCellPhone } from "react-icons/fc";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Register = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submit = async data => {
    try {
      await dispatch(registerUserThunk(data)).unwrap();
      Notify.success(`${data.name}, welcome to your Phonebook!`);
      navigate('/contacts');
    } catch (error) {
      Notify.failure('Sorry, registration failed');
    }
    reset();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center flex-wrap relative transition duration-150 ease-in-out ">
      <div
        className="absolute inset-0 bg-cover bg-center min-h-screen flex items-center justify-center "
        style={{
          backgroundImage: `url(${img_1})`,
          filter: 'blur(8px)',
          opacity: '0.7',
        }}
      />

      <div className=" bg-white text-center p-6 rounded-md max-w-md w-full m-4 relative z-10 border-solid border-2 border-sky-500 ">
        <form onSubmit={handleSubmit(submit)} className="">
          <FcCellPhone
            size={60}
            style={{
              color: '#fda403',
              margin: '0 auto',
              marginBottom: '16px',
            }}
          />
          <input
            {...register('name', { required: 'This field is required' })}
            className={`input input-bordered input-info w-full max-w-xs mb-6 ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Name"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
          <input
            {...register('email', { required: 'This field is required' })}
            className={`input input-bordered input-info w-full max-w-xs mb-6 ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Email"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
          <input
            type="password"
            {...register('password', { required: 'This field is required' })}
            className={`input input-bordered input-info w-full max-w-xs mb-6 ${
              errors.password ? 'border-red-500' : ''
            }`}
            placeholder="Password"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
          <button
            type="submit"
            className="mx-auto px-6 py-2 bg-sky-500 text-white p-2 flex items-center justify-center hover:bg-sky-600 rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
          >
            Register
          </button>
          <p className="mt-2 text-sm text-[16px] ">
            Already have an account?
            <span className=" ml-2 text-sky-500 underline decoration-1 hover:text-yellow-500 text-[16px] transition-all duration-300 ease-in-out cursor-pointer">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
