import { adduser, getAllUsers } from '../controllers/UserController.js';
import express from 'express'
const router = express.Router();

router.route('/getusers').get(getAllUsers);
router.route('/addusers').post(adduser);

export default router;
