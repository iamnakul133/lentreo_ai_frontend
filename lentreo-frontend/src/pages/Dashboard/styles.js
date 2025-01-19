import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  gridItemTitle: {
    cursor: 'move',
    userSelect: 'none',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));
