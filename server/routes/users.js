import { addFavorites, addNewItem, adduser, getAllUsers, loginUser } from '../controllers/UserController.js';
import express from 'express'
const router = express.Router();

router.route('/login').post(loginUser);
router.route('/getusers').get(getAllUsers);
router.route('/addusers').post(adduser);
router.route('/addProduct/:id').patch(addFavorites);
router.route('/addItem/:id').patch(addNewItem);
export default router;
