//For basic CRUD application we need following modules
global.express = require('express');
global.bodyParser = require('body-parser');
global.session = require('express-session');
global.mysql = require('mysql');
const app = express();

const port = 5000;

global.db = require('./include/connection');
const router = require('./include/routes');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'demo_session', saveUninitialized: true, resave: true }));

app.set('view engine', 'ejs');
app.use('/', router);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});