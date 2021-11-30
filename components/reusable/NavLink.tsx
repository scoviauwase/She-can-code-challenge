import React from 'react';

import CountItem from './CountItem';

const NavLink = ({ icon, count, classes, onClick, title }: Props) => {
  return (
    <div
      className={`flex flex-row h-12 justify-center items-center ml-5  cursor-pointer my-1 ${classes}`}
      onClick={onClick}
    >
      <div className='flex justify-center items-center'>
        <div className='mx-3 flex justify-center items-center w-2 h-2'>
          {icon}
        </div>
        <span>{title}</span>
      </div>
      {count > 0 ? <CountItem count={count} /> : null}
    </div>
  );
};
interface Props {
  icon: any;
  count?: number;
  classes?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title: string;
}

export default NavLink;
