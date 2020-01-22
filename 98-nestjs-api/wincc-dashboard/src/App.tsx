import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ThemeProvider, makeStyles } from '@smartgear/edison';
import {
  CssBaseline,
  Card,
  CardContent,
} from '@material-ui/core';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { UserDashboard } from './Screens/UserDashboard';
import SingleWidgetScreen from './Screens/SingleWidgetScreen';

const useStyles = makeStyles(theme => ({
  root: {
    left: 0,
    right: 0,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1400px',
    maxHeight: '800px',
  },
}));


const App: React.FC = () => {
  return (
    <ThemeProvider theme="Siemens (Light)">
      <CssBaseline />
      <BrowserRouter>
        <Switch>

          <Route path="/user/:userName/dashboard">
            <UserDashboard />
          </Route>

          <Route path="/user/:userName/widget/:widgetType">
            <SingleWidgetScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
