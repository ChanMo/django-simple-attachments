import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteButton({onConfirm, ...other}) {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button
        onClick={()=>setOpen(true)}
        variant="contained"
        color="secondary"
        {...other}
      >删除</Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"删除附件?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            删除后不可恢复, 请谨慎操作
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            取消
          </Button>
          <Button onClick={onConfirm} color="secondary" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
