import React from 'react';
import Router from 'next/router';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import NavLink from '../../components/reusable/NavLink';
import Logo from '../../components/markup/Logo';

import Logout from './Logout';

const Sidebar = () => {
  return (
    <div className='h-screen w-2/12 border-r-2 border-r-black hidden md:flex flex-col justify-between items-start'>
      <div className='flex flex-col justify-start items-start px-5 py-5'>
        <div
          className='flex flex-row items-center justify-center h-12 mb-10 mt-2'
          onClick={() => Router.push('/dashboard')}
        >
          <Logo classes='w-12 h-12' />
          <span className='text-md italic font-bold mx-2 cursor-pointer'>
            SIMBA
          </span>
        </div>
        <NavLink
          icon={<DashboardOutlinedIcon />}
          title='Dashboard'
          onClick={() => Router.push('/dashboard')}
        />
        <NavLink
          icon={<AccountBalanceOutlinedIcon />}
          count={5}
          title='Transactions'
          onClick={() => Router.push('/dashboard/transactions')}
        />
      </div>
      <Logout />
    </div>
  );
};

export default Sidebar;
