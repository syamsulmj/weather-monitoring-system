import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as moment from 'moment';

const styles = {
  card: {
    minWidth: 200,
    width: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes, currentWeather, state } = props;
  var moment = require('moment');
  var now = moment().format('ddd DD MMM YYYY HH:mm a');
  return (
    <Card className={`${classes.card} card-width`} style={{ backgroundColor: '#008B8B', padding: '8px 0 0' }}>
      <CardContent>
        <Grid container>
          <Grid item xs>
            <Typography className={classes.title} 
            color="textPrimary" 
            style={{ textAlign: 'center', fontWeight: '600', fontSize: '3em', color: '#f0f0f0' }}>
              {currentWeather === null ? '' : props.state.convertKelvinToCelcius(currentWeather.data.main.temp)}&deg;C
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className={classes.title} style={{ color: '#ffffff' }}>
              {currentWeather === null ? '' : currentWeather.data.name}
            </Typography>
            <Typography className={classes.title} style={{ color: '#ffffff' }} gutterBottom>
              {now}
            </Typography>
            <Typography className={classes.title} style={{ color: '#dddddd', fontSize: '1.4rem' }}>
              {currentWeather === null ? '' : currentWeather.data.weather[0].main}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);