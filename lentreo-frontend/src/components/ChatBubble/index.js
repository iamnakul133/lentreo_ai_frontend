import React from 'react';
import { Box, Typography, useTheme, Avatar} from '@mui/material';
import { keyframes } from '@mui/system';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import userImage from '../../assests/user_profile.jpeg'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChatBubble = ({ text, isBot, children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        alignItems: 'flex-start',
        animation: `${fadeIn} 0.3s ease-out`,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: isBot ? 'primary.main' : 'secondary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: theme.shadows[2],
        }}
      >
        {isBot ? <SmartToyIcon /> : <Avatar src={userImage} alt="User" />}
      </Box>
      <Box
        sx={{
          maxWidth: '80%',
          backgroundColor: isBot ? 
            '#e3be7d' 
            : theme.palette.background.paper,
          p: 2,
          borderRadius: 2,
          boxShadow: theme.shadows[1],
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: -8,
            top: 16,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: `8px solid ${isBot ? 
              '#e3be7d'
              : theme.palette.background.paper}`,
          }
        }}
      >
        {text && (
          <Typography 
            variant="body1" 
            color={isBot ? 'primary.contrastText' : 'text.primary'}
          >
            {text}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default ChatBubble;
