import React from 'react';

import Logo from '../../public/images/logo.svg';

const SimbaLogo = ({ classes }: Props) => {
  return (
    <div
      className={`w-54 h-54 rounded-md border-2 border-black cursor-pointer flex justify-center items-center ${classes}`}
    >
      <Logo />
    </div>
  );
};

interface Props {
  classes?: string;
}

export default SimbaLogo;
