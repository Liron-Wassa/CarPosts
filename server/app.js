const passportConfig = require('./config/passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const app = express();
dotenv.config();

//Connect to DB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

//Requring routes
const carsRoute = require('./routes/cars');
const userRoute = require('./routes/user');
const passwordRoute = require('./routes/password');

//Config
app.use(express.json());
app.use(cors({
  origin: 'https://car-posts.herokuapp.com',
  credentials: true
}));
app.use(expressSession({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

//Routes
app.use('/cars', carsRoute);
app.use('/user', userRoute);
app.use('/password', passwordRoute);

if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "..", 'client', 'build');
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  });
};

app.listen(process.env.PORT || 5000, () => {
  console.log('server has running!');
});