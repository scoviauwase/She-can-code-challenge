import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CircularProgress } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import SimbaLogo from '../../components/markup/Logo';
import Header from '../../components/reusable/Header';
import TextField from '../../components/reusable/TextField';
import Alert from '../../components/reusable/Alert';
import { authenicateUser } from '../../store/actions/auth/auth';
import { clearErrors } from '../../store/actions/errors/errors';
import { AppState } from '../../store/types';

export enum AuthState {
  login,
  signup,
}

const Auth = () => {
  const dispatch = useDispatch();
  const { message, isLoading } = useSelector(
    (state: AppState) => state.auth,
    shallowEqual,
  );
  const { error } = useSelector(
    (state: AppState) => state.errors,
    shallowEqual,
  );
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [authState, setAuthState] = useState(AuthState.login);
  const [type, setType] = useState('password');
  // Form validations
  const validationSchema = Yup.object().shape({
    name:
      authState === AuthState.login
        ? Yup.string().label('Name')
        : Yup.string().required().label('Name'),
    email: Yup.string().required().label('Email'),
    password: Yup.string().required().min(8).max(24).label('Password'),
  });
  // End of Form validations

  const handleAuthentication = (values) => {
    dispatch(authenicateUser(values, authState));
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.push('/dashboard');
    }
  });
  return (
    <>
      <Header title={authState === AuthState.login ? 'Welcome' : 'Signup'} />

      <div className='flex h-screen w-screen justify-between items-start md:flex-row flex-col'>
        <div className='md:flex hidden h-screen justify-center items-center w-full bg-gradient-to-r from-gray-100 to-gray-500 hover:from-gray-500 hover:to-gray-300'>
          <SimbaLogo />
          <span className='text-4xl italic font-bold mx-2 cursor-pointer'>
            SIMBA
          </span>
        </div>
        <div className='flex flex-col h-screen justify-center items-center w-full bg-gray-100'>
          <div className='flex flex-col justify-center items-center rounded-lg p-10 bg-white shadow-lg'>
            <SimbaLogo />
            {authState === AuthState.signup ? (
              <span className='font-bold capitalize my-3'>
                create an account
              </span>
            ) : (
              <span className='font-bold capitalize my-3'>Login</span>
            )}
            {error.length ? (
              <div className='w-64 mx-auto'>
                <Alert severity='error' text={error} />
              </div>
            ) : null}
            {message.length ? (
              <div className='w-64 mx-auto'>
                <Alert severity='success' text={message} />
              </div>
            ) : null}
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              onSubmit={handleAuthentication}
              validationSchema={validationSchema}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className='flex flex-col justify-center items-center rounded-lg p-10'
                >
                  {authState === AuthState.signup ? (
                    <>
                      <TextField
                        icon={<BadgeOutlinedIcon />}
                        name='name'
                        isShownPassword={isShownPassword}
                        type='text'
                        placeholder='FullName'
                        onBlur={handleBlur('name')}
                        onChange={handleChange('name')}
                        value={values.name}
                        borderClasses={
                          touched.name && errors.name ? 'border-red-100' : ''
                        }
                      />
                      {touched.name && errors.name && (
                        <Alert
                          severity='error'
                          text={`${errors.name}`}
                          classes='w-64'
                        />
                      )}
                    </>
                  ) : (
                    ''
                  )}
                  <>
                    <TextField
                      icon={<MailOutlineOutlinedIcon />}
                      name='email'
                      isShownPassword={isShownPassword}
                      type='text'
                      placeholder='Email'
                      onBlur={handleBlur('email')}
                      onChange={handleChange('email')}
                      value={values.email}
                      borderClasses={
                        touched.email && errors.email ? 'border-red-100' : ''
                      }
                    />
                    {touched.email && errors.email && (
                      <Alert
                        severity='error'
                        text={`${errors.email}`}
                        classes='w-64'
                      />
                    )}
                  </>
                  <>
                    <TextField
                      icon={<LockOpenOutlinedIcon />}
                      isPasswordField={true}
                      name='password'
                      isShownPassword={isShownPassword}
                      type={type}
                      placeholder='Password'
                      onBlur={handleBlur('password')}
                      onChange={handleChange('password')}
                      value={values.password}
                      borderClasses={
                        touched.password && errors.password
                          ? 'border-red-100'
                          : ''
                      }
                      handleShowPassword={() => {
                        if (type === 'password') {
                          setType('text');
                        } else if (type === 'text') {
                          setType('password');
                        }
                        setIsShownPassword(!isShownPassword);
                      }}
                    />
                    {touched.password && errors.password && (
                      <Alert
                        severity='error'
                        text={`${errors.password}`}
                        classes='w-64'
                      />
                    )}
                  </>
                  {authState === AuthState.signup ? (
                    <p className='my-2'>
                      Already have an account?
                      <a
                        className='no-underline cursor-pointer mx-1'
                        onClick={() => {
                          if (authState === AuthState.signup) {
                            setAuthState(AuthState.login);
                          }
                        }}
                      >
                        Login
                      </a>
                    </p>
                  ) : (
                    <p className='my-2'>
                      Don't have an account?
                      <a
                        className='no-underline cursor-pointer mx-1'
                        onClick={() => {
                          if (authState === AuthState.login) {
                            setAuthState(AuthState.signup);
                          }
                        }}
                      >
                        SignUp
                      </a>
                    </p>
                  )}
                  <button
                    className='bg-blue-500 px-3 py-2 rounded-md text-white my-3 flex flex-row justify-center items-center'
                    type='submit'
                    // onClick={() => Router.push('/dashboard')}
                  >
                    {isLoading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {authState === AuthState.signup ? (
                      <span className='ml-1'>SignUp</span>
                    ) : (
                      <span className='ml-1'>Login</span>
                    )}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
