import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const styles = {
  avatar: {
    margin: 41,
  },
  bigAvatar: {
    margin: 20,
    width: 120,
    height: 120,
  },
};

function ImageAvatars(props) {
  const { classes , sourceImage} = props;
  return (
      <Avatar alt="Remy Sharp" src={sourceImage} className={classes.avatar} />
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);