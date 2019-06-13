import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import AutoSuggest from "./AutoSuggest";
import TextFieldLabel from './TextFieldLabel';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',    
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

export class IndexFive extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
       inputArr:[], inputvalue: null, value: '',
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
    if(inputvalue !== '')
    {
      inputArr.push(inputvalue);
      inputvalue = "";
      this.setState({
        inputArr, inputvalue
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

    const { inputvalue, inputArr } = this.state;
    return (
       <Query query={GET_LANGUAGES} >
                {({ data, error, loading, fetchMore}) => {
                 if(loading) {
                     return 'loading...';
                 }   
                 if(error) {
                     return JSON.stringify(error);
                 }
                return (
      <Grid justify="center" alignItems="flex-start" container direction="column">
        <Grid item>
          <TextFieldLabel text="What languages can you speak ?" />
        </Grid>
        <Grid item container direction="row" alignItems="stretch" >
          <Grid item style={{width:'80%'}}>
          <AutoSuggest handleClick={this.handleClick} value={inputvalue} sugges={data.languages}/>
          </Grid>
          <Grid item style={{width:'20%'}}>
          <Button size="medium" variant="contained" color="primary" style={{height:'58%',top:16}}>
            <AddIcon onClick={this.handleClick1} />
          </Button>
          </Grid>         
        </Grid>
        <Grid item>
         {inputArr && inputArr.map((lang,i) => <Chip key={`${i}`} label={lang} onDelete={this.handleDelete(i)} /> )}
        </Grid>
      </Grid>
          )
        }}
      </Query> 
    );
  }
}

const GET_LANGUAGES = gql `
{
  languages{
    label
  }
}
`;

export default withStyles(styles)(IndexFive);
