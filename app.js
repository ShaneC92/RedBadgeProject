require('dotenv').config();

var express = require('express');
var app = express();


//controllers
const Movie = require('./controllers/moviecontroller');
const favMovie = require('./controllers/favmoviecontroller');
const User = require('./controllers/usercontroller');
const weekly = require("./controllers/weeklyRecommandation");

//database
const sequelize = require('./db');
sequelize.sync(); //to drop tables --> {force: true}
app.use(express.json());
app.use(require('./middleware/headers'));

app.listen(process.env.PORT, function(){
    console.log(`app is listening on ${process.env.PORT}`)
});

//Routes
app.use('/user', User);
app.use(require('./middleware/validate-session'));
app.use("/weekly",weekly);
app.use('/movie', Movie);
app.use('/favorites', favMovie);