import User from '../models/user.js';

export var getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }   
    catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createUser = async (data) => {
    const newUser = new User(data);
    try {
        await newUser.save();
        console.log('User created');
    }   
    catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async (data) => {
    const newUser = new User(data);
    try {
        await User.findByIdAndUpdate(data._id, newUser);
        console.log('User updated');
    }
    catch (error) {
        console.log(error.message);
    }
}