import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Products() {

    const [product, setProduct] = useState([]);

    const getAllProducts = async () => {
        try {

            const { data } = await axios.get('/api/v1/product/get-product');
            setProduct(data.products);



        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");

        }
    }


    useEffect(() => {
        getAllProducts();
    }, [])

    // console.log(product);


    return (
        <Layout title={'user - eCommerce App'}>
            <div className="row container-fluid m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9 ">
                    <h1>All Products</h1>


                    <div className="d-flex flex-wrap gap-3">
                        {
                            product.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                                    <div className="card" style={{ width: '18rem' }} >

                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description} </p>

                                        </div>


                                    </div>
                                </Link>



                            ))
                        }

                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Products