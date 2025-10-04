import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function PopUpSave({ show, success, message }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (show) setOpen(true);
  }, [show]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={800}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{
          bgcolor: success ? '#61FA80' : '#F87171',
          color: '#fff',
          borderRadius: '5px',
          boxShadow: 3,
          minWidth: '200px',
        }}
      >
        <div>{message}</div>
      </Alert>
    </Snackbar>
  );
}
