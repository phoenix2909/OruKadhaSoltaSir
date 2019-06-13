import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles';
import AutoSuggest from "./AutoSuggest";
import values from './ValArr';
import TextFieldLabel from "./TextFieldLabel";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

class IndexEleven extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            maxCount: 50, currentCount: 0, ValArr: values.ValArr, inputvalue: null, inputArr: [], value: '',
            suggestions: []
        };
        this.handleClick = this.handleClick.bind(this)
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleClick = (e) => {
        let { inputvalue } = this.state;
        inputvalue = e
        this.setState({
            inputvalue
        });

    }
    handleClick1 = (e) => {
        let { inputArr, inputvalue } = this.state;
        inputArr.push(inputvalue);
        inputvalue = "";
        this.setState({
            inputArr, inputvalue
        });

    }

    handleDelete = data => () => {
        this.setState(state => {
            const { inputArr } = this.state
            const chipToDelete = inputArr.indexOf(data);
            inputArr.splice(chipToDelete, 1);
            return { inputArr };
        });
    };

    render() {
        const { classes } = this.props;
        const { inputArr, inputvalue } = this.state;
        return (
            <Grid container 
            className={classes.root}
            direction="column"
            justify="center"
            alignItems="stretch">
                <Grid item>
                    <TextFieldLabel text="What are the top four values that best describe you ?"/>
                </Grid>
                <Grid container direction="row" alignItems="stretch">
                    <Grid item style={{width:'80%'}}>
                    <AutoSuggest handleClick={this.handleClick} value={inputvalue} />
                    </Grid>
                    <Grid item style={{width:'20%'}}>
                    <Button size="medium" variant="contained" color="primary" style={{height:'58%',top:16}}>
                        <AddIcon onClick={this.handleClick1} />
                    </Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    {inputArr.length !== 0 && inputArr.map((value, index) =>
                        <Grid item>
                        <Chip key={`${index}`} label={value} onDelete={this.handleDelete()} />
                        </Grid>
                        )
                    }
                </Grid>
            </Grid>            
        );
    }
}


export default withStyles(styles)(IndexEleven);
