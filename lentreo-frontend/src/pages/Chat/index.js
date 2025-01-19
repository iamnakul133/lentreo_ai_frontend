import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, styled, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PageContainer from '../../components/PageContainer';
import {marked } from 'marked';
import { API_URL } from '../../config'

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 180px)',
  padding: theme.spacing(2),
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
}));

const MessageWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  maxWidth: '85%',
  marginLeft: '20px',
});

const MessageBubble = styled(Paper)(({ theme, isUser }) => ({
  maxWidth: '100%',
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(2),
  backgroundColor: isUser 
    ?'#e3be7d'
    : theme.palette.background.paper,
  color: isUser 
    ? theme.palette.primary.contrastText 
    : theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  '& pre': {
    backgroundColor: theme.palette.action.hover,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    overflow: 'auto',
  },
  '& code': {
    fontFamily: 'monospace',
    backgroundColor: theme.palette.action.hover,
    padding: '2px 4px',
    borderRadius: '4px',
  },
  '& p': {
    margin: '8px 0',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  marginTop: theme.spacing(1),
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState(null);  // Add userData state

  // Add useEffect to get userData from localStorage when component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input; // Store input before clearing
    setInput(''); // Clear input immediately for better UX

    // Add user message
    const newMessages = [...messages, { text: userMessage, isUser: true }];
    setMessages(newMessages);

    try {
      // Make API call to get AI response
      const response = await fetch(`${API_URL}chat?message=I am ${userData?.name} date of birth ${userData?.dob} i want response for ${userMessage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const [data, statusCode] = await response.json();
      
      // Add AI response to messages
      setMessages([...newMessages, {
        text: data.ai_response || 'Sorry, I could not process your request.',
        isUser: false
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message to chat
      setMessages([...newMessages, {
        text: 'Sorry, there was an error processing your request. Please try again.',
        isUser: false
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageContainer title="AI Chat">
      <PageContainer.PageHeader
        sx={{ 
          alignItems: "left",
          mb: 2, 
          px: 1 
        }}
        primary="Chat"
        primaryTypographyProps={{
          variant: "h5", // Changed to h5 for better hierarchy
          color: "text.primary",
          mb: 0,
        }}/>
      <Paper 
        elevation={2} 
        sx={{ 
          height: '100%', 
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 180px)'
        }}
      >
        <ChatContainer>
          <MessagesContainer>
            {messages.map((message, index) => (
              <MessageWrapper
                key={index}
                sx={{ 
                  flexDirection: message.isUser ? 'row-reverse' : 'row',
                  marginLeft: message.isUser ? 'auto' : '20px',
                  marginRight: message.isUser ? '20px' : 'auto',
                }}
              >
                
                  {message.isUser ? (
                   <> </>
                  ) : (
                    <IconWrapper>
                    <SmartToyIcon sx={{ color: 'secondary.main' }} />
                     </IconWrapper>
                  )}
               
                <MessageBubble isUser={message.isUser} elevation={1}>
                  {message.isUser ? (
                    message.text
                  ) : (
                    <div style={{paddingLeft: "9px"}}
                      dangerouslySetInnerHTML={{ 
                        __html: marked(message.text, { breaks: true }) 
                      }} 
                    />
                  )}
                </MessageBubble>
              </MessageWrapper>
            ))}
          </MessagesContainer>
          <InputContainer>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              variant="outlined"
              size="small"
              sx={{ 
                backgroundColor: 'background.paper',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </InputContainer>
        </ChatContainer>
      </Paper>
    </PageContainer>
  );
};

export default Chat;
