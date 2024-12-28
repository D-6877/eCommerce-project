import bcrypt from 'bcrypt'


//hash password
export const hashpassword = async (password) => {
    try {
        const salt = 10;
        const hashpassword = await bcrypt.hash(password, salt);
        return hashpassword;


    } catch (error) {
        console.log("error from  password!", error);
    }
}



//compare password
export const comparePassword = async (password, hashpassword) => {
    try {

        return bcrypt.compare(password, hashpassword);
    } catch (error) {
        console.log("error from compare password!");

    }

}