import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const SkeletonLoader = () => {
  return (
    <div className='w-11/12 mx-auto flex flex-col justify-start items-start shadow-2xl px-5 pt-5'>
      <Box
        sx={{
          // bgcolor: '#121212',
          p: 8,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Skeleton
          sx={{ bgcolor: 'grey' }}
          variant='rectangular'
          width='40%'
          height={118}
        />
        <div className='w-5'></div>
        <Skeleton
          sx={{ bgcolor: 'grey' }}
          variant='rectangular'
          width='40%'
          height={118}
        />
      </Box>
    </div>
  );
};

export default SkeletonLoader;
