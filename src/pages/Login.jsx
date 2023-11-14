import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { loginUserThunk } from 'redux/auth/operations';
import { selectIsLoggedIn, selectUsers } from 'redux/auth/selectors';
import img_1 from '../images/img_1.jpg';
import { FcCellPhone } from 'react-icons/fc';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Login = () => {
  const navigate = useNavigate();
  const { name } = useSelector(selectUsers);
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
      const { email, password } = data;
      await dispatch(loginUserThunk({ email, password })).unwrap();
      Notify.success(`${name}, ласкаво просимо назад до вашого телефонного довідника!`);
      navigate('/contacts');
    } catch (error) {
      console.error('Помилка реєстрації:', error);
      Notify.failure('🦄 Вибачте, реєстрація не вдалася');
    } finally {
      reset();
    }
  };
  

  useEffect(() => {
    if (isLoggedIn) {
      Notify.success(
        `${name}, ласкаво просимо назад до вашого телефонного довідника!`
      );
      navigate('/contacts');
    }
  }, [navigate, isLoggedIn, name]);

  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center flex-wrap relative transition duration-150 ease-in-out">
      <div
        className="absolute inset-0 bg-cover bg-center min-h-screen flex items-center justify-center "
        style={{
          backgroundImage: `url(${img_1})`,
          filter: 'blur(8px)',
          opacity: '0.7',
        }}
      />

      <div className="bg-white text-center p-6 rounded-md max-w-md w-full m-4 relative z-10 border-solid border-2 border-sky-500">
        <form onSubmit={handleSubmit(submit)}>
          <FcCellPhone
            size={60}
            style={{
              color: '#fda403',
              margin: '0 auto',
              marginBottom: '16px',
            }}
          />
          <input
            {...register('email', { required: "Це обов'язкове поле" })}
            className={`input input-bordered input-info w-full max-w-xs mb-6 ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Електронна пошта"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            type="password"
            {...register('password', { required: "Це обов'язкове поле" })}
            className={`input input-bordered input-info w-full max-w-xs mb-6 ${
              errors.password ? 'border-red-500' : ''
            }`}
            placeholder="Пароль"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <button
            type="submit"
            className="mx-auto px-6 py-2 bg-sky-500 text-white p-2 flex items-center justify-center hover:bg-sky-600 rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
          >
            Увійти
          </button>

          <p className="mt-2 text-sm text-[16px]">
            Ще не маєте облікового запису?
            <span className="ml-2 text-sky-500 underline decoration-1 hover:text-yellow-500 text-[16px] transition-all duration-300 ease-in-out cursor-pointer">
              <Link to="/register">Зареєструватися</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
