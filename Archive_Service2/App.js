import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

import getUsers from "./routes/user_routes.js"
import { rabbitConnect } from "./message_bus/message_bus.js"

if (process.env.NODE_ENV == "prod") {
    process.env['RABBITMQ_URL'] = 'rabbitmq-clusterip-srv'
}else if (process.env.NODE_ENV == "dev") {
    process.env['RABBITMQ_URL'] = 'localhost'
}
console.log(process.env.NODE_ENV)

const app = express();
rabbitConnect();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user', getUsers);

const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0.ddvsetx.mongodb.net/?retryWrites=true&w=majority';
const PORT = 3000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));