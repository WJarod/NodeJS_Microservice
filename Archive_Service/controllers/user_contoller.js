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

export const createUser = async (req, res) => {
    const body = req.body;
    const newUser = new User(body);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    }   
    catch (error) {
        res.status(404).json({ message: error.message});
    }
}
