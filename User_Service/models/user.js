import mongoose from "mongoose";

//* Créer un schéma pour le user*/
const userSchema = mongoose.Schema({

    //* User*/
    "Nom": String,
    "Prénom": String
});

//* Créer un modèle pour le user*/
const User = mongoose.model('Users', userSchema);

export default User;