import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PageTitle = ({
  primary,
  secondary,
  primaryTypographyProps = {},
  secondaryTypographyProps = {},
}) => {
  return (
    <Box>
      <Typography gutterBottom variant="h4" {...primaryTypographyProps}>
        {primary}
      </Typography>
      {secondary && (
        <Typography color="text.secondary" {...secondaryTypographyProps}>
          {secondary}
        </Typography>
      )}
    </Box>
  );
};

export default PageTitle;
