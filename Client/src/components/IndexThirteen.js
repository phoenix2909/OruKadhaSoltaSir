import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/lab/Slider";
import Paper from "@material-ui/core/Paper";
import DragAndDrop from "./DragAndDrop";
import TextFieldLabel from "./TextFieldLabel";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const styles = theme => ({
  root: {
    overflow:"hidden",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  },
  slider: {
    padding: "22px 0px"
  },
  thumbIcon: {
    borderRadius: "50%"
  },
  thumbIconWrapper: {
    backgroundColor: "#fff"
  },
  track: {
    height: 5
  },
  paper: {
    outlineStyle: "dashed",
    outlineWidth: "thin",
    outlineColor: "skyblue",
    display: "inline-block",
    background: "white",
    width: "100%",
    height: 200
  },
  label: {
    // width: "100%",
    textAlign: "left",
    fontSize: "smaller !important",
    color: theme.palette.primary.light
  }
});

class IndexThirteen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 0,
      maxCount: 400,
      currentCount: 0,
      gender: props.states.gender,
      about:props.states.about,
      age:props.states.age,
      father_occupation:props.states.father_occupation,
      eco_status:props.states.eco_status,
    };
  }

  handleTextChange = (event,input)=>{
    this.setState({
      [input]: event.target.value,
    });
    this.props.handleChange(input, event);
  };

  handleChange = (event, input) => {
    this.setState({ [input]:event.target.value },()=>{
      this.props.handleChange(input,event)
    });
  };
  handleChooseGender = (event, value) => {
    this.setState({ gender: Number(value) });
    this.props.handleChange('gender',{
      target:{
        value:Number(value)
      }
    })
  };
  updateTextField = (event, value) => {
    if (event.target.value && event.target.value.length > 0) {
      this.setState({ currentCount: event.target.value.length });
    }
  };

  render() {
    const { classes } = this.props;
    const { gender } = this.state;
    function valuetext(value) {
      return `${value}years`;
    }

    return (
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Grid item>
          <TextFieldLabel text="What is your father ?" />
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            variant="outlined"
            value={this.state.father_occupation}
            style={{ width: "100%" }}
            onChange={(e) => {
              this.handleTextChange(e,'father_occupation');
              this.updateTextField(e);
            }}
          />
        </Grid>
        <Grid item>
          <TextFieldLabel text="Which denotes your economic status appropriately?" />
        </Grid>
        <Grid item container justify="center" alignItems="center">
          <Grid item style={{ width: "98%" }}>
            <Slider
              step={50}
              aria-labelledby="discrete-slider-always"
              onChange={(e, value) => {
                this.setState({
                  age: Number(value)
                });
                this.props.handleChange('eco_status', {
                  target:

                    {
                      value:Number(value)
                    }
                  
                })
              }}     
            />
            <Grid
              container
              justify="space-between"
              align-items="center"
              style={{ width: "100%" }}
            >
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  Poor
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  Average
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  Rich
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextFieldLabel text="What's your age ?" />
        </Grid>
        <Grid item container justify="center" alignItems="center">
          <Grid item style={{ width: "98%" }}>
            <Slider
              min = {16}
              max = {60}
              defaultValue={40}
              step={1}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="on"
              onChange={(e,value) => {
                this.setState({
                  age:value
                });
                this.props.handleChange('age',{
                  target:
                  {
                    value
                  }
              })
              }}
            />
            <Grid
              container
              justify="space-between"
              align-items="center"
              style={{ width: "100%" }}
            >
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  16
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  38
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  60
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextFieldLabel text="Gender" />
        </Grid>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Gender"
            name="gender"
            className={classes.group}
            value={this.state.gender}
            onChange={this.handleChooseGender}
          >
            <FormControlLabel
              checked={gender === 1 }
              value={1}
              control={<Radio className={classes.label} />}
              label="Male"
            />
            <FormControlLabel
              checked={gender === 2 }
              value={2}
              control={<Radio className={classes.label} />}
              label="Female"
            />
            <FormControlLabel
            checked={gender === 3 }
              value={3}
              control={<Radio className={classes.label} />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
        <Grid item>
          <TextFieldLabel text="Tell the world your story" />
        </Grid>
        <Grid item>
          <TextField
            id="required"
            multiline={true}
            placeholder="Eg: Your Story"
            margin="normal"
            value={this.state.about}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e, v) => {
              this.handleTextChange(e,'about')
              this.updateTextField(e, v)
            }}
            InputProps={{
              endAdornment: (
                <Typography
                  component="label"
                  color="textSecondary"
                  style={{ paddingLeft: 8 }}
                >
                  {" "}
                  {this.state.about.length}/{this.state.maxCount}
                </Typography>
              )
            }}
            // eslint-disable-next-line
            inputProps={{
              maxLength: 400
            }}
          />
        </Grid>
        <Grid item>
          <Typography align="center" gutterBottom>
            Or
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.paper} square={false} elevation={1}>
            <DragAndDrop text={"Upload a video"} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
IndexThirteen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexThirteen);
