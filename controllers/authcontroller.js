import { comparePassword, hashpassword } from '../helper/auth.helper.js';
import user from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const registerController = async (req, res) => {
    try {

        const { name, email, password, phone, address, answer } = req.body;
        //validation
        if (!name) {
            return res.status(500).json({ msg: "Username not found!" });
        }
        if (!email) {
            return res.status(500).json({ msg: "Email not found!" });
        }
        if (!password) {
            return res.status(500).json({ msg: "Password not found!" });
        }
        if (!phone) {
            return res.status(500).json({ msg: "Phone not found!" });
        }
        if (!address) {
            return res.status(500).json({ msg: "Address not found!" });
        }
        if (!answer) {
            return res.status(500).json({ msg: "Answer not found!" });
        }


        //check user
        const existingUser = await user.findOne({ email: email })
        //existing user
        if (existingUser) {
            return res.status(200).json({ msg: "Already register please login" })
        }



        //register
        const hashedpassword = await hashpassword(password);


        //save
        const User = await new user({ name: name, email: email, password: hashedpassword, phone: phone, address: address, answer: answer }).save()

        res.status(200).json({ success: true, msg: "User register successfully", User });



    } catch (error) {
        console.log("error from auth controller: ", error);
        res.status(500).json({ msg: "Error from registration!", error })

    }

}


export const logincontroller = async (req, res) => {
    try {

        const { email, password } = req.body;

        //validate
        if (!email || !password) {
            return res.status(500).json({ "msg": "invalid email or password!" });
        }
        const User = await user.findOne({ email });

        //validate user
        if (!user) {
            return res.status(400).json({ msg: "user not found!" });
        }

        const match = await comparePassword(password, User.password);

        if (!match) {
            return res.status(200).json({ "msg": "Invalid Password" });
        }

        //token
        const token = await jwt.sign(
            { _id: User._id },

            process.env.JWT_SECRET_KEY,

            { expiresIn: "7d" }
        )


        res.status(200).json({
            "success": true,
            "msg": "Login successfully",
            user: {
                name: User.name,
                email: User.email,
                phone: User.phone,
                address: User.address,
                role: User.role
            },
            token

        })


    } catch (error) {
        console.log("login error", error);
        res.status(500).json({ msg: "Error from login!", error })

    }
}

//forgot password
export const forgotpasswordcontroller = async (req, res) => {
    try {

        const { email, answer, newPassword } = req.body;

        if (!email) {
            return res.status(400).send({ msg: "email is require" });

        }
        if (!answer) {
            return res.status(400).send({ msg: "answer is require" });

        }
        if (!newPassword) {
            return res.status(400).send({ msg: "new password is require" });

        }

        //check
        // const User = await user.findOne({ email, answer });
        const userData = await user.findOne({ email, answer });
        //validation
        if (!userData) {
            return res.status(404).send({
                success: false,
                messgae: "wrong email or answer"
            })
        }

        // const hashPassword = hashpassword(newPassword);
        // await user.findByIdAndUpdate(userData._id, { password: hashPassword });


        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Adjust salt rounds as needed

        // Update the user's password
        userData.password = hashedPassword;
        await userData.save();


        res.status(200).send({
            success: true,
            messgae: "password change successfully!"
        })



    } catch (error) {
        console.log("error from:", error);
        res.status(400).send({
            success: false,
            messgae: "something went wrong!",
            error
        })

    }
}






//test controller
export const testController = (req, res) => {
    res.status(200).json({ msg: "protected route!" });

}





//update profile controller
export const updateProfileCOntroller = async (req, res) => {
    try {

        const { name, email, password, address, phone } = req.body;
        const User = await user.findById(req.user._id);


        //password
        if (password && password.length < 6) {
            return res.json({
                error: "password is required and 6 character long"
            })
        }

        const hashPassword = password ? await hashpassword(password) : undefined

        const updateUser = await user.findByIdAndUpdate(req.user._id, {
            name: name || User.name,
            password: hashPassword || User.password,
            address: address || User.address,
            phone: phone || User.phone
        }, { new: true })

        res.status(200).send({
            success: true,
            messgae: "Update user profile successfully",
            updateUser
        })


    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            messgae: "Error from update profile ",
            error
        })

    }
}