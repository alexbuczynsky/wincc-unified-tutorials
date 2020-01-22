// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Typography } from '@material-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import BreakerStatusWidget from '../Faceplates/Widgets/BreakerStatusWidget';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type Props = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SingleWidgetScreen: React.FC<Props> = props => {

  const params: any = useParams();
  const query = useQuery();

  const allQueryValues: any = {};
  query.forEach((v, k) => { allQueryValues[k] = v });

  const userName: string = params.userName;
  const widgetType: string = params.widgetType;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>Hello {userName}!</Typography>
      <Typography>Your widget ({widgetType}) will display here</Typography>
      <Typography>All params {JSON.stringify(allQueryValues)} </Typography>
      <BreakerStatusWidget {...allQueryValues} />
    </div>
  );
};
export default SingleWidgetScreen;