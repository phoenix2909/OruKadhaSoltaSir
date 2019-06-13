import React, { Component } from "react";
import Engineer from "../images/engineer.png";
import Artist from "../images/artist.png";
import Tick from "../images/checked.png";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, InputLabel } from "@material-ui/core";
import TextFieldLabel from "./TextFieldLabel";

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
      isNonEng: ""
    };
  }

  handleClick = isEng => {
    if (isEng) {
      this.setState({ isEng: selQb, isNonEng: "" });
    } else {
      this.setState({ isEng: "", isNonEng: selQb });
    }
  };

  render() {
    const { classes } = this.props;
    const { isEng, isNonEng } = this.state;
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
              onClick={this.handleClick.bind(this, true)}
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
                <InputLabel className={classes.label}>Engineering</InputLabel>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              className={classes.paper}
              onClick={this.handleClick.bind(this, false)}
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
                  Non-Engineering
                </InputLabel>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

IndexSeven.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexSeven);
