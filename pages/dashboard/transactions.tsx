import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Router from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Dashboard from '../../components/markup/DashboardView';
import SkeletonLoader from '../../components/markup/Skeleton';
import Alert from '../../components/reusable/Alert';
import { clearErrors } from '../../store/actions/errors/errors';
import { getAllTransactions } from '../../store/actions/transactions/transactions';
import { AppState } from '../../store/types';

const Transactions = () => {
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
    <Dashboard title='Transactions' count={transactions.length}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className='w-11/12 mx-auto flex flex-col justify-start items-start shadow-2xl px-5 pt-5'>
          {error.length ? (
            <div className='w-64 mx-auto'>
              <Alert severity='error' text={error} />
            </div>
          ) : null}
          <div className='w-full flex flex-col md:flex-row justify-between items-center mt-5 py-5 border-b-2 border-b-black'>
            <span className='font-bold text-lg ml-3'>Transactions</span>
            <button
              className='focus:outline-none rounded-md px-3 py-2 bg-blue-500 text-white'
              onClick={() => {
                Router.push('/dashboard/create-transaction');
                dispatch(clearErrors());
              }}
            >
              NEW TRANSACTION
            </button>
          </div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='caption table'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length &&
                  !isLoading &&
                  transactions.map((transaction, index) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {(transaction.senderId &&
                          transaction.sender !== undefined) ||
                        (null && Object.keys(transaction.sender).length)
                          ? transaction.sender['name']
                          : null}
                      </TableCell>
                      <TableCell>
                        {transaction.receiver !== undefined ||
                        (null && Object.keys(transaction.receiver).length)
                          ? transaction.receiver['name']
                          : null}
                      </TableCell>
                      <TableCell>
                        {transaction.amount ? (
                          transaction.senderId &&
                          transaction.senderId == localStorage.getItem('id') ? (
                            <b className='text-green-400'>
                              - {transaction.amount}
                            </b>
                          ) : transaction.receiverId &&
                            transaction.receiverId ==
                              localStorage.getItem('id') ? (
                            <b className='text-green-400'>
                              + {transaction.amount}
                            </b>
                          ) : (
                            <b className='text-green-400'>
                              {transaction.amount}
                            </b>
                          )
                        ) : (
                          transaction.usdBalance
                        )}
                      </TableCell>
                      <TableCell>
                        {transaction.targetCurrency
                          ? transaction.targetCurrency
                          : transaction.sourceCurrency}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.createdAt).toDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.updatedAt).toDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Dashboard>
  );
};

export default Transactions;
