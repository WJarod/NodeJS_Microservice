import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    "Nom": String,
    "Prénom": String
});

const User = mongoose.model('Archives_Users', userSchema);

export default User;