import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, styled, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CircularProgress from '@mui/material/CircularProgress';
import PageContainer from '../../components/PageContainer';
import {marked } from 'marked';
import { API_URL } from '../../config'

const STORAGE_KEY = 'chatMessages';

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

const LoadingMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  marginLeft: '20px',
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
  const [isLoading, setIsLoading] = useState(false);

  // Add useEffect to get userData from localStorage when component mounts
  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input; // Store input before clearing
    setInput(''); // Clear input immediately for better UX
    setIsLoading(true);

    // Add user message
    const newMessages = [...messages, { text: userMessage, isUser: true }];
    setMessages(newMessages);
    // Save to localStorage after adding user message
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));

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
      const updatedMessages = [...newMessages, {
        text: data.ai_response || 'Sorry, I could not process your request.',
        isUser: false
      }];
      
      setMessages(updatedMessages);
      // Save to localStorage after adding AI response
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message to chat
      const errorMessages = [...newMessages, {
        text: 'Sorry, there was an error processing your request. Please try again.',
        isUser: false
      }];
      setMessages(errorMessages);
      // Save error message to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(errorMessages));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
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
                        __html: marked(message.text || 'No response available.', { breaks: true }) 
                      }} 
                    />
                  )}
                </MessageBubble>
              </MessageWrapper>
            ))}
            {isLoading && (
              <LoadingMessage>
                <IconWrapper>
                  <SmartToyIcon sx={{ color: 'secondary.main' }} />
                </IconWrapper>
                <MessageBubble elevation={1}>
                  <CircularProgress size={20} />
                </MessageBubble>
              </LoadingMessage>
            )}
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
              disabled={isLoading}
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
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
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
