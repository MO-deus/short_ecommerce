import express from 'express'
const router = express.Router();
import {getAllProducts, createProduct, updateProduct} from '../controllers/ProductController';

router.route('/getallproducts').get(getAllProducts);
router.route('/createproduct').post(createProduct);
router.route('/updateproduct/:id').patch(updateProduct);

export default router;