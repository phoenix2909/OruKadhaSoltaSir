import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const styles = {
  root: {
    flexGrow: 1
  },
  paper: {
    width: "100%",
    padding: 8
  },
  slider: {
    padding: "16px 0px"
  },
  thumbIcon: {
    borderRadius: "50%"
  },
  thumbIconWrapper: {
    backgroundColor: "#8e93c2"
  },
  track: {
    height: 5
  }
};

class SliderComp extends React.Component {
  state = {
    value: 50,
    rated_skills:[{
      rating:50,
      id:''
    },],
  };

  handleChange = (event, value, data,id) => {  
    let skill_rating = [];
    skill_rating.push({
      id,
      rating:value 
    })
    this.setState({
      value,
      rated_skills:skill_rating
      });

      this.props.onChange(this.state.rated_skills,event)
  };
  componentDidMount() {
    this.setState({
      skill_rating: this.state.skill_rating
    });
  }
  render() {
    const { classes,data } = this.props;
    const { value } = this.state;
    return (
      <Grid
        container
        justify="flex-start"
        alignItems="stretch"
        className={classes.root}
      >
        <Grid item>
          <Paper className={classes.paper}>
            <Typography id="slider-icon">{this.props.skillName}</Typography>
            <Slider
              draggable
              step={50}
              value={value}
              aria-labelledby="slider-icon"
              onChange={(e,value) => {
                this.handleChange(e, value, data,this.props.id)}
              }
            />
            <Grid container justify="space-between" align-items="center">
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  Beginner
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  Intermediate
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" id="slider-icon">
                  Advanced
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

SliderComp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SliderComp);
