import express from 'express'
const router = express.Router();
import {getAllProducts, createProduct, updateProduct, findProductById, deleteProductById} from '../controllers/ProductController.js';

router.route('/getallproducts').get(getAllProducts);
router.route('/createproduct').post(createProduct);
router.route('/updateproduct/:id').patch(updateProduct);
router.route('/getProductById/:id').get(findProductById);
router.route('/deleteProductById/:id').delete(deleteProductById);
export default router;