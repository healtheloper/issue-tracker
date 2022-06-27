import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { SyntheticEvent, useState } from 'react';
import { useTheme } from 'styled-components';

export default function AlertDialog({
  children,
  sx,
  onClickYes,
}): React.ReactElement<{
  sx?: object;
  onClickYes: (e: Event | SyntheticEvent) => void;
}> {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickNo = () => {
    setOpen(false);
  };

  const handleClickYes = (...args) => {
    onClickYes(args);
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleClickOpen}>
        {children}
      </button>
      <Dialog open={open} onClose={handleClickNo} PaperProps={{ sx }}>
        <DialogTitle id="alert-dialog-title">
          정말 삭제하시겠습니까?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClickNo}>아니오</Button>
          <Button
            onClick={handleClickYes}
            autoFocus
            sx={{ color: theme.palette.warning }}
          >
            네
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
