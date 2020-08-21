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

//Connect to DB
mongoose.connect('mongodb+srv://Liron:Wassa@carposts.mv7ns.mongodb.net/carposts?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//Requring routes
const carsRoute = require('./routes/cars');
const userRoute = require('./routes/user');

//Config
app.use(express.json());
dotenv.config();
app.use(cors({
  origin: 'http://localhost:3000',
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
app.use('/', carsRoute);
app.use('/', userRoute);

if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "..", 'client', 'build')
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  });
};

app.listen(process.env.PORT || 5000, () => {
  console.log('server has running!');
});