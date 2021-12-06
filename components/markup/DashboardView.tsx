import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import Sidebar from '../../components/markup/Sidebar';
import Header from '../../components/reusable/Header';
import Logout from '../../components/markup/Logout';

const Dashboard = ({ children, title, count }: Props) => {
  const [user, setUser] = useState('');
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      setUser(`${localStorage.getItem('user')}`);
    }
  }, []);
  return (
    <>
      <Header title={title} />
      <div className='flex md:flex-row flex-col h-screen justify-center items-center w-screen'>
        {/* small devices back button */}
        {title !== 'Dashboard' ? (
          <div
            className='flex md:hidden flex-row w-4/12 md:justify-start justify-center items-center  mx-10 px-3 py-2 mb-5 mt-10 bg-blue-500 rounded-md text-white'
            onClick={() => Router.push('/dashboard')}
          >
            <ArrowBackOutlinedIcon /> <span>Dashboard</span>
          </div>
        ) : null}

        {/* end of small devices back button */}
        {/* Logout on small devices */}
        <div className='w-10/12 md:hidden px-4'>
          <Logout classes=' my-10 w-full' />
        </div>

        {/* End of logout handler */}
        <Sidebar count={count ? count : 0} />
        <div className='h-screen w-10/12 flex flex-col justify-start md:items-start items-center'>
          {title === 'Dashboard' ? (
            <div className='hidden md:flex flex-row md:w-11/12 w-full md:justify-start justify-center items-center  mx-10 px-5 mb-5 mt-10'>
              <span>Welcome,</span>
              <span className='font-bold'>
                {user ? user : 'FirstName LastName'}.
              </span>
            </div>
          ) : (
            <div className='hidden md:flex flex-row md:w-11/12 w-full md:justify-start justify-center items-center  mx-10 px-5 mb-5 mt-10' />
          )}
          {children}
        </div>
      </div>
    </>
  );
};

interface Props {
  children?: any;
  title: string;
  count?: number;
}

export default Dashboard;
