import React from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MuiLink from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const BreadcrumbHeader = ({ breadcrumbs }) => {
  return (
    <Paper
      sx={{
        width: '100%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <Box px={2} py={2}>
        <Breadcrumbs separator={<ArrowForwardIosIcon fontSize="inherit" />}>
          {breadcrumbs.map(({ path, title }, index) => {
            return path ? (
              <MuiLink key={index} component={Link} to={path}>
                <Typography fontWeight={500}>{title}</Typography>
              </MuiLink>
            ) : (
              <Typography color="text.secondary" key={index}>
                {title}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </Box>
    </Paper>
  );
};

export default BreadcrumbHeader;
