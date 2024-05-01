import { addFavorites, addNewItem, adduser, getAllUsers } from '../controllers/UserController.js';
import express from 'express'
const router = express.Router();

router.route('/getusers').get(getAllUsers);
router.route('/addusers').post(adduser);
router.route('/addProduct').patch(addFavorites);
router.route('/addItem').patch(addNewItem);
export default router;
