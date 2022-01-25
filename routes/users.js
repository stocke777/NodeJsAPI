
import express from 'express';
import {getAllUsers, createUser, loginUser, getUser, deleteUser, patchUser} from '../controllers/users.js';

const router = express.Router();


router.get('/', getAllUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', patchUser);

router.post('/:id', loginUser);


export default router;