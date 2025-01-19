import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  Select, 
  MenuItem, 
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  InputAdornment,
  LinearProgress,
  Avatar
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatBubble from '../../components/ChatBubble';
import { StyledDialog, ChatContainer, InputContainer } from './styles';
import meditationImage from '../../assests/meditation.jpg'; // Updated path
import { API_URL } from '../../config'

const questions = [
  {
    id: 'name',
    question: "What's your name?",
    type: 'text'
  },
  {
    id: 'dob',
    question: "What's your date of birth?",
    type: 'date'
  },
  {
    id: 'time',
    question: "What time were you born?",
    type: 'time'
  },
  {
    id: 'gender',
    question: "What's your gender?",
    type: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'state',
    question: "Which state are you from?",
    type: 'text'
  },
  {
    id: 'city',
    question: "Which city do you live in?",
    type: 'text'
  }
];

const InitialForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    dob: null,
    time: null,
    gender: '',
    state: '',
    city: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const chatContainerRef = useRef(null); // Add a ref for the ChatContainer

  const handleStartClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  // Calculate progress
  const progress = (currentQuestionIndex / questions.length) * 100;

  useEffect(() => {
    // Add initial welcome message
    setMessages([
      {
        text: "Hi! I'll help you get started. Let me ask you a few questions.",
        isBot: true
      }
    ]);
    // Add first question after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: questions[0].question,
        isBot: true,
        questionId: questions[0].id
      }]);
    }, 500);
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleResponse = (value) => {
    // Add user's response to messages
    setMessages(prev => [...prev, {
      text: value.toString(),
      isBot: false
    }]);

    // Update form data
    setFormData(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: value
    }));

    // Move to next question or show completion message
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, {
          text: questions[currentQuestionIndex + 1].question,
          isBot: true,
          questionId: questions[currentQuestionIndex + 1].id
        }]);
      }, 500);
    } else {
      // Show completion message
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1); // Increment to exceed questions length
        setMessages(prev => [...prev, {
          text: "Great! We're all done. Click submit to continue.",
          isBot: true,
          isComplete: true
        }]);
      }, 500);
    }
    setInputValue('');
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      handleResponse(inputValue);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
    const userMessage = {
      name: formData.name,
      day: formData.dob ? new Date(formData.dob).getDate() : 0,
      month: formData.dob ? new Date(formData.dob).getMonth() + 1 : 0,
      date: formData.dob ? new Date(formData.dob).getDate() : 0,
      year: formData.dob ? new Date(formData.dob).getFullYear() : 0,
      hours: formData.time ? new Date(formData.time).getHours() : 0,
      minutes: formData.time ? new Date(formData.time).getMinutes() : 0,
      seconds: formData.time ? new Date(formData.time).getSeconds() : 0,
      gender: formData.gender,
      state: formData.state,
      city: formData.city
    };

    const response = await fetch(`${API_URL}user_info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMessage ) // Use stored message
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI');
    }

    const result = await response.json();
    console.log(result);
      // Store the form data in localStorage
      localStorage.setItem('userData', JSON.stringify({
        ...formData,
        // Format date and time values for better readability
        dob: formData.dob ? new Date(formData.dob).toLocaleDateString() : null,
        time: formData.time ? new Date(formData.time).toLocaleTimeString() : null,
        // Add timestamp for when the form was completed
        completedAt: new Date().toISOString()
      }));

      // Redirect to dashboard
      history.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, there was an error. Please try again.",
        isBot: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    switch (currentQuestion.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                handleResponse(inputValue);
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSend} disabled={!inputValue.trim()}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      case 'date':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={inputValue}
                onChange={setInputValue}
                slotProps={{ 
                  textField: { 
                    fullWidth: true,
                    sx: { flex: 1 }
                  } 
                }}
              />
            </LocalizationProvider>
            <IconButton 
              onClick={() => handleResponse(inputValue)} 
              disabled={!inputValue}
              color="primary"
            >
              <SendIcon />
            </IconButton>
          </Box>
        );
      case 'time':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={inputValue}
                onChange={setInputValue}
                slotProps={{ 
                  textField: { 
                    fullWidth: true,
                    sx: { flex: 1 }
                  } 
                }}
              />
            </LocalizationProvider>
            <IconButton 
              onClick={() => handleResponse(inputValue)} 
              disabled={!inputValue}
              color="primary"
            >
              <SendIcon />
            </IconButton>
          </Box>
        );
      case 'select':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl fullWidth sx={{ flex: 1 }}>
              <Select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              >
                {currentQuestion.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton 
              onClick={() => handleResponse(inputValue)} 
              disabled={!inputValue}
              color="primary"
            >
              <SendIcon />
            </IconButton>
          </Box>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Landing Page */}
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        {/* Left Side - Image */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${meditationImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Right Side - Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            backgroundColor: 'background.paper'
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 4
            }}
          >
            SoulBuddy
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 6, textAlign: 'center' }}
          >
            AI-Powered Spiritual Guide
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleStartClick}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: '#e3be7d', // Change this to your desired hover color
              },
            }}
          >
            Let's Start
          </Button>
        </Box>
      </Box>

      {/* Initial Form Dialog */}
      <StyledDialog 
        open={dialogOpen} 
        onClose={handleClose} // Added onClose handler
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center',
            p: 3,
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            Welcome to SoulBuddy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Let's get to know you better
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ mt: 2 }}
          />
        </DialogTitle>
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
          <ChatContainer ref={chatContainerRef}>
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                text={message.text}
                isBot={message.isBot}
              />
            ))}
          </ChatContainer>
          
          <InputContainer>
            {currentQuestionIndex >= questions.length ? (
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                   '&:hover': {
                backgroundColor: '#e3be7d', // Change this to your desired hover color
              },
                }}
              >
                Complete Setup
              </Button>
            ) : (
              renderInput()
            )}
          </InputContainer>
        </DialogContent>
      </StyledDialog>
    </>
  );
};

export default InitialForm;