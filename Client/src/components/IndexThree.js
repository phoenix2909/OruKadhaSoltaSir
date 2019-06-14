import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextFieldLabel from "./TextFieldLabel";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    width: "100%"
  }
});

class IndexThree extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      maxCount: 50,
      currentCount: 100,
      sm_intro:props.states.sm_intro
    };
    this.updateTextField = this.updateTextField.bind(this);
  }

  updateTextField = (event, value) => {
    console.log();
    if (event.target.value && event.target.value.length > 0) {
      this.setState({ 
        currentCount: event.target.value.length,
        sm_intro : event.target.value
      });
    }
    this.props.handleChange('sm_intro',event);
  };
  render() {
    const { classes } = this.props;
    const { sm_intro } = this.state;
    return (
      <Grid container direction="column" className={classes.root}>
        
        <Grid item>
          <TextFieldLabel text="One word or a sentence that you would give for yourself" />
        </Grid>
        <Grid item>
          <TextField
            className={classes.textField}
            placeholder="Eg: Living a lie"
            margin="dense"
            multiline={true}
            rowsMax={2}
            row={2}
            value={sm_intro}
            variant="outlined"
            onChange={(e, v) => this.updateTextField(e, v)}
            InputProps={{
              endAdornment: (
                <Typography
                  component="label"
                  color="textSecondary"
                  style={{ paddingLeft: 8 }}
                >
                  {" "}
                  {sm_intro.length}/{this.state.maxCount}
                </Typography>
              )
            }}
            // eslint-disable-next-line
            inputProps={{
              maxLength: 50
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(IndexThree);
