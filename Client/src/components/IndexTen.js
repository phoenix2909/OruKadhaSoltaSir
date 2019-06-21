import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextFieldLabel from "./TextFieldLabel";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SliderComp from "./SliderComp";
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
      value: 0,
      rated_skills:props.states.rated_skills,
      all_skills: []
    };
    this.handleChange = this.handleChange.bind(this)
  }
 updateOrInsertSkills= (skillarray, _skills) => {
  let index = _skills.findIndex(e => skillarray[0].id === e.id);
  if (index >= 0) {
    _skills[index] = skillarray[0]
  } else {
    _skills.push(skillarray[0])
  }
  return _skills
}
  handleChange = (rated_skills,event) => {
    let all_skills = this.updateOrInsertSkills(rated_skills,this.state.all_skills);
    this.setState({
      rated_skills,
      all_skills
    }, ()  => {
        this.props.handleChange('rated_skills', {
          target:
          {
            value: this.state.all_skills
          }
        });
    })
  };

  render() {
    const { classes,inputArr } = this.props;
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
              {inputArr.map((skill, index) => {
            return (
              <Grid item style={{ width: "100%" }} key={index}>
                <SliderComp skillName={skill} id={this.props.selected_skillsArr[index]} data = {this.props.selected_skillsArr} onChange={this.handleChange}/>
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
