const express = require ('express');
const bodyParser = require ('body-parser');
const passport = require ('passport');

const app = express ();

// Body parser middleware
app.use (express.json());

// DB Config
const connectDB = require ('../config/db');
connectDB ();

//Get roles
const { getRoles } = require ("./roles");
getRoles ();

// passport
app.use (passport.initialize ());
require ('../config/passport')(passport);

/*** routes ***/

const service = require ('./routes/service');
app.use ('/api/todo', service);

const users = require ('./routes/users');
app.use ('/api/users', users);

const items = require ('./routes/items');
app.use ('/api/todo/items', items);

// catch all
app.get ("*", (req, res) => res.json ({ msg: 'Todo Service!' }));

const port = process.env.PORT;

app.listen (port, () => console.log (`Server running on port ${port}`));
