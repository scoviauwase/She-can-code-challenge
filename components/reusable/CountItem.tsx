import React from 'react';

const CountItem = ({ count, classes }: Props) => {
  return (
    <span
      className={`ml-5 mr-2 bg-red-500 px-2 py-1 rounded-md text-white text-xs ${classes}`}
    >
      {count}
    </span>
  );
};

interface Props {
  count?: number;
  classes?: string;
}

export default CountItem;
