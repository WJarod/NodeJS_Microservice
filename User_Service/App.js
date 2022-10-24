import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import getUsers from "./routes/user_routes.js"
import getUser from "./routes/user_routes.js"
import createUser from "./routes/user_routes.js"
import deleteUser from "./routes/user_routes.js"

const app = express();


app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    cors({ 
        Origin: 'http://localhost:5000', 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: [
            'Content-Type', 
            'Authorization', 
            'Origin', 
            'x-access-token', 
            'XSRF-TOKEN'
        ], 
        preflightContinue: false
    })
  );

app.use('/', getUsers);
app.use('/', getUser);
app.use('/', createUser);
app.use('/', deleteUser);

const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0.ddvsetx.mongodb.net/?retryWrites=true&w=majority';
const PORT = 1000;

mongoose.connect(CONNECTION_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => 
    app.listen(
        PORT, () => console.log(`Server is running on port: ${PORT}`)
        )
    ).catch((error) => console.log(error.message));