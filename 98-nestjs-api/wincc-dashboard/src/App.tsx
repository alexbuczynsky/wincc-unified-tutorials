import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ThemeProvider, makeStyles } from '@smartgear/edison';
import { SmartgearIcons } from '@smartgear/icons';
import {
  CssBaseline,
  Card,
  CardActions,
  Button,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from '@material-ui/core';

import { Tags } from './wincc-api';
import { useInterval } from './hooks';

const useStyles = makeStyles(theme => ({
  root: {
    left: 0,
    right: 0,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '800px',
    maxHeight: '800px',
  },
}));


const App: React.FC = () => {
  return (
    <ThemeProvider theme="Siemens (Light)">
      <CssBaseline />
      <TagTest id={0} />
    </ThemeProvider>
  );
}



const TagTest = ({ id = 0 }) => {

  const dasStatusTag = Tags(`breakerStatus_breakerWL[${id}].dasStatus`)
  const statusOpenTag = Tags(`breakerStatus_breakerWL[${id}].statusOpen`)
  const statusClosedTag = Tags(`breakerStatus_breakerWL[${id}].statusClosed`)

  useInterval(() => {
    dasStatusTag.Read()
    statusOpenTag.Read()
    statusClosedTag.Read()
  }, 500)

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant='body1'>
            <b>{dasStatusTag.Name}</b> = {dasStatusTag.Value} ({dasStatusTag.TimeStamp})
          </Typography>
          <Typography variant='body1'>
            <b>{statusOpenTag.Name}</b> = {statusOpenTag.Value} ({statusOpenTag.TimeStamp})
          </Typography>
          <Typography variant='body1'>
            <b>{statusClosedTag.Name}</b> = {statusClosedTag.Value} ({statusClosedTag.TimeStamp})
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default App;
