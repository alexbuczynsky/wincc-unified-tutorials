// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles } from '@smartgear/edison';
import { Typography, Grid, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import WidgetCard from '../Faceplates/WidgetCard';
import WidgetCardContent from '../Faceplates/WidgetCardContent';
import WidgetCardHeader from '../Faceplates/WidgetCardHeader';
import BreakerStatusWidget from '../Faceplates/Widgets/BreakerStatusWidget';
import { UserConfig } from '../wincc-api';
import { isNumber } from 'util';

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type Props = {};

export type URLProps = {
  userName: string;
}

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const UserDashboard: React.FC<Props> = props => {
  const classes = useStyles();

  const router: any = useParams();
  const userName: string = router.userName;

  const [config, readConfig, saveConfig] = UserConfig(userName);

  console.log({ config })


  return (
    <Container maxWidth='xl' className={classes.root}>

      <Grid container spacing={2}>

        {config.dashboard.widgets.map(widget => {

          switch (widget.type) {
            case 'BreakerStatus':
              let id = 0;
              if (isNumber(widget.meta.id)) {
                id = widget.meta.id;
              }
              return (
                <Grid container item xs={4}>
                  <BreakerStatusWidget id={id} />
                </Grid>
              )
            default:
              return null;
          }
        })}

      </Grid>

    </Container>
  );
};