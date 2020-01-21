// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Typography, Card } from '@material-ui/core';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
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

const WidgetCard: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {props.children}
    </Card>
  );
};

export default WidgetCard;