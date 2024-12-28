import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast, { useToaster } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';


function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updated, setUpdated] = useState('');


    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post('/api/v1/catagory/create-catagory', { name });

            if (data?.success) {
                toast.success(data.message);
                setName('');
                getAllCategory();
            } else {
                toast.error('Something went wrong!')
            }

        } catch (error) {
            console.log(error);
            toast.error("something went from error form!");
        }

    }

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


    //Update Catagory
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.put(`/api/v1/catagory/update-catagory/${selected._id}`, { name: updated })
            if (data.success) {
                toast.success(data.message);
                setSelected(null);
                setUpdated('');
                setVisible(false);
                getAllCategory();
            }

        } catch (error) {
            toast.error("Something went wrong");
        }
    }




    //Delete Catagory
    const handleSubmitDelete = async (id) => {

        try {

            const { data } = await axios.delete(`/api/v1/catagory/delete-catagory/${id}`)
            if (data.success) {
                toast.success(` Delete successfully`);
                getAllCategory();
            }

        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout title="create-category - eCommerce App">
            <div className="container-fluid m-3 p-3 row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Manage Category</h1>

                    <div className='p-3'>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />


                    </div>


                    <div className='w-75'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {Array.isArray(categories) && categories.map((c) => (

                                    <>
                                        <tr>
                                            <td key={c._id}>{c.name}<br /></td>
                                            <td >
                                                <button
                                                    className='btn btn-primary ms-2'
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdated(c.name);
                                                        setSelected(c)
                                                    }}

                                                > Edit
                                                </button>
                                                <button
                                                    className='btn btn-danger ms-2'
                                                    onClick={() => handleSubmitDelete(c._id)}
                                                > Delete</button>
                                            </td>
                                        </tr >


                                    </>

                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                    <CategoryForm value={updated} setValue={setUpdated} handleSubmit={handleSubmitUpdate} />
                </Modal>
            </div>
        </Layout >
    );
}

export default CreateCategory;



//ant-design react UI library has used