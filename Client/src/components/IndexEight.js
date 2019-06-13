import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateComp from './DateComp';
import TextFieldLabel from './TextFieldLabel';

const styles = theme => ({
    root: {
        flexGrow:1
    },
});

class IndexEight extends Component {

    // constructor(props) {
    //     super(props);        
    // }

    render() {
        const {classes}= this.props;
        return (
            <Grid container className={classes.root} 
                direction="column"
                justify="center"
                alignItems="stretch">
                <Grid item>
                    <TextFieldLabel text="When did you complete your education ?"/> 
                </Grid>
                <Grid item>
                    <DateComp/>
                </Grid>
            </Grid>                   
        );
    }
}

export default withStyles(styles)(IndexEight);
