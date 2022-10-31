import express from 'express';
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/user_contoller.js"

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser); 

export default router;