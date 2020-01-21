// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Typography, CardHeader } from '@material-ui/core';

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

export type Props = {
  title?: string;
  subheader?: string;
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

const WidgetCardHeader: React.FC<Props> = props => {
  const classes = useStyles();

  const {
    title = 'WIDGET_TITLE',
    subheader
  } = props;

  return (
    <CardHeader
      className={classes.root}
      title={title}
      subheader={subheader}
    >
      {props.children}
    </CardHeader>
  );
};

export default WidgetCardHeader;