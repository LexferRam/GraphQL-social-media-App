import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'

export default function ResponsiveDialog({openConfirm, setOpenConfirm,deletePost}) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const navigate = useNavigate()

  // const handleClickOpen = () => {
  //   setOpenConfirm(true);
  // };

  const handleCloseDelete = () => {
    setOpenConfirm(false);
    deletePost()
    navigate('/')
  };
  const handleClose = () => {
    setOpenConfirm(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete post?"}
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary' style={{ textTransform: 'capitalize' }}>
            Cancel
          </Button>
          <Button onClick={handleCloseDelete} autoFocus color='secondary' style={{ textTransform: 'capitalize' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}