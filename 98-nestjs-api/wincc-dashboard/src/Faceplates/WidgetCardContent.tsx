// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Typography, CardContent } from '@material-ui/core';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    wordWrap: 'break-word',
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type Props = {};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

const WidgetCardContent: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <CardContent className={classes.root}>
      {props.children}
    </CardContent>
  );
};

export default WidgetCardContent;