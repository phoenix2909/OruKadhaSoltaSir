import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TextFieldLabel from "./TextFieldLabel";
import Tick from "../images/checked.png";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import hobbies from "./HobbiesObj";

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
  control: {
    padding: theme.spacing.unit
  },
  image: {
    width: 128,
    height: 128
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
    fontSize: "smaller",
    color: theme.palette.primary.light,
    marginTop: 7
  },
  textfield: {
    width:"100%"
  }
});

export class IndexTwelve extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      maxCount: 50,
      currentCount: 0,
      selectedHobby: [],
      HobbiesObj: hobbies.HobbiesObj,
      select: ""
    };
    this.updateTextField = this.updateTextField.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateTextField = (event, value) => {
    if (event.target.value && event.target.value.length > 0) {
      this.setState({ currentCount: event.target.value.length });
    }
  };
  handleClick = event => {
    this.setState((state, props) => ({
      HobbiesObj: state.HobbiesObj.map((hobby, index) => {
        var temp = hobby;
        if (index === event) {
          temp.isSelected = !temp.isSelected;
        }
        return temp;
      })
    }));
  };
  handleChange = e => {
    var empty = e.target.value.length <= 0 ? true : false;
    let lower = e.target.value.toLowerCase();
    var temporary = this.state.HobbiesObj.filter(value => {
      return value.name.toLowerCase().indexOf(lower) > -1;
    });
    if (!empty) {
      this.setState({
        HobbiesObj: temporary
      });
    } else {
      this.setState({ HobbiesObj: hobbies.HobbiesObj });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid item>
          <TextFieldLabel text="What are your hobbies?" />
        </Grid>
        <Grid container direction="row" alignItems="stretch">
          <Grid item style={{ width: "80%" }}>
            <TextField
              id="required"
              margin="normal"
              variant="outlined"
              className={classes.textfield}
              onChange={e => {
                this.handleChange(e);
                this.updateTextField(e);
              }}
            />
          </Grid>
          <Grid item style={{ width: "20%" }}>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              style={{ height: "67%", top: 16 }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          direction="row"
          alignItems="center"
          my="auto"
          spacing={1}
        >
          {this.state.HobbiesObj.map((hobby, index) => (
            <Grid item key={index}>
              <Paper
                className={classes.paper}
                count={index}
                onClick={this.handleClick.bind(this, index)}
              >
                {hobby.isSelected ? selQb : ""}
                <img
                  className={classes.img}
                  alt={hobby.name}
                  width="40px"
                  height="40px"
                  src={hobby.image}
                />
                <Grid item style={{ textAlign: "center" }}>
                  <InputLabel className={classes.label}>
                    {hobby.name}
                  </InputLabel>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

IndexTwelve.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexTwelve);
