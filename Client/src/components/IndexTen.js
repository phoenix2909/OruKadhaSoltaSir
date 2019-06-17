import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextFieldLabel from "./TextFieldLabel";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SliderComp from "./SliderComp";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
      value: 0
    };
  }

  handleChange = () => {
    
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_SKILLS} variables={
        {
          id: "5b1092e4-895f-48c4-9796-f254aa59178f"
        }
      }>
        {({ data, error, loading, fetchMore }) => {
          if (loading) {
            return 'loading...';
          }
          if (error) {
            return JSON.stringify(error);
          }
          console.log(data.profile.skills);
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
              {data.profile.skills.map((skill, index) => {
            return (
              <Grid item style={{ width: "100%" }} key={index}>
                <SliderComp skillName={skill.skill.label} data = {skill.skill} onChange={this.handleChange}/>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
          )
        }}
      </Query> 
    );
  }
}
const GET_SKILLS = gql `
query GET_SKILLS($id:String) {
  profile(id:$id)
  {
    skills{
      skill
      {
        id
        label
      }
    }
  }
}
`;
IndexTen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexTen);
