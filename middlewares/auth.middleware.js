import jwt from 'jsonwebtoken'
import user from '../models/user.model.js'
//protected route token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();

    } catch (error) {
        console.log("auth middleware error:", error);
    }

}


//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const User = await user.findById(req.user._id);


        if (User.role !== 1) {
            return res.status(401).send({
                success: "false",
                message: "Unauthorized Access"
            })
        } else {
            next();
        }


    } catch (error) {
        console.log("admin middleware error!", error);

    }
}