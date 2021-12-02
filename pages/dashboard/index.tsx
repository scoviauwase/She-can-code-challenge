import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Router from 'next/router';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import DashboardCard from '../../components/reusable/DashboardCard';
import Dashboard from '../../components/markup/DashboardView';
import SkeletonLoader from '../../components/markup/Skeleton';
import Alert from '../../components/reusable/Alert';
import { AppState } from '../../store/types';
import { getAllTransactions } from '../../store/actions/transactions/transactions';
import { clearErrors } from '../../store/actions/errors/errors';

const Index = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading } = useSelector(
    (state: AppState) => state.transactions,
    shallowEqual,
  );
  const { error } = useSelector(
    (state: AppState) => state.errors,
    shallowEqual,
  );
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(getAllTransactions());
  }, []);
  return (
    <Dashboard title='Dashboard' count={transactions.length}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {error.length ? (
            <div className='w-64 mx-auto'>
              <Alert severity='error' text={error} />
            </div>
          ) : null}
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mb-5 md:w-11/12 w-full'>
            <DashboardCard
              count={transactions.length}
              icon={<AccountBalanceOutlinedIcon />}
              title='View My Transactions'
              classes='mx-auto'
              onClick={() => Router.push('/dashboard/transactions')}
            />
          </div>
        </>
      )}
    </Dashboard>
  );
};

export default Index;
