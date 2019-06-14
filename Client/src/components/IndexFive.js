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
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IndexFive extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      inputArr: props.states.inputArr, inputvalue: null, value: '', selected_lang_arr:props.states.selected_lang_arr,
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
  handleClick1 = (e,languagesList) => {
    let { inputArr, inputvalue, selected_lang_arr } = this.state;
    if(inputvalue !== '')
    {
    let languageMutateList = languagesList.filter(lang => lang.label === inputvalue).map(langu => langu.id)[0];
    console.log(languageMutateList);
      selected_lang_arr.push(languageMutateList);
      console.log(selected_lang_arr);
      inputArr.push(inputvalue);
      inputvalue = "";
      this.setState({
        inputArr, inputvalue, selected_lang_arr:selected_lang_arr
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
            <AddIcon onClick={(e) => this.handleClick1(e,data.languages)} />
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
    id
  }
}
`;

export default withStyles(styles)(IndexFive);
