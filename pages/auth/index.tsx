import React, { useState } from 'react';
import Router from 'next/router';

import SimbaLogo from '../../components/markup/Logo';
import Header from '../../components/reusable/Header';
import TextField from '../../components/reusable/TextField';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

enum AuthState {
  login,
  signup,
}

const Auth = () => {
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [authState, setAuthState] = useState(AuthState.login);
  const [type, setType] = useState('password');
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
            {authState === AuthState.signup ? (
              <TextField
                icon={<BadgeOutlinedIcon />}
                name='name'
                isShownPassword={isShownPassword}
                type='text'
                placeholder='FullName'
              />
            ) : (
              ''
            )}
            <TextField
              icon={<MailOutlineOutlinedIcon />}
              name='email'
              isShownPassword={isShownPassword}
              type='text'
              placeholder='Email'
            />
            <TextField
              icon={<LockOpenOutlinedIcon />}
              isPasswordField={true}
              name='password'
              isShownPassword={isShownPassword}
              type={type}
              placeholder='Password'
              handleShowPassword={() => {
                if (type === 'password') {
                  setType('text');
                } else if (type === 'text') {
                  setType('password');
                }
                setIsShownPassword(!isShownPassword);
              }}
            />
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
              className='bg-blue-500 px-3 py-2 rounded-md text-white my-3'
              onClick={() => Router.push('/dashboard')}
            >
              {authState === AuthState.signup ? 'SignUp' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
