import React, { Component } from "react";
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

class DateComp extends Component{

    constructor(props) {
        super(props);        
        this.state = {
            comp_date:''
        }
    }

    onchange = (value) => {
        console.info('VALUE',value)
        value = value.target.value
        this.setState({
            comp_date:value
        },()=>{
            this.props.onChange(value);
        })
    }
    componentDidMount() {
        this.setState({
            comp_date:this.props.comp_date
        });
    }
   
    render(){
        const { classes } = this.props;
        return (
                <MuiPickersUtilsProvider utils={DateFnsUtils} style={{paddingRight:8}}>
                    
                    <TextField
                        id="date"
                        margin="normal"
                        variant="outlined"
                        type="month"
                        value={this.state.comp_date}
                        className={classes.textField}
                        onChange={this.onchange}
                    />
                </MuiPickersUtilsProvider>        
        );     
    }
}
export default withStyles(styles)(DateComp);
