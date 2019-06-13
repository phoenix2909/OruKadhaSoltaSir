import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextFieldLabel from "./TextFieldLabel";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SliderComp from "./SliderComp";
import skills from "./SkillsObj";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  }
});

class IndexTen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      SkillsObj: skills.SkillsObj,
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Grid item>
          <TextFieldLabel text="How much would you rate your skills ?" />
        </Grid>

        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={2}
          style={{ marginTop: 8 }}
        >
          {this.state.SkillsObj.map((skill, index) => {
            return (
              <Grid item style={{ width: "100%" }} key={index}>
                <SliderComp skillName={skill.label} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

IndexTen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexTen);
