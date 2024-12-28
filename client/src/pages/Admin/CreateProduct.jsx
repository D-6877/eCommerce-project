import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast, { useToaster } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

const { Option } = Select


function CreateProduct() {

    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [catagory, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');


    const nevigate = useNavigate();

    // Get all categories
    const getAllCategory = async () => {
        try {
            const response = await axios.get('/api/v1/catagory/get-catagory');

            const data = response.data;
            // console.log(data.getAllcatagory);

            setCategories(data.getAllcatagory)



        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category!');
        }
    };


    useEffect(() => {
        getAllCategory();

    }, []);


    //handel create product
    const handleCreate = async (e) => {
        e.preventDefault();
        try {

            const productData = new FormData();  // browser default form handle feature
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("catagory", catagory);
            productData.append("shipping", shipping);



            const { data } = await axios.post("/api/v1/product/create-product", productData)

            if (data?.success) {
                toast.success("Product created SuccessFully");
                nevigate('/dashboard/admin/products')

            } else {
                toast.error(data.message);
            }



        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");

        }

    }


    // console.log(catagory);




    return (
        <Layout title={'create-products - eCommerce App'}>
            <div className="row container-fluid m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Create Products</h1>
                    <div className="m-1 w-75">
                        <Select bordered={false} placeholder="Select a catagory" size="large" showSearch className='form-select mb-3 '
                            onChange={(value) => { setCategory(value) }}
                        >

                            {
                                categories?.map((c) => (
                                    <Option key={c._id} value={c._id} > {c.name} </Option>
                                ))
                            }

                        </Select>

                        <div className="mb-3">
                            <label className='btn btn-outline-secondary col-md-12'>
                                {photo ? photo.name : "Upload Photo"}
                                <input type="file" name="photo" accept='image/*' hidden onChange={(e) => setPhoto(e.target.files[0])} />
                            </label>
                        </div>

                        <div className="md-3">
                            {photo && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="Product_Photo" height={'200px'} className=' img img-responsive' />
                                </div>
                            )}
                        </div>

                        <div className="mb-3 ">
                            <input
                                type="text"
                                value={name}
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
                                type="text"
                                value={catagory}
                                placeholder='Product Category'
                                onChange={(e) => setCategory(e.target.value)}
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
                                value={shipping}
                                showSearch
                                className="form-select mb-3"
                                onChange={(e) => setShipping(e.target.value)}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct