const express = require('express');
const path = require('path');
const app = express();

//Requring routes
const carsRoute = require('./routes/cars');

//Routes
app.use('/', carsRoute);

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