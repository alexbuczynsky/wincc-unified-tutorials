// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Typography } from '@material-ui/core';

// import images
import BreakerOpenSVG from '../assets/images/one-lines/status_breaker_open_1.svg';
import BreakerClosedSVG from '../assets/images/one-lines/status_breaker_closed_1.svg';
import BreakerTrippedSVG from '../assets/images/one-lines/status_breaker_tripped_1.svg';
import BreakerCommFailureSVG from '../assets/images/one-lines/status_breaker_comm_failure_1.svg';
import BreakerBayBlocked from '../assets/images/one-lines/status_breaker_bay_blocked_1.svg';
import BreakerSplineSVG from '../assets/images/one-lines/status_breaker_status_spine.svg';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  },
  image: {
    height: '100%'
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type Props = {
  bayBlocked: boolean
  commFailure: boolean
  statusBax: boolean
  statusOpen: boolean
  statusClosed: boolean
  style?: React.CSSProperties
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

const BreakerStatusOneLine: React.FC<Props> = props => {
  const classes = useStyles();

  console.log(props)

  let image = BreakerSplineSVG;

  if (props.bayBlocked) {
    image = BreakerBayBlocked;
  }
  if (props.commFailure) {
    image = BreakerCommFailureSVG;
  }
  if (props.statusBax) {
    image = BreakerTrippedSVG;
  }
  if (props.statusOpen) {
    image = BreakerOpenSVG;
  }
  if (props.statusClosed) {
    image = BreakerClosedSVG;
  }


  return (
    <div className={classes.root} style={props.style}>
      <img src={image} />
    </div>
  );
};
export default BreakerStatusOneLine;