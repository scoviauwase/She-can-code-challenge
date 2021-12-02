import React from 'react';

import CircularIcon from '../markup/CircularIcon';
import CountItem from './CountItem';

const DashboardCard = ({ count, icon, title, classes, onClick }: Props) => {
  return (
    <div
      className={`bg-gray-100 rounded-lg h-40 w-9/12 flex justify-start items-end flex-col cursor-pointer ${classes}`}
      onClick={onClick}
    >
      <CountItem count={count} classes='my-2 mx-5' />
      <div className='w-full flex flex-col justify-center items-center'>
        <CircularIcon classes='w-12 h-12 border-2 border-black'>
          {icon}
        </CircularIcon>
        <span className='font-bold text-sm my-5 capitalize'>{title}</span>
      </div>
    </div>
  );
};

interface Props {
  count: number;
  icon: any;
  title: string;
  classes?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default DashboardCard;
