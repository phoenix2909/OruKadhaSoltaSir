import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid, withStyles } from '@material-ui/core';
import TextFieldLabel from './TextFieldLabel';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  textFieldContainer: {
    width: '100%',
  },
  textField: {
    width: '100%',
    marginTop: 8,
  }
})

class IndexFour extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      checked : false,
      cur_loc : props.states.cur_loc,
      per_loc : props.states.per_loc
    };
  }

  handleChange = (input) => event => {
    if(input === 'checked'){
      const currValue = this.state.checked;
      let stateObj = {
        checked:!currValue
      }
      stateObj.cur_loc = stateObj.checked === true ? this.state.per_loc : '';
      this.props.handleChange('cur_loc', {
        target:{
          value:stateObj.cur_loc
        }
      })
      this.setState(stateObj);
      this.props.handleChange(input, {
        target:{
          value:stateObj.checked
        }
      });
    }
    else {
      this.setState({
        [input]: event.target.value,
      })
      this.props.handleChange(input, event);
    }
    
  };
  render() {
    const { classes } = this.props;

    return (
      <Grid container
        direction="column"
        justify="center"
        alignItems="flex-start"
        spacing={3}
        className={classes.root}>

        <Grid item container
          direction="column"
          justify="center"
          alignItems="flex-start" >
          <Grid item style={{ marginTop: 8 }}>
            <TextFieldLabel text="Where are you from?" />
          </Grid>
          <Grid item className={classes.textFieldContainer}>
            <TextField
              className={classes.textField}
              margin="none"
              id="outlined-bare1"
              variant="outlined" 
              value={this.state.per_loc}
              onChange={this.handleChange('per_loc')}
              />
          </Grid>
          <Grid item style={{ marginTop: 8 }}>
            <Checkbox
              style={{padding:0,paddingRight:8}}
              // value={this.state.per_loc}
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              inputProps={{
                'aria-label': 'primary checkbox',
              }}
            />
            <TextFieldLabel text="I live in the same place" />
          </Grid>
        </Grid>

        <Grid item container
          direction="column"
          justify="center"
          alignItems="flex-start" >
          <Grid item>
            <TextFieldLabel text="Where do you live then?" />
          </Grid>
          <Grid item className={classes.textFieldContainer}>
            <TextField
              className={classes.textField}
              id="outlined-bare"
              variant="outlined"
              value={this.state.cur_loc}
              onChange={this.handleChange('cur_loc')}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(IndexFour);
