import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import Chat from './pages/Chat';
import Layout from './components/Layout';
import InitialForm from './pages/InitialForm';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));

const LoadingScreen = () => (
  <LinearProgress sx={{ 
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999
  }} />
);

const Routes = () => {
  // Check if user has completed the initial form
 const hasCompletedForm = localStorage.getItem('userData');

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {/* Initial Form Route */}
        <Route exact path="/initial-form">
          <InitialForm />
        </Route>

        {/* Protected Routes */}
        <Route path="/">
          {!hasCompletedForm ? (
            <Redirect to="/initial-form" />
          ) : (
            <Layout>
              <Switch>
                {/* Redirect root to dashboard */}
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>

                {/* Dashboard route */}
                <Route exact path="/dashboard" component={Dashboard} />

                {/* Chat route */}
                <Route exact path="/chat" component={Chat} />

                {/* 404 route */}
                <Route path="*">
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </Layout>
          )}
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;