import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function InsetList(props) {
  const { classes, weather } = props;
  let moment = require('moment');
  console.log(props);
  console.log(weather);
  return (
    <List component="nav" className={classes.root}>
      <ListItem button>
        <Grid container>
          <Grid item xs>
            <ListItemText 
            inset 
            primary={moment(weather.dt_txt).format('DD MMM YYYY, dddd')} 
            secondary={weather.weather[0].main}/>
          </Grid>
          <Grid item xs>
            <ListItemText 
            inset 
            primary={`${props.state.convertKelvinToCelcius(weather.main.temp_min)}°C - ${props.state.convertKelvinToCelcius(weather.main.temp_max)}°C`} />
          </Grid>
        </Grid>

      </ListItem>
    </List>
  );
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);
