import React from 'react';
import type { NextPage } from 'next';

import Auth from './auth';

const Home: NextPage = () => {
  return (
    <>
      <Auth />
    </>
  );
};

export default Home;
