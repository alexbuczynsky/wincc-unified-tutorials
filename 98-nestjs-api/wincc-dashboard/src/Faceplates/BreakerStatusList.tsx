// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import { useInterval } from '../hooks';
import { TagSet } from '../wincc-api';

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

type Props = {
  id: number;
};

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

const BreakerStatusList: React.FC<Props> = props => {
  const classes = useStyles();

  const id = props.id;

  const tagSet = TagSet(
    `breakerStatus_breakerWL[${id}].positionNA`,
    `breakerStatus_breakerWL[${id}].positionDisconnect`,
    `breakerStatus_breakerWL[${id}].positionTest`,
    `breakerStatus_breakerWL[${id}].positionConnect`,
    `breakerStatus_breakerWL[${id}].statusOpen`,
    `breakerStatus_breakerWL[${id}].statusClosed`,
    `breakerStatus_breakerWL[${id}].statusBAX`,
    `breakerStatus_breakerWL[${id}].statusRTC`,
    `breakerStatus_breakerWL[${id}].alarmUVR`,
    `breakerStatus_breakerWL[${id}].statusSpringCharged`,
    `breakerStatus_breakerWL[${id}].alarmWriteEnable`,
    `breakerStatus_breakerWL[${id}].alarmDoorOpen`,
    `breakerStatus_breakerWL[${id}].baxLongTime`,
    `breakerStatus_breakerWL[${id}].baxShorttime`,
    `breakerStatus_breakerWL[${id}].baxInstant`,
    `breakerStatus_breakerWL[${id}].baxNeutral`,
    `breakerStatus_breakerWL[${id}].baxGround`,
    `breakerStatus_breakerWL[${id}].baxExtendedFunction`,
    `breakerStatus_breakerWL[${id}].baxNoCurrentTrip`,
    `breakerStatus_breakerWL[${id}].overloadPresent`,
    `breakerStatus_breakerWL[${id}].thresholdExceeded`,
    `breakerStatus_breakerWL[${id}].alarmPresent`,
    `breakerStatus_breakerWL[${id}].loadSheddingAlarm`,
    `breakerStatus_breakerWL[${id}].dasStatus`,
    `breakerStatus_breakerWL[${id}].bayBlocked`,
    `breakerStatus_breakerWL[${id}].comFailure`,
    `breakerStatus_breakerWL[${id}].bax`,
    `breakerStatus_breakerWL[${id}].breakerAlarmPresent`,
  )

  useInterval(() => {
    tagSet.Read()
  }, 500)

  return (
    <div className={classes.root}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Quality</TableCell>
            <TableCell>TimeStamp</TableCell>
            <TableCell>Moment</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            tagSet.AsArray().map(tag => (
              <TableRow key={tag.Name}>
                <TableCell>{tag.Name}</TableCell>
                <TableCell>{tag.Value}</TableCell>
                <TableCell>{tag.Quality}</TableCell>
                <TableCell>{tag.TimeStamp}</TableCell>
                <TableCell>{tag.Date.local().format('HH:mm:ss:SSS')}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Button variant='contained' color='primary' onClick={() => tagSet.Read()}>
        Refresh
      </Button>
    </div>
  );
};

export default BreakerStatusList;