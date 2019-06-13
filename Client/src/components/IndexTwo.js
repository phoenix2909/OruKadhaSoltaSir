import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DragAndDrop from './DragAndDrop';
import withStyles from '@material-ui/core/styles/withStyles'

const style = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    paddingBottom:1,
  },
  paper: {
    outlineStyle: 'dashed',
    outlineWidth: 'thin',
    outlineColor: 'skyblue',
    display: 'inline-block',
    background:'white',
    width: '100%',
    height: 300,
  }
})

class IndexTwo extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
        <div className={classes.paper}>
          <DragAndDrop text={'Upload your photo'} style={{ height: "100%" }} />
        </div>
      </Grid>
    );
  }
}

export default withStyles(style)(IndexTwo);
