import User from '../models/user.js';
import { sendToQueue } from '../message_bus/message_bus.js';

export const getUsers = async (req, res) => {
    try {
        // use find() to get all users from the database
        const users = await User.find();
        res.status(200).json(users);
    }   
    catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getUser = async (req, res) => {
    try {
        // use finById() to get a specific user from the database
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
        // Use save() to create a new user to the database
        await newUser.save();
        sendToQueue('user_created',newUser);
        res.status(201).json(newUser);
    }   
    catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const body = req.body;
    const newUser = new User(body);
    try {

        sendToQueue('user_updated',newUser);
        try {
            // Use findByIdAndUpdate() to update a user in the database
            await User.findByIdAndUpdate(req.params.id, newUser);
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(404).json({ message: error.message});
        }

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        // use finById() to get a specific user from the database
        const user = await User.findById(req.params.id);

        sendToQueue('user_deleted',user);
        try {
            // Use findByIdAndDelete() to delete a specific user to the database
            await User.findByIdAndDelete(req.params.id);
            res.status(201).json(`${req.params.id} : supprimer`);
        }catch (error) {
            console.log(error.message);
        }

    }catch (error) {
        console.log(error.message);
        res.status(404).json({ message: error.message});
    }
}