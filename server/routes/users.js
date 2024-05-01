import { addFavorites, addNewItem, adduser, getAllUsers } from '../controllers/UserController.js';
import express from 'express'
const router = express.Router();

router.route('/getusers').get(getAllUsers);
router.route('/addusers').post(adduser);
router.route('/addProduct/:id').patch(addFavorites);
router.route('/addItem/:id').patch(addNewItem);
export default router;
