const express = require('express');
const app = express();
const port = 8000;
const layouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;


// to set layouts
app.use(layouts);

// set up the connect flash
const connectFlash = require('connect-flash');
const customMware = require('./config/middleware');

// to set urlencoded
app.use(express.urlencoded());
app.use(cookieParser());

// to use assets
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// to set view engine as ejs
app.set('view engine','ejs');
app.set('views','./views');

// setup the chat server to be used with the socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listenning on port : 5000');



// set up the express session and passport
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// setup the authentication using google
const googleStrategy = require('./config/passport_google_strategy');


// set up the mongo store
app.use(session({
    name:'chat_box',
    secret:'helloWorld!',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*80*60)
    },
    store:new MongoStore({
        mongoUrl:'mongodb://127.0.0.1/chat_box_db'
    },
    {
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err||'successfully added mongostore')
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// using connect flash to show notifications
app.use(connectFlash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('error in running server',err);
    }else{
        console.log('Server is running up on port :',port);
    }
})
