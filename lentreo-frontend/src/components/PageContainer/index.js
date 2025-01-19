import React from 'react';
import Container from '@mui/material/Container';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import Spin from '../Spin';
import BreadcrumbHeader from './BreadcrumbHeader';
import PageHeader from './PageHeader';
import PageTitle from './PageTitle';
import PropTypes from 'prop-types';

export default function PageContainer({
  breadcrumbs,
  children,
  title,
  loading,
  ...rest
}) {
  return (
    <Container maxWidth={false} {...rest}>
      <Helmet title={title} />
      {breadcrumbs ? (
        <Box border="1px solid" borderColor="divider" borderRadius={2} mb={4}>
          <BreadcrumbHeader breadcrumbs={breadcrumbs} />
          {children}
        </Box>
      ) : (
        <>{loading ? <Spin spinning /> : children}</>
      )}
    </Container>
  );
}

PageContainer.PageHeader = PageHeader;
PageContainer.PageTitle = PageTitle;

PageContainer.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array,
  children: PropTypes.any,
};
