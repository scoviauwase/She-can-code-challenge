import React from 'react';
import Router from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Dashboard from '../../components/markup/DashboardView';

const Tramsactions = () => {
  return (
    <Dashboard title='Transactions'>
      <div className='w-11/12 mx-auto flex flex-col justify-start items-start shadow-2xl px-5 pt-5'>
        <div className='w-full flex flex-col md:flex-row justify-between items-center mt-5 py-5 border-b-2 border-b-black'>
          <span className='font-bold text-lg ml-3'>Transactions</span>
          <button
            className='focus:outline-none rounded-md px-3 py-2 bg-blue-500 text-white'
            onClick={() => Router.push('/dashboard/create-transaction')}
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
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell> John Doe</TableCell>
                <TableCell>+5000</TableCell>
                <TableCell>EUR</TableCell>
                <TableCell>April 16, 2019 17:37</TableCell>
                <TableCell>April 16, 2019 17:37</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell> John Doe</TableCell>
                <TableCell>+5000</TableCell>
                <TableCell>EUR</TableCell>
                <TableCell>April 16, 2019 17:37</TableCell>
                <TableCell>April 16, 2019 17:37</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Dashboard>
  );
};

export default Tramsactions;
