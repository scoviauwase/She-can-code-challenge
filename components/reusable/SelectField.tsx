import React from 'react';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const SelectField = ({
  title,
  children,
  isShownPassword,
  name,
  classes,
  placeholder,
  handleShowPassword,
  isPasswordField = false,
  icon,
  onChange,
  value,
  onBlur,
}: Props) => {
  return (
    <div className='w-64 h-12 border-2 border-black rounded-md flex items-center justify-around px-1 bg-white my-2'>
      {icon}
      <select
        name={name}
        className={`hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 w-full mx-2 bg-white focus:bg-white placeholder-black  ${classes}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      >
        <option>{title}</option>
        {children}
      </select>
      {isPasswordField && isShownPassword && (
        <div className='cursor-pointer' onClick={handleShowPassword}>
          <RemoveRedEyeOutlinedIcon />
        </div>
      )}
      {isPasswordField && !isShownPassword && (
        <div className='cursor-pointer' onClick={handleShowPassword}>
          <VisibilityOffOutlinedIcon />
        </div>
      )}
    </div>
  );
};

interface Props {
  isShownPassword: boolean;
  isPasswordField?: boolean;
  name: string;
  classes?: string;
  placeholder: string;
  handleShowPassword?: React.MouseEventHandler<HTMLDivElement>;
  icon: any;
  children: any;
  title: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value?: any;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
}

export default SelectField;
