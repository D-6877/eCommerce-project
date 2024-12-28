import express from 'express';
import { forgotpasswordcontroller, logincontroller, registerController, testController, updateProfileCOntroller } from '../controllers/authcontroller.js';
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';



//router object
const router = express.Router();

//routing

//register ||post
router.post('/register', registerController);

//login  || post
router.post('/login', logincontroller);

//forgot passowrd
router.post('/forgot-password', forgotpasswordcontroller);



//test routers  ||middleware use
router.get('/test', requireSignIn, isAdmin, testController);




//protected user  route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: 'true' });
})


//protected admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: 'true' });
})

//update profile
router.put('/profile', requireSignIn, updateProfileCOntroller)






export default router;
