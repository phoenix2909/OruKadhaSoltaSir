import React, { Component } from "react";
import ButtonAppBar from "./AppBar";
import IndexOne from "./IndexOne";
import IndexTwo from "./IndexTwo";
import IndexThree from "./IndexThree";
import IndexFour from "./IndexFour";
import IndexFive from "./IndexFive";
import IndexSix from "./IndexSix";
import IndexSeven from "./IndexSeven";
import IndexEight from "./IndexEight";
import IndexNine from "./IndexNine";
import IndexTen from "./IndexTen";
import IndexEleven from "./IndexEleven";
import IndexTwelve from "./IndexTwelve";
import IndexThirteen from "./IndexThirteen";
import IndexFourteen from "./IndexFourteen";
import Header from "./Header";
import { Grid, withStyles, Button, Typography } from "@material-ui/core";
import gql from 'graphql-tag'
import { ApolloConsumer, } from 'react-apollo'


const style = theme => ({
  root: {
    backgroundColor: "#f4f9ff",
    width: "100%"
  },
  bottomBtnContainer: {
    textAlign: "center",
    paddingBottom: "0.7rem",
    position: "fixed",
    width: "100%",
    bottom: "0%",
    zIndex: 10,
    background: "#f4f9ff"
  },
  bottomBtn: {
    backgroundImage: "linear-gradient(to right, #00d2ff 0%, #3a7bd5 51%)",
    color: "white",
    height: "50px",
    width: "95%",
    textAlign: "center",
    textTransform: "capitalize"
  },
  container: {
    width: "100%",
    height: "fit-content",
    // overflow: "auto",
    paddingBottom: 74
  },
  header: {
    marginTop: theme.spacing(2)
  },
  content: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    width: "100%"
  }
});

