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

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
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

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json(`${req.params.id} : supprimer`);
        console.log(`${req.params.id} : supprimer`)
    }catch (error) {
        res.status(404).json({ message: error.message});
    }
}