import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    height: '90vh',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2)
  }
}));

export const ChatContainer = styled('div')({
  flex: 1,
  overflowY: 'auto',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column'
});

export const InputContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper
}));
