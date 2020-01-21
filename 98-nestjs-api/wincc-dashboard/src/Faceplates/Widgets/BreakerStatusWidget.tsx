// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React, { useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Typography } from '@material-ui/core';
import WidgetCard from '../WidgetCard';
import WidgetCardHeader from '../WidgetCardHeader';
import WidgetCardContent from '../WidgetCardContent';
import BreakerStatusList from '../BreakerStatusList';
import { useInterval } from '../../hooks';
import BreakerStatusOneLine from '../BreakerStatusOneLine';
import { DataSet, Tags } from '../../wincc-api';

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
  id: number
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

const BreakerStatusWidget: React.FC<Props> = props => {
  const classes = useStyles();

  const breakerId = props.id;

  const nameplate = Tags("nameplateWL[" + breakerId + "]")

  const title = nameplate.Value;
  const subheader = 'Breaker Status';



  const breakerStatus = DataSet('BreakerStatus', breakerId);

  useInterval(() => {
    breakerStatus.Read();
  }, 1000)

  const fetchedAt = breakerStatus.fetchedAt

  let fetchedString = ''
  if (fetchedAt) {
    fetchedString = fetchedAt.format()
  }

  const [tag] = breakerStatus.getTag('baxNeutral')

  return (
    <WidgetCard>
      <WidgetCardHeader title={title} subheader={subheader} />
      <WidgetCardContent>
        <Typography></Typography>
        <BreakerStatusOneLine
          bayBlocked={breakerStatus.getValue('bayBlocked')}
          commFailure={breakerStatus.getValue('comFailure')}
          statusBax={breakerStatus.getValue('statusBAX')}
          statusClosed={breakerStatus.getValue('statusClosed')}
          statusOpen={breakerStatus.getValue('statusOpen')}
        />
        {fetchedString}
      </WidgetCardContent>
    </WidgetCard>
  );
};
export default BreakerStatusWidget;