import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    "Nom": String,
    "Prénom": String
});

const User = mongoose.model('Users', userSchema);

export default User;