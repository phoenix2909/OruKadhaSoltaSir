import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DragAndDrop from './DragAndDrop';
import TextFieldLabel from './TextFieldLabel';
import { Typography, withStyles} from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        outlineStyle: 'dashed',
        outlineWidth: 'thin',
        outlineColor: 'skyblue',
        display: 'inline-block',
        background: 'white',
        width: '100%',
        height: 200,
    }
})

class IndexSix extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            maxCount: 360, 
            currentCount: 0,
            project_abst: props.states.project_abst
        };
        this.updateTextField = this.updateTextField.bind(this);
    }

    updateTextField = (event, value) => {
        if (event.target.value && event.target.value.length > 0) {
            this.setState({ 
                currentCount: event.target.value.length,
                project_abst : event.target.value
            })
        }
        this.props.handleChange('project_abst',event)
    };

    render() {
        const { classes } = this.props;
        const { project_abst} = this.state
        return (
            <Grid container className={classes.root}
                direction="column"
                justify="center"
                alignItems="stretch" >

                <Grid item>
                    <TextFieldLabel text="Have you made something that you would like to show the world?" />
                </Grid>
                <Grid item>
                    <TextField
                        style={{ width: '100%' }}
                        multiline={true}
                        placeholder="Eg: Project information"
                        margin="normal"
                        variant="outlined"
                        value={project_abst}
                        rowsMax={5}
                        onChange={(e, v) => this.updateTextField(e, v)}
                        InputProps={{
                            endAdornment: (
                            <Typography
                                component="label" 
                                color="textSecondary" 
                                style={{ paddingLeft: 8, bottom: 0 }} >
                                {project_abst.length + '/' + this.state.maxCount}
                            </Typography>)
                        }}
                        // eslint-disable-next-line
                        inputProps={{
                            maxLength: 360
                        }} />
                </Grid>
                <Grid item >
                        <Typography align="center" gutterBottom>Or</Typography>                            
                </Grid>
                <Grid item>
                    <Paper className={classes.paper} square={false} elevation={1}>
                        <DragAndDrop text={'Upload a video'} />
                    </Paper>
                </Grid>
            </Grid>

        );
    }
}

export default withStyles(styles)(IndexSix);
