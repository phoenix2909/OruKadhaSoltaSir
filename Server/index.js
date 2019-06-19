'use strict'; 

//Requring important constants
const Express =require('express');
const dotenv =require('dotenv');
const cookieParser =require('cookie-parser');
const logger =require('morgan');
const models =require('./models');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const test = require('./schema/mutation_resolvers');
const a = test.update_skills_rating({
    profile_id: '5b1092e4-895f-48c4-9796-f254aa59178f',
    rated_skills: [{ id: 1, rating: 900 }, { id: 2, rating: 900 }]
}).then(data => {
    console.log(data);
})

//Requring authentication middleware
const auth = require('./routes/utils/authMiddleware');

//Initializing Environment Variables
dotenv.config();

//Configuring port number
const port=process.env.PORT || '8080';

//Creating Express Instance
const app=Express();

//Requring Routes
const {userRouter}=require('./routes/users/index');
const {}=require('./routes/masters/index');
const {profileRouter}=require('./routes/profile/index');

//Configuring middleware
app.use(cors())
app.use(logger('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookieParser());

//Index route
app.get('/',(req,res)=>{
    res.status(200).send({message:"Server is up running on "+port})
});

//Configuring GraphQL middleware
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
  }));

//Routing
app.use('/',userRouter);

//Setting Authenticating middleware
app.use(auth);

//Authenticated router
app.use('/',profileRouter);

//Creating schemea and starting server
models.sequelize.sync().then(()=>{
   //Starting server
   app.listen(port,(e)=>{
    if(e){
        console.log("Unable to start server");
        console.log(e);
        return;
    }
    console.log("Server up on "+port);
});
}).catch((err)=>{
    console.log('Unable to create tables');
    console.log(err);
})