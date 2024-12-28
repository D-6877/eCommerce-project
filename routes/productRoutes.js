import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProduct, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/ProductController.js';
import formidable from 'express-formidable'
import product from '../models/productModels.js';

const router = express.Router();


//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)


//Get products
router.get('/get-product', getProductController);

//get single product
router.get('/get-product/:slug', getSingleProduct);

//get photo 
router.get('/product-photo/:pid', productPhotoController);


//delete products
router.delete('/delete-product/:pid', deleteProductController);


//update products
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)


//filter products
router.post('/product-filter', productFilterController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);


//search product 
router.get('/search/:keyword', searchProductController);

//similar product
router.get('/related-product/:pid/:cid', relatedProductController);

// category wise product
router.get('/product-category/:slug', productCategoryController);


export default router;
