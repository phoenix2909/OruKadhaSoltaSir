import React from "react";
import { Grid, Avatar, withStyles, IconButton } from "@material-ui/core";
import backArrow from "../images/arrows-direction-left-arrow-icon.svg";
import uploadImage from "../images/upload-to-cloud.png";
import userImage from "../images/user.png";
import presentation from "../images/presentation.png";
import graduationHat from "../images/graduation-hat.png";

const style = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
});

const giveMyImage = [
  userImage,
  uploadImage,
  uploadImage,
  uploadImage,
  uploadImage,
  presentation,
  graduationHat,
  uploadImage,
  uploadImage,
  uploadImage,
  uploadImage,
  uploadImage
];

class Header extends React.Component {
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { classes, step } = this.props;
    let image = giveMyImage[step - 1];
    let isBackArrowHere = (
      <IconButton onClick={this.back}>
        <Avatar src={backArrow} style={{ background: "#bdbdbd00" }} />
      </IconButton>
    );

    if (step === 1) {
      isBackArrowHere = (
        <IconButton disabled>
          <Avatar src={null} style={{ background: "#bdbdbd00" }} />
        </IconButton>
      );
    }

    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{isBackArrowHere}</Grid>
        <Grid item>
          <IconButton>
            <Avatar style={{ height: 60, width: 60 }} src={image} />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(Header);
