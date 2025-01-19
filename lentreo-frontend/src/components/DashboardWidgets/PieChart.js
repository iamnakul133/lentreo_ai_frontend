import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart as MUIPieChart } from '@mui/x-charts/PieChart';

const COLORS = ['#f87d2d', '#FF6B6B', '#4ECDC4', '#45B7D1'];

const PieChart = ({ title, data }) => {
  // Transform data to match MUI X-Charts format
  const chartData = data.map((item, index) => ({
    id: index,
    value: item.value,
    label: item.name,
    color: COLORS[index % COLORS.length],
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="textSecondary" gutterBottom align="left">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', height: 250 }}>
          <Box sx={{ flex: 1 }}>
            <MUIPieChart
              series={[
                {
                  data: chartData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { additionalRadius: -30, color: 'gray' },
                  paddingAngle: 2,
                  cornerRadius: 4,
                  valueFormatter: (value) => `${((value/total) * 100).toFixed(1)}%\n(${value})`,
                },
              ]}
              height={250}
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              slotProps={{
                legend: { hidden: true }
              }}
            />
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1,
            ml: 2,
            minWidth: '120px'
          }}>
            {chartData.map((item, index) => (
              <Box 
                key={item.id} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box 
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    backgroundColor: item.color,
                    borderRadius: '2px'
                  }} 
                />
                <Typography variant="body2" color="textSecondary">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart; 