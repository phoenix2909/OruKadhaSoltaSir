import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core';
import {ApolloConsumer,} from 'react-apollo'

const styles=theme =>({
  root:{
    flexGrow:1
  },
  textField:{
    width:'100%',
  },
  textFieldContainer:{   
  }
})



class IndexOne extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      full_name: props.states.full_name,
      mobile : props.states.mobile,
      mobileErr:props.states.mobileErr,
      email : props.states.email,
      emailErr: props.states.emailErr
    };
  }

  handleChange = (input) => event => {
    this.setState({
      [input]: event.target.value,
    });
    this.props.handleChange(input,event);
  };

  render() {
    const {classes}=this.props;
    console.log(this.state.full_name);
    

    return (
      <ApolloConsumer >
        {allMyquery => <Grid container direction="column" justify="center" alignItems="stretch" className={classes.root}>
          <Grid item className={classes.textFieldContainer}>
            <TextField
              className={classes.textField}
              label="What's your name ?"
              margin="normal"
              variant="outlined"
              value={this.state.full_name}
              onChange={this.handleChange('full_name')}
            />
          </Grid>
          <Grid item className={classes.textFieldContainer}>
            <TextField
              className={classes.textField}
              label="Mobile"
              margin="normal"
              variant="outlined"
              value={this.state.mobile}
              error={this.state.mobileErr ? true : false}
              helperText={this.state.mobileErr}
              onChange={this.handleChange('mobile')}
            />
          </Grid>
          <Grid item className={classes.textFieldContainer}>
            <TextField
              className={classes.textField}
              label='Email'
              margin="normal"
              variant="outlined"
              value={this.state.email}
              error={this.state.emailErr ? true : false}
              helperText={this.state.emailErr}
              onChange={this.handleChange('email')}
            />
            
          </Grid>

        </Grid>}
      </ApolloConsumer>
    );
  }
}


export default withStyles(styles)(IndexOne);

