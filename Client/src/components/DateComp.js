import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {        
        width: '100%',
    },
});

function DateComp(props) {
    const { classes } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{paddingRight:8}}>
            <TextField
                id="date"
                margin="normal"
                variant="outlined"
                type="month"
                className={classes.textField}
                />
        </MuiPickersUtilsProvider>        
    );
      
}

export default withStyles(styles)(DateComp);
