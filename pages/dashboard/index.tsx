import React from 'react';
import Router from 'next/router';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import DashboardCard from '../../components/reusable/DashboardCard';
import Dashboard from '../../components/markup/DashboardView';

const Index = () => {
  return (
    <Dashboard title='Dashboard'>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mb-5 md:w-11/12 w-full'>
        <DashboardCard
          count={5}
          icon={<AccountBalanceOutlinedIcon />}
          title='View My Transactions'
          classes='mx-auto'
          onClick={() => Router.push('/dashboard/transactions')}
        />
      </div>
    </Dashboard>
  );
};

export default Index;
