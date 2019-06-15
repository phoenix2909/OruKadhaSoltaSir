import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import AutoSuggest from "./AutoSuggest";
import TextFieldLabel from './TextFieldLabel'
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
    divider: {
        height: theme.spacing.unit * 2,
    },
});

class IndexNine extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            maxCount: 50, currentCount: 0, inputvalue: null, inputArr: props.states.inputArr,
            suggestions: [],
            selected_skillsArr:props.states.selected_skillsArr,
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
    handleClick1 = (e, skillsList) => {
        let { inputArr, inputvalue, selected_skillsArr } = this.state;
        if (inputvalue !== '') {
            let skillsMutateList = skillsList.filter(lang => lang.label === inputvalue).map(langu => langu.id)[0];
            console.log(skillsMutateList);
            selected_skillsArr.push(skillsMutateList);
            console.log(selected_skillsArr);
            inputArr.push(inputvalue);
            inputvalue = "";
            this.setState({
                inputArr, inputvalue, selected_skillsArr: selected_skillsArr
            });
        }

    }

    handleDelete = i => () => {
        this.setState(() => {
            const { inputArr } = this.state
            inputArr.splice(i, 1);
            return { inputArr };
        });
    };

    render() {
        const { inputArr, inputvalue } = this.state;
        const { classes }=this.props;
        return (
            <Query query={GET_SKILLS} >
                {({ data, error, loading, fetchMore }) => {
                    if (loading) {
                        return 'loading...';
                    }
                    if (error) {
                        return JSON.stringify(error);
                    }
                    return (
            <Grid container className={classes.root} 
            direction="column"
            justify="center"
            alignItems="stretch">
                <Grid item>
                    <TextFieldLabel text="What are your skills ?"/>
                </Grid>
                <Grid container direction="row" alignItems="stretch">
                    <Grid item style={{width:'80%'}}>
                    <AutoSuggest handleClick={this.handleClick} value={inputvalue} sugges={data.skills}/>
                    </Grid>
                    <Grid item style={{width:'20%'}}>
                    <Button size="medium" variant="contained" color="primary" style={{height:'58%',top:16}}>
                        <AddIcon onClick={(e) => {this.handleClick1(e,data.skills)}} />
                    </Button>
                    </Grid>
                </Grid>
                <Grid item >
                    {inputArr && inputArr.map((skill, i) => <Chip key={`${i}`} label={skill} onDelete={this.handleDelete(i)} />)}
                </Grid>
                
                </Grid>
                    )
                }}
            </Query> 
        );
    }
}

const GET_SKILLS = gql`
{
  skills{
    label
    id
  }
}
`;

export default withStyles(styles)(IndexNine);
