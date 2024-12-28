import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';
import { catagoryController, deleteCatagoryController, getCatagoryController, singleCatagoryController, updateCatagoryController } from '../controllers/catagoryController.js';

const router = express.Router();



//routes

//create catagory
router.post('/create-catagory', requireSignIn, isAdmin, catagoryController);

//update catagory
router.put('/update-catagory/:id', requireSignIn, isAdmin, updateCatagoryController)

//getAll catagory
router.get('/get-catagory', getCatagoryController);

//single catagory
router.get('/single-catagory/:slug', singleCatagoryController);

//delete catagory
router.delete('/delete-catagory/:id', requireSignIn, isAdmin, deleteCatagoryController);

export default router;
