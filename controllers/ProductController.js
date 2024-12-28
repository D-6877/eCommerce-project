import slugify from 'slugify';
import productModel from '../models/productModels.js'
import categoryModel from '../models/catagory.model.js'
import fs from 'fs'




//create product controller
export const createProductController = async (req, res) => {
    try {

        const { name, slug, description, price, catagory, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: " Name is reqire!" })

            case !description:
                return res.status(500).send({ error: " Description is reqire!" })
            case !price:
                return res.status(500).send({ error: " Price is reqire!" })
            case !catagory:
                return res.status(500).send({ error: " Catagory is reqire!" })
            case !quantity:
                return res.status(500).send({ error: " Quantity is reqire!" })
            case !photo || photo.size > 1000000:
                return res.status(500).send({ error: "Photo is required and should be less than 1MB" });
        }



        const product = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {

            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(200).send({
            success: true,
            message: "Product create Successfully",
            product,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error is creating product'

        })

    }
}


//get product contoller

export const getProductController = async (req, res) => {
    try {

        const products = await productModel.find({})
            .populate('catagory')    // access all the details of catagory 
            .select("-photo")        //access the product without photo
            .limit(12)
            .sort({ createdAt: -1 });


        res.status(200).send({
            success: true,
            total_count: products.length,
            message: "All products",
            products,

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error from get product controller!",
        })

    }
}


//get single product on the basis of slug

export const getSingleProduct = async (req, res) => {
    try {


        const slug = req.params.slug;   // find on the basis of slug

        const product = await productModel.findOne({ slug })
            .select('-photo')   // without photo
            .populate('catagory')   //get details of the catagory 

        res.status(200).send({
            success: true,
            message: "single product",
            product

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error from  getSingleProductController"
        })

    }
}


//get photo controller
export const productPhotoController = async (req, res) => {
    try {

        const product = await productModel.findById(req.params.pid).select('photo')

        if (!product || !product.photo || !product.photo.data) {
            return res.status(404).send({
                success: false,
                message: "Photo not found"
            });
        }

        // Set the correct content type
        res.set('Content-Type', product.photo.contentType);

        // Send the image buffer
        return res.status(200).send(product.photo.data);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error from product controller",
            error,
        })


    }
}


//delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")   // delete the product 


        res.status(200).send({
            success: true,
            message: "product deleted successfully",

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error from delete product controller",
            error,
        })

    }
}


//update product controller
export const updateProductController = async (req, res) => {
    try {


        const { name, slug, description, price, catagory, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: " Name is reqire!" })

            case !description:
                return res.status(500).send({ error: " Description is reqire!" })
            case !price:
                return res.status(500).send({ error: " Price is reqire!" })
            // case !catagory:
            //     return res.status(500).send({ error: " Catagory is reqire!" })
            case !quantity:
                return res.status(500).send({ error: " Quantity is reqire!" })
            // case !photo || photo.size > 1000000:
            // return res.status(500).send({ error: "Photo is required and should be less than 1MB" });
        }



        const product = await productModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        },
            {
                new: true
            })
        if (photo) {

            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(200).send({
            success: true,
            message: "Product updated Successfully",
            product,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error from update product controller",
            error,
        })

    }
}



// product filter 
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.catagory = checked;
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        })




    } catch (error) {
        console.log("error from product filter: ", error);
        res.status(400).send({
            success: false,
            message: "While filtering  products",
            error
        })

    }
}

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,

        })

    } catch (error) {
        console.log("error from product count controller,", error);
        res.status(500).send({
            message: "Error in product count",
            error,
            success: false
        })

    }
}


//product per page show
export const productListController = async (req, res) => {
    try {

        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        })

    }
}


//search product
export const searchProductController = async (req, res) => {
    try {

        const { keyword } = req.params;
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        }).select('-photo')

        res.json(result)

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error from search product",
            error,
        })
    }
}


//related product controller

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            catagory: cid,
            _id: { $ne: pid }
        }).select('-photo').limit(3).populate('catagory')

        res.status(200).send({
            success: true,
            products
        })


    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting reted product",
            error
        })

    }
}


//product category controller

export const productCategoryController = async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate('category');
        res.status(200).send({
            success: true,
            category,
            products
        })


    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error while getting product"
        })
    }
}