import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    "Nom": String,
    "Prénom": String
});

const User = mongoose.model('Archives_Users2', userSchema);

export default User;