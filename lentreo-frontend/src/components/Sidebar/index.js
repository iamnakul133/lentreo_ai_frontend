import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Divider,
  Typography,
  Stack,
  useTheme 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useLocation } from 'react-router-dom';
import whiteLogo from '../../assests/2987035-200-white-logo.png';
import darkLogo from '../../assests/2987035-200.png';

const Sidebar = () => {
  const theme = useTheme();
  const drawerWidth = 240;
  const location = useLocation();

  // Select logo based on theme mode
  const logoSrc = theme.palette.mode === 'dark' ? whiteLogo : darkLogo;

  const menuItems = [
    {
      path: '/dashboard',
      icon: <DashboardIcon />,
      label: 'Dashboard'
    },
    {
      path: '/chat',
      icon: <ChatIcon />,
      label: 'Chat'
    }
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto'
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ p: 2 }} >
          <Stack direction="row" spacing={1} alignItems="center">
            <img 
              src={logoSrc} 
              alt="SoulBuddy Logo" 
              style={{ 
                width: '32px', 
                height: '32px',
                objectFit: 'contain'
              }} 
            />
            <Typography variant="h6" component="div">
              SoulBuddy
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              component={Link} 
              to={item.path}
              key={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;