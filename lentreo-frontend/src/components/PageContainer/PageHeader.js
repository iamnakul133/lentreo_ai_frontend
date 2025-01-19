import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PageTitle from './PageTitle';

const PageHeader = ({
  primary,
  secondary,
  actions,
  primaryTypographyProps,
  secondaryTypographyProps,
  ...rest
}) => {
  return (
    <Box
      mb={1.5}
      display="flex"
      alignItems="flex-start"
      flexWrap="wrap"
      {...rest}
    >
      <PageTitle
        primary={primary}
        secondary={secondary}
        primaryTypographyProps={primaryTypographyProps}
        secondaryTypographyProps={secondaryTypographyProps}
      />
      {actions && (
        <Stack direction="row" spacing={1} ml="auto" alignItems="center">
          {actions}
        </Stack>
      )}
    </Box>
  );
};

export default PageHeader;
