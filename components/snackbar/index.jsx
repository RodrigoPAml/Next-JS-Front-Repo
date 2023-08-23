import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

const Snackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.snackbar = {
      success: (message, duration = 3000) => {
        enqueueSnackbar(message, { variant: 'success', autoHideDuration: duration })
      },
      error: (message, duration = 3000) => {
        enqueueSnackbar(message, { variant: 'error', autoHideDuration: duration })
      },
      warn: (message, duration = 3000) => {
        enqueueSnackbar(message, { variant: 'warning', autoHideDuration: duration })
      }
    }
  }, []);
}

export default Snackbar;