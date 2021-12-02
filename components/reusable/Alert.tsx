import * as React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const BasicAlerts = ({ severity, text, classes }: Props) => {
  return (
    <div className={`${classes}`}>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity={severity}>{text}</Alert>
      </Stack>
    </div>
  );
};

interface Props {
  severity: AlertColor;
  text: string;
  classes?: string;
}

export default BasicAlerts;
