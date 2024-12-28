import slugify from 'slugify';
import catagoryModel from '../models/catagory.model.js'




export const catagoryController = async (req, res) => {
    try {

        const { name } = req.body;
        if (!name) {
            return res.status(404).send({
                message: "Name Is Require"
            })
        }
        const existingCatagory = await catagoryModel.findOne({ name });

        if (existingCatagory) {
            return res.status(200).send({
                success: true,
                message: 'catagory already exists!'
            })
        }


        const catagory = await new catagoryModel({ name, slug: slugify(name) }).save();

        res.status(201).send({
            success: true,
            message: "new catagory created",
            catagory
        })





    } catch (error) {
        console.log("error from catagory controller", error);
        res.status(500).send({
            success: false,
            message: "Error in catagory",
            error,
        })
    }

}



//update catagory

export const updateCatagoryController = async (req, res) => {
    try {

        const { name } = req.body;
        const { id } = req.params;
        const catagory = await catagoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        if (!catagory) {
            return res.status(404).send({ success: false, message: "Category not found" });
        }

        res.status(200).send({
            success: true,
            message: "catagory updated successfully",
            catagory,

        })


    } catch (error) {
        console.log("Error from update caragory", error);
        res.status(500).send({
            success: false,
            message: "Error while update catagory controller!",
            error,
        })

    }
}


//getAll catagory
export const getCatagoryController = async (req, res) => {
    try {

        const getAllcatagory = await catagoryModel.find();

        res.status(200).send({
            success: true,
            message: "All catagory list",
            getAllcatagory
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error from get catagory controller",
            error,
        })

    }
}



//single catagory
export const singleCatagoryController = async (req, res) => {
    try {

        const catagory = await catagoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get single catagory successfully!",
            catagory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error from single catagory controller",
            error
        })

    }
}


// delete catagory
export const deleteCatagoryController = async (req, res) => {
    try {

        const { id } = req.params;
        await catagoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "catagory delete successfully!",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error from delete catagory controller",
            error
        })
    }
}