class HomeComp extends Component {
  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      user_id: "50e21e38-d914-479f-a39e-fab882237063",
      profile_id : '',
      step: 1,
      stateIndex:[
        {
          full_name:'',
          mobile:'',
          mobileErr:null,
          email:'sowrab@gmail.com',
          emailErr:null
        },
        {
          photo:'',
        },
        {
          sm_intro:''
        },
        {
          per_loc:'',
          cur_loc:''
        },
        {
          selected_lang_arr:[]
        },
      ],
      
    };
  }

  handleStatesUpdate=(input,event) =>{
    let { stateIndex,step } = this.state;
    stateIndex[step-1][input] = event.target.value;
    this.setState({
       stateIndex:stateIndex
    });
  }

  // Proceed to next step
  nextStep = async (e,myClient) => {
    if (this.state.step !== 14) {
        this.setState((state, props) => ({
          step: state.step + 1
      }));
    }
    if(this.state.step === 1)
    {
      await myClient.mutate({
        mutation: gql`
        mutation UpdateNameAndMobile($full_name: String, $mobile: String,$user_id:String!) 
        {
          update_basic_info(full_name: $full_name, mobile: $mobile, user_id: $user_id) 
          {
            profile
            {
              id
            }
            status
            message
          }
        }
        `,
        variables: {
          "full_name": this.state.stateIndex[0]['full_name'],
          "mobile": this.state.stateIndex[0]['mobile'],
          "user_id": this.state.user_id
        }
      })
      .then(data => {
        console.log(data.data.update_basic_info.status);
        if(data.data.update_basic_info.status === false){
          let {stateIndex}=this.state;
          stateIndex[0]['mobileErr'] = data.data.update_basic_info.message
          this.setState({
            stateIndex:stateIndex  
          })
        }
        else{
          this.setState({
            mobileErr:''
          })
        }
        this.setState({
          profile_id: data.data.update_basic_info.profile.id,
        });
        console.log(this.state.profile_id);        
      })
      .catch(err => {
        console.log(err);
      })
      return false    
    }
    else if (this.state.step === 2)
    {
      console.log(myClient);
      await myClient.mutate({
        mutation: gql`
        mutation UpdateProfilePic($photo:String, $profile_id:String!) 
        {
          update_profile_pic(photo:$photo, profile_id: $profile_id) 
          {
            status
            message
          }
        }
        `,
        variables: {
          "photo": this.state.stateIndex[1]['photo'],
          "profile_id": this.state.profile_id
        }
      })
      .then(data => {
        console.log(data.data.message)
        console.log(this.state.profile_id);
        
      })
      .catch(err => {
        console.log(err);
      })
      return false
    }
    else if (this.state.step === 3)
    {
      await myClient.mutate({
        mutation: gql`
        mutation UpdateSelfIntro($sm_intro:String, $profile_id:String!) 
        {
          update_self_intro(sm_intro:$sm_intro, profile_id: $profile_id) 
          {
            status
            profile
            {
              id
            }
            message
          }
        }
        `,
        variables: {
          "sm_intro": this.state.stateIndex[2]['sm_intro'],
          "profile_id": this.state.profile_id
        }
      })
        .then(data => {
          // console.log(this.state.profile_id);
          console.log(this.state);          
        })
        .catch(err => {
          console.log(err);
        })
      return false
    }
    else if(this.state.step === 4) 
    {
      await myClient.mutate({
        mutation: gql`
         mutation UpdateLocation($per_loc:String,$cur_loc:String, $profile_id:String!) 
        {
          update_location(per_loc:$per_loc,cur_loc:$cur_loc, profile_id: $profile_id) 
          {
            status
            profile
            {
              id
            }
            message
          }
        }
        `,
        variables: {
          "per_loc": this.state.stateIndex[3]['per_loc'],
          "cur_loc": this.state.stateIndex[3]['cur_loc'],
          "profile_id": this.state.profile_id
        }
      })
        .then(data => {
          console.log(data.data);
          console.log(this.state);
        })
        .catch(err => {
          console.log(err);
        })
      return false 
    }
    else if(this.state.step === 5)
    {
      await myClient.mutate({
        mutation: gql`
        mutation UpdateLanguages($profile_id:String!,$selected_lang_arr:[Int]) 
        {
          update_languages(profile_id: $profile_id, selected_lang_arr: $selected_lang_arr) 
          {
            status
            profile
            {
              id
            }
            message
          }
        }
        `,
        variables: {
          "selected_lang_arr":this.state.stateIndex[4]['selected_lang_arr'],
          "profile_id": this.state.profile_id
        }
      })
        .then(data => {
          console.log(data.data);
          console.log(this.state);
        })
        .catch(err => {
          console.log(err);
        })
      return false 
    }
  };
  
  // Go back to prev step
  prevStep = () => {
    this.setState((state, props) => ({
      step: state.step - 1
    }));
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { classes } = this.props;

    let component = <p>Error: 404, page not found</p>;
    let button = "Next";
    switch (step) {
      case 1:
        component = (
          <Grid item className={classes.content}>
            <IndexOne 
                handleChange={this.handleStatesUpdate}
                states={this.state.stateIndex[step-1]}
                />
          </Grid>
        );
        break;
        
        case 2:
            component = (
            <Grid item className={classes.content}>
            <IndexTwo 
                  handleChange={this.handleStatesUpdate}
              states={this.state.stateIndex[step-1]}
            />
          </Grid>
        );
        break;

      case 3:
        component = (
          <Grid item className={classes.content}>
            <IndexThree 
              handleChange={this.handleStatesUpdate}
              states={this.state.stateIndex[step - 1]}
            />
          </Grid>
        );
        break;

      case 4:
        component = (
          <Grid item className={classes.content}>
            <IndexFour 
              handleChange={this.handleStatesUpdate} 
              states={this.state.stateIndex[step - 1]}
              />
          </Grid>
        );
        break;
        
        case 5:
          component = (
            <Grid item className={classes.content}>
            <IndexFive 
              handleChange={this.handleChange} 
              states={this.state.stateIndex[step - 1]}
            />
          </Grid>
        );
        break;

      case 6:
        component = (
          <Grid item className={classes.content}>
            <IndexSix handleChange={this.handleChange} />
          </Grid>
        );
        break;

      case 7:
        component = (
          <Grid item className={classes.content}>
            <IndexSeven handleChange={this.handleChange} />
          </Grid>
        );
        break;

      case 8:
        component = (
          <Grid item className={classes.content}>
            <IndexEight handleChange={this.handleChange} />
          </Grid>
        );
        break;

      case 9:
        component = (
          <Grid item className={classes.content}>
            <IndexNine handleChange={this.handleChange} />
          </Grid>
        );
        break;

      case 10:
        component = (
          <Grid item className={classes.content}>
            <IndexTen handleChange={this.handleChange} />
          </Grid>
        );
        break;

      case 11:
        component = (
          <Grid item className={classes.content}>
            <IndexEleven handleChange={this.handleChange} />
          </Grid>
        );
        break;

      case 12:
        component = (
          <Grid item className={classes.content}>
            <IndexTwelve handleChange={this.handleChange} />
          </Grid>
        );
        break;

      case 13:
        component = (
          <Grid item className={classes.content}>
            <IndexThirteen handleChange={this.handleChange} />
          </Grid>
        );
        break;
      case 14:
        button = "Good Luck Bye );";
        component = (
          <Grid item className={classes.content}>
            <IndexFourteen handleChange={this.handleChange} />
          </Grid>
        );
        break;

      default:
        button = "Home";
        return <h1>Error : 404 Page not found!</h1>;
    }

    return (
      <ApolloConsumer >
        {myClient => {
          return (
          <Grid
            container
            className={classes.root}
            direction="column"
            justify="space-between"
            alignItems="stretch"
          >                 
            <Grid item container direction="column">
              <Grid item className={classes.appBar}>
                <ButtonAppBar />
              </Grid>
              <Grid item container direction="column" className={classes.container}>
                <Grid item className={classes.header}>
                  {button === "Next" ? (
                    <Header step={step} prevStep={this.prevStep} />
                  ) : (
                      ""
                    )}
                  {component}
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.bottomBtnContainer}>
              <Button className={classes.bottomBtn} onClick={(e) => {
                this.nextStep(e,myClient)}}>
                {button === "Next" ? (
                  <Typography variant="body1">{button} &rarr;</Typography>
                ) : (
                    <Typography variant="body1">{button}</Typography>
                  )}
              </Button>
            </Grid>
          </Grid>

          )
        }}
      </ApolloConsumer>
      
        );
  }
}

export default withStyles(style)(HomeComp);
