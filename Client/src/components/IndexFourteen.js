import React, { Component } from "react";
import { withStyles, Grid, TextField } from "@material-ui/core";
const CongratsPic =
  "https://previews.123rf.com/images/ongkachakon/ongkachakon1507/ongkachakon150700040/42434636-red-yellow-congratulations-text-and-fireworks-abstract-vector.jpg";
const CopyPic =
  "https://visualpharm.com/assets/808/Copy-595b40b65ba036ed117d4395.svg";
const CopyPin =
  "https://cdn3.iconfinder.com/data/icons/networking-glyphs/70/link__chain__url__pin__attachment-512.png";

const styles = theme => ({
  congratpic: {
    marginTop: "36px",
    textAlign: "center"
  },
  img: {
    width: "150px"
  },
  copycontainer: {
    textAlign: "center",
    marginTop: "15px"
  },
  textfield: {
    fontSize: "smaller",
    color: theme.palette.primary.light,
    background: "white",
    width: "87%",
    marginLeft: "46px",
    marginInlineStart: "47px"
  },
  copypic: {
    width: "40px",
    height: "30px"
  },
  copypin: {
    width: "45px",
    height: "34px"
  },
  pincontainer: {
    position: "absolute",
    background: "white",
    borderRadius: "50%",
    zIndex: "2",
    padding: "8px",
    marginTop: "5px"
  }
});

class IndexFourteen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "orukadhasoltasir.com/sowrabh"
    };
  }
  async handleCopy(e) {
    e.preventDefault();
    await navigator.clipboard.writeText("Test Data");
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid item className={classes.congratpic}>
          <img className={classes.img} src={CongratsPic} alt="Congrats Pic" />
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          className={classes.copycontainer}
        >
          <Grid item className={classes.pincontainer}>
            <img src={CopyPin} className={classes.copypin} alt="Copy Pic" />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-adornment-amount"
              margin="dense"
              className={classes.textfield}
              variant="outlined"
              value={this.state.link}
              InputProps={{
                endAdornment: (
                  <img
                    src={CopyPic}
                    className={classes.copypic}
                    alt="Copy Pic"
                    copytext={this.state.link}
                    onClick={this.handleCopy}
                  />
                )
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(IndexFourteen);
