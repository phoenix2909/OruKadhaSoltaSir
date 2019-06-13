import React from 'react';
import {Typography,withStyles} from '@material-ui/core';

const styles=theme =>({
    label:{
        width: '100%',
        textAlign: 'left',
        fontSize: 'smaller',
        color:theme.palette.primary.light,
       },  
})

function TextFieldLabel(props){
    const {text,classes}= props;
    return <Typography component="label" className={classes.label}>{text}</Typography>
}

export default withStyles(styles)(TextFieldLabel);