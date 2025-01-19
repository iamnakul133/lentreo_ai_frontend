import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import RuleIcon from '@mui/icons-material/Rule';
import {marked } from 'marked';
import { API_URL } from '../../config'

const DoesDont = () => {
   console.log(API_URL)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoesDont = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const response = await fetch(
          `${API_URL}chat?message=I am ${userData?.name} date of birth ${userData?.dob} i want response for does and don'ts for me`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch does and donts');
        }

        const [responseData] = await response.json();
        setData(responseData.ai_response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoesDont();
  }, []);

  if (loading) {
    return (
      <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography color="error">Error: {error}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', overflow: 'auto', paddingLeft: 6 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <RuleIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            Does & Don'ts
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            whiteSpace: 'pre-line',
            '& ul': { paddingLeft: 2, marginTop: 1 },
            '& li': { marginBottom: 0.5 }
          }}
          dangerouslySetInnerHTML={{ __html: marked(data, { breaks: true }) }}
        />
      </CardContent>
    </Card>
  );
};

export default DoesDont;
