import React from 'react';

const CircularIcon = ({ classes, children }: Props) => {
  return (
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${classes}`}
    >
      {children}
    </div>
  );
};

interface Props {
  classes?: string;
  children: any;
}

export default CircularIcon;
