const express = require('express');
const app = express();
const port = 8000;
const layouts = require('express-ejs-layouts');

// to set view engine as ejs
app.set('view engine','ejs');
app.set('views','./views');


// to set layouts
app.use(layouts);

// to use assets
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('error in running server',err);
    }else{
        console.log('Server is running up on port :',port);
    }
})
