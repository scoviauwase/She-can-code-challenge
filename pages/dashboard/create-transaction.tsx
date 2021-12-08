import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Router from 'next/router';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CircularProgress } from '@mui/material';

import Dashboard from '../../components/markup/DashboardView';
import TextField from '../../components/reusable/TextField';
import SelectField from '../../components/reusable/SelectField';
import { clearErrors } from '../../store/actions/errors/errors';
import {
  createTransaction,
  getAllTransactions,
} from '../../store/actions/transactions/transactions';
import { AppState } from '../../store/types';
import SkeletonLoader from '../../components/markup/Skeleton';
import { getUsers } from '../../store/actions/users/users';
import Alert from '../../components/reusable/Alert';

const validationSchema = Yup.object().shape({
  receiver: Yup.number().required().label('Receiver'),
  source: Yup.string().required().label('Source currency'),
  target: Yup.string().required().label('Target currency'),
  amount: Yup.number().required().label('Amount'),
});

const CreateTransaction = () => {
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const dispatch = useDispatch();
  const { transactions, message, success, isLoading } = useSelector(
    (state: AppState) => state.transactions,
    shallowEqual,
  );
  const { error } = useSelector(
    (state: AppState) => state.errors,
    shallowEqual,
  );

  const { users } = useSelector((state: AppState) => state.users, shallowEqual);

  useEffect(() => {
    dispatch(getAllTransactions());
    dispatch(getUsers());
  }, []);

  const handleCreateTransaction = async (values) => {
    setIsCreatingTransaction(true);
    dispatch(createTransaction(values));
    setIsCreatingTransaction(false);
  };

  useEffect(() => {
    if (success && !isCreatingTransaction) {
      setTimeout(() => {
        Router.push('/dashboard/transactions');
      }, 300);
    }
  });

  return (
    <Dashboard title='Transactions' count={transactions.length}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className='w-11/12 mx-auto flex flex-col justify-center items-center px-5 pt-5'>
          {error.length ? (
            <div className='w-64 mx-auto text-center'>
              <Alert severity='error' text={error} />
            </div>
          ) : null}
          {message.length ? (
            <div className='w-64 mx-auto text-center'>
              <Alert severity='success' text={message} />
            </div>
          ) : null}
          <Formik
            initialValues={{ receiver: '', source: '', target: '', amount: '' }}
            onSubmit={handleCreateTransaction}
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
                className='flex flex-col justify-center items-center rounded-lg p-10 bg-white shadow-lg md:w-6/12'
                onSubmit={handleSubmit}
              >
                <span className='font-bold capitalize my-3'>
                  New Transaction
                </span>
                <SelectField
                  title='Receiver'
                  icon={<BadgeOutlinedIcon />}
                  name='receiver'
                  isShownPassword={isShownPassword}
                  placeholder='Receiver'
                  onChange={handleChange('receiver')}
                  value={values.receiver}
                  onBlur={handleBlur('receiver')}
                >
                  {users.map((user) => (
                    <option value={user['id']} key={user['id']}>
                      {user['name']}
                    </option>
                  ))}
                </SelectField>
                {touched.receiver && errors.receiver && (
                  <Alert
                    severity='error'
                    text={`${errors.receiver}`}
                    classes='w-64'
                  />
                )}
                <SelectField
                  title='Source currency'
                  icon={<AccountBalanceOutlinedIcon />}
                  name='source'
                  isShownPassword={isShownPassword}
                  placeholder='Source Currency'
                  onChange={handleChange('source')}
                  value={values.source}
                  onBlur={handleBlur('source')}
                >
                  <option value='USD'>USD</option>
                  <option value='EUR'>EUR</option>
                  <option value='NGN'>NGN</option>
                </SelectField>
                {touched.source && errors.source && (
                  <Alert
                    severity='error'
                    text={`${errors.source}`}
                    classes='w-64'
                  />
                )}
                <SelectField
                  title='Target Currency'
                  icon={<AccountBalanceOutlinedIcon />}
                  name='target'
                  isShownPassword={isShownPassword}
                  placeholder='Target Currency'
                  onChange={handleChange('target')}
                  value={values.target}
                  onBlur={handleBlur('target')}
                >
                  <option value='USD'>USD</option>
                  <option value='EUR'>EUR</option>
                  <option value='NGN'>NGN</option>
                </SelectField>
                {touched.target && errors.target && (
                  <Alert
                    severity='error'
                    text={`${errors.target}`}
                    classes='w-64'
                  />
                )}
                <TextField
                  icon={<AccountBalanceOutlinedIcon />}
                  name='amount'
                  isShownPassword={isShownPassword}
                  type='text'
                  placeholder='Amount'
                  onChange={handleChange('amount')}
                  value={values.amount}
                  onBlur={handleBlur('amount')}
                />
                {touched.amount && errors.amount && (
                  <Alert
                    severity='error'
                    text={`${errors.amount}`}
                    classes='w-64'
                  />
                )}
                <button
                  className='bg-blue-500 px-3 py-2 rounded-md text-white my-3'
                  // onClick={() => Router.push('/dashboard/transactions')}
                  type='submit'
                >
                  {isCreatingTransaction ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : (
                    'Save'
                  )}
                </button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </Dashboard>
  );
};

export default CreateTransaction;
