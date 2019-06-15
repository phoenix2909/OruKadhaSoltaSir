import React, { Component } from "react";
import Engineer from "../images/engineer.png";
import Artist from "../images/artist.png";
import Tick from "../images/checked.png";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, InputLabel } from "@material-ui/core";
import TextFieldLabel from "./TextFieldLabel";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const selQb = (
  <div
    style={{
      position: "absolute",
      backgroundColor: "rgba(58, 123, 213, 0.25)",
      width: "130px",
      height: "130px"
    }}
  >
    <img
      style={{ margin: 8 }}
      alt="tick"
      width="20px"
      height="20px"
      src={Tick}
    />
  </div>
);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 130,
    width: 130
  },
  img: {
    margin: 40,
    width: 50,
    height: 50,
    marginTop: 27,
    marginBottom: 0
  },
  label: {
    width: "100%",
    fontSize: "12px",
    color: theme.palette.primary.light,
    marginTop: 7
  }
});

class IndexSeven extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEng: "",
      isNonEng: "",
      course_id:props.states.course_id
    };
    this.handleClick = this.handleClick.bind(this)
    console.log(props.states);
  }

  handleClick = (isEng, course) => {  
    if (isEng) {
      this.setState({
        isEng: selQb,
        isNonEng: "",
        course_id: course[0].id
      }, () => {
          this.props.handleChange('course_id', {
            target: {
              value: this.state.course_id
            }
          });
      });
    } else {
      this.setState({
        isEng: "",
        isNonEng: selQb,
        course_id: course[1].id
      }, () => {
          this.props.handleChange('course_id', {
            target: {
              value: this.state.course_id
            }
          });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { isEng, isNonEng } = this.state;
    return (
      <Query query={GET_COURSES}
      fetchPolicy='network-only'
      >
        {({ data, error, loading, fetchMore }) => {
          
          if (loading) {
            return 'loading...';
          }
          if (error) {
            return JSON.stringify(error);
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
                <TextFieldLabel text="What is your qualification?" />
              </Grid>

              <Grid
                item
                container
                justify="flex-start"
                direction="row"
                alignItems="center"
                spacing={1}
                style={{ marginTop: 8 }}
              >
              <Grid item>
                <Paper
                  className={classes.paper}
                    onClick={(e) => {
                      this.handleClick(true, data.courses)
                    }
                    }
                >
                {isEng}
                <img
                  className={classes.img}
                  alt="engineering"
                  width="40px" 
                  height="40px"
                  src={Engineer}
                />
                <Grid item style={{ textAlign: "center" }}>
                  <InputLabel className={classes.label}>{data.courses[0].label}</InputLabel>
                </Grid>
                </Paper>
                </Grid>
                <Grid item>
                  <Paper
                    className={classes.paper}
                    onClick={(e) => {
                      this.handleClick(false,data.courses)}
                    }
                  >
                  {isNonEng}
                  <img
                    className={classes.img}
                    alt="non-engineering"
                    width="40px"
                    height="40px"
                    src={Artist}
                  />
                  <Grid item style={{ textAlign: "center" }}>
                    <InputLabel className={classes.label}>
                      {data.courses[1].label}                
                    </InputLabel>
                  </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          )
        }}
      </Query> 
    );
  }
}

const GET_COURSES = gql`
{
  courses{
    id
    label
    extra_info
  }
}
`;

IndexSeven.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexSeven);
