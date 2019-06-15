import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles';
import AutoSuggest from "./AutoSuggest";
import TextFieldLabel from "./TextFieldLabel";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
            maxCount: 50, currentCount: 0, inputvalue: null, inputArr: props.states.inputArr, value: '',
            suggestions: [],selected_valuesArr:props.states.selected_valuesArr
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
    handleClick1 = (e, valuesList) => {
        let { inputArr, inputvalue, selected_valuesArr } = this.state;
        if (inputvalue !== '') {
            let valuesMutateList = valuesList.filter(value => value.label === inputvalue).map(val => val.id)[0];
            console.log(valuesMutateList);
            selected_valuesArr.push(valuesMutateList);
            console.log(selected_valuesArr);
            inputArr.push(inputvalue);
            inputvalue = "";
            this.setState({
                inputArr, inputvalue, selected_valuesArr: selected_valuesArr
            });
        }

    }
    handleDelete = i => () => {
        this.setState(state => {
            const { inputArr } = this.state
            inputArr.splice(i, 1);
            return { inputArr };
        });
    };

    render() {
        const { classes } = this.props;
        const { inputArr, inputvalue } = this.state;
        return (
            <Query query={GET_VALUES} >
                {({ data, error, loading, fetchMore }) => {
                    if (loading) {
                        return 'loading...';
                    }
                    if (error) {
                        return JSON.stringify(error);
                    }
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
                    <AutoSuggest handleClick={this.handleClick} value={inputvalue} sugges={data.values}/>
                    </Grid>
                    <Grid item style={{width:'20%'}}>
                    <Button size="medium" variant="contained" color="primary" style={{height:'58%',top:16}}>
                        <AddIcon onClick={(e)=>this.handleClick1(e,data.values)} />
                    </Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    {inputArr.length !== 0 && inputArr.map((value, index) =>
                        <Grid item>
                            {inputArr && inputArr.map((lang, i) => <Chip key={`${i}`} label={lang} onDelete={this.handleDelete(i)} />)}
                        </Grid>
                        )
                    }
                </Grid>
            </Grid>   
                    )
                }}
            </Query>          
        );
    }
}
const GET_VALUES = gql`
{
  values{
    id
    label
  }
}
`;

export default withStyles(styles)(IndexEleven);
