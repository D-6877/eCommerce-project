import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast, { useToaster } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select


function UpdateProduct() {

    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const [Name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [id, setId] = useState('');


    const navigate = useNavigate();
    const params = useParams();

    //get single product
    const getSingleProduct = async () => {
        try {

            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);

            // console.log(data.product);
            // console.log(data.product.name);



            // console.log(data.product.catagory._id);


            setName(data.product.name);
            setDescription(data.product.description);
            setId(data.product._id);
            setPrice(data.product.price);
            setCategory(data.product.catagory._id); // Ensure this is set correct
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);

        } catch (error) {
            console.log(error);

        }
    }





    // Get all categories
    const getAllCategory = async () => {
        try {
            const response = await axios.get('/api/v1/catagory/get-catagory');

            const data = response.data;
            // console.log(data.getAllcatagory);   //get all categories

            setCategories(data.getAllcatagory)



        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category!');
        }
    };

    useEffect(() => {
        getAllCategory();
        getSingleProduct();


    }, []);




    //handel update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", Name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("catagory ", category); // Spelling kept consistent
            productData.append("shipping", shipping);

            const { data } = await axios.put(
                `/api/v1/product/update-product/${id}`,
                productData
            );

            if (data?.success) {
                toast.success("Product updated successfully.");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error.response ? error.response.data : error);
            toast.error("Failed to update product.");
        }
    };



    //delete product
    const handleDelete = async () => {
        try {
            let ans = window.prompt("Are you sure want to delete this product?");
            if (!ans) {
                return
            }
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
            toast.success("Product Deleted Successfully!");
            navigate('/admin/dashboard/product');

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }

    }





    return (
        <Layout title={'create-products - eCommerce App'}>
            <div className="row container-fluid m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Update Products</h1>
                    <div className="m-1 w-75">

                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            value={category}  // This should be the category ID
                            onChange={(value) => setCategory(value)} // Update state with selected category ID


                        >
                            {categories.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <div className="mb-3">
                            <label className='btn btn-outline-secondary col-md-12'>
                                {photo ? photo.name : "Upload Photo"}
                                <input type="file" name="photo" accept='image/*' hidden onChange={(e) => setPhoto(e.target.files[0])} />
                            </label>
                        </div>

                        <div className="md-3">
                            {photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="Product_Photo" height={'200px'} className=' img img-responsive' />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img src={`/api/v1/product/product-photo/${id}`} alt="Product_Photo" height={'200px'} className=' img img-responsive' />
                                </div>
                            )}
                        </div>

                        <div className="mb-3 ">
                            <input
                                type="text"
                                value={Name}
                                placeholder='Enter Product Name'
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"

                            />
                        </div>
                        <div className="mb-3 ">
                            <textarea name="" id=""
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Write something about this product'
                                className="form-control"
                            >

                            </textarea>

                        </div>

                        <div className="mb-3 ">
                            <input
                                type="text"
                                value={price}
                                placeholder='Product Price'
                                onChange={(e) => setPrice(e.target.value)}
                                className="form-control"
                            />
                        </div>





                        <div className="mb-3 ">
                            <input
                                type="Number"
                                value={quantity}
                                placeholder='Set quantity'
                                onChange={(e) => setQuantity(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3 ">


                            <select bordered={false}
                                placeholder="Select Shipping "
                                size="large"

                                showSearch
                                className="form-select mb-3"
                                value={shipping}
                                onChange={(e) => setShipping(e.target.value)}

                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                        </div>


                        <div className="mb-3">
                            <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct