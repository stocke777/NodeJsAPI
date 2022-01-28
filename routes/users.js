
import express from 'express';
import {getAllUsers, createUser, loginUser, getUser, deleteUser, patchUser, authenticateToken, refreshToken} from '../controllers/users.js';

const router = express.Router();

router.post('/refresh', refreshToken);

router.get('/', authenticateToken, getAllUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', patchUser);

router.post('/:id', loginUser);


export default router;