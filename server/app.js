const express = require('express');
const routes = require('./Routes/route');
const dotenv = require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');

//Defines the express app
const app = express();

//Define the port
const PORT = process.env.PORT;

// Enable CORS
app.use(cors());

//Middlewares
//It gets called before any API is called
//accept the json
app.use(express.json());
//accept the body
app.use(express.urlencoded({ extended: true }));

//to show html
//app.use(express.static('public'));

app.use("/api/v1/", routes);

//Check the connection with the database is correct or not.
try {
    sequelize.authenticate()
        .then(() => {
            console.log(`Authenticated to DB successfully.`);
        })
        .catch(err => {
            console.log(`Error occured during db connection: ${err}`);
        });
} catch (error) {
    console.error('Unable to connect to the database: ', error);
};

//Creates a port
app.listen(PORT, () => {
    console.log(`App is running on port:${PORT} `);
});