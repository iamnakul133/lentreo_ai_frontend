import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useSelector, useDispatch } from '../../store';
import { toggleTheme } from '../../store/actions';

const Navbar = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar  sx={{justifyContent:'end'}}>
        <IconButton 
          color="inherit" 
          onClick={() => dispatch(toggleTheme(themeMode === 'dark' ? 'light' : 'dark'))}
          sx={{justifyContent:'end'}}
        >
          {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 