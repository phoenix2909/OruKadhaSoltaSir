import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.input,
                    },
                }}
                {...other}
            />
        </Grid>
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) =>
                    part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        ),
                )}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value,sugges) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : sugges.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const styles = theme => ({
    root: {
        width: '100%'
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
    MuiFormControl: {
        marginBottom: '0px'
    }
});

class AutoSuggest extends React.Component {
    state = {
        single: "",
        popper: '',
        suggestions: [],
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.sugges),
        });
    };
    componentWillReceiveProps(newprops) {
        this.setState({ single: newprops.value })
    }
    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = name => (event, { newValue }) => {
        this.props.handleClick(newValue)
        this.setState({
            [name]: newValue,
        });
    };

    render() {
        const { classes } = this.props;
        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        };

        return (
           
                     <div className={classes.root}>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        id: "autosuggest",
                        classes,
                        placeholder: '',
                        value: this.state.single,
                        onChange: this.handleChange('single'),
                    }}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options => (
                        <Paper {...options.containerProps} square>
                            {options.children}
                        </Paper>
                    )}
                />
                <div className={classes.divider} />
            </div>
               
        );
    }
}

Autosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoSuggest);