import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    backgroundImage: 'linear-gradient(to right, #00d2ff 0%, #3a7bd5 51%)',
    color: 'white',
    textAlign: 'center',
    padding: 0
  },
  grow: {
    flexGrow: 1,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          #OruKadhaSollataSir
          </Typography>
      </Toolbar>
    </AppBar>

  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);