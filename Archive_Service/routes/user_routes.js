import express from 'express';
import { getUsers, createUser } from "../controllers/user_contoller.js"

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;