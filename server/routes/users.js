import { addFavorites, addNewItem, adduser, getAllUsers, getUserById, loginUser } from '../controllers/UserController.js';
import express from 'express'
const router = express.Router();

router.route('/login').post(loginUser);
router.route('/getusers').get(getAllUsers);
router.route('/addusers').post(adduser);
router.route('/addfavorite/:id').patch(addFavorites);
router.route('/addItem/:id').patch(addNewItem);
router.route('/:id').get(getUserById);
export default router;
