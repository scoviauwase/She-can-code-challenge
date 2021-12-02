import React, { useState } from 'react';
import Router from 'next/router';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

import CircularIcon from '../../components/markup/CircularIcon';

const Logout = ({ classes }: Props) => {
  const [isShownLogout, setIsShownLogout] = useState(false);
  return (
    <div className={`w-full ${classes}`}>
      {isShownLogout ? (
        <span
          className='w-10/12 h-10 bg-gray-100 shadow-2xl border-2 border-white text-black flex justify-center items-center mx-auto cursor-pointer'
          onClick={() => {
            setIsShownLogout(!isShownLogout);
            Router.push('/');
          }}
        >
          Logout
        </span>
      ) : null}

      <div className='w-10/12 h-12 bg-gray-100 rounded-md mx-auto mb-5 flex flex-row items-center justify-around'>
        <CircularIcon>
          <AccountCircleOutlinedIcon />
        </CircularIcon>
        <div className='flex flex-col items-center justify-center'>
          <span className='text-xs font-bold capitalize'>John Doe</span>
          <span className='text-xs'>User</span>
        </div>
        <div
          className='w-8 h-8 cursor-pointer'
          onClick={() => setIsShownLogout(!isShownLogout)}
        >
          {isShownLogout ? (
            <ArrowDropUpOutlinedIcon />
          ) : (
            <ArrowDropDownOutlinedIcon />
          )}
        </div>
      </div>
    </div>
  );
};

interface Props {
  classes?: string;
}

export default Logout;
