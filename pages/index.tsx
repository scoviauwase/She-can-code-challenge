import React from 'react';
import type { NextPage } from 'next';

import Header from '../components/markup/Header';

const Home: NextPage = () => {
  return (
    <>
      <Header title='Welcome' />
      <div className='flex h-screen justify-center items-center'>
        <h1 className='capitalize'>Work in progress</h1>
      </div>
    </>
  );
};

export default Home;
