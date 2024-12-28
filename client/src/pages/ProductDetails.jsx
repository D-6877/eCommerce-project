import React, { useEffect, useState } from 'react'
import Layout from "./../components/Layout/Layout";
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ProductDetails() {

    const [product, setProduct] = useState({});
    const params = useParams();
    const [relatedProduct, setRelatedProduct] = useState([])

    //initial Time get
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params.slug])


    //getProduct
    const getProduct = async () => {
        try {

            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.catagory._id)


        } catch (error) {
            console.log(error);

        }
    }

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);

            setRelatedProduct(data?.products);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6 ">
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top w-75 " alt={product.name} height={'300'} />
                </div>
                <div className="col-md-6 ">
                    <h1 className='text-center'  >Product Details</h1>
                    <h6>Name: {product.name} </h6>
                    <h6>Description: {product.description} </h6>
                    <h6>Price: {product.price} </h6>
                    {/* <h6>Category: {product.catagory.name} </h6> */}
                    <button class=" btn btn-secondary ms-1">ADD TO CART</button>

                </div>
            </div>
            <hr />
            <div className="row container">
                <h1>Similar Products</h1>

                <div className='text-center'>
                    {relatedProduct.length < 1 && <p> No Similar Products</p>}
                </div>



                <div className="d-flex flex-wrap gap-3">
                    {
                        relatedProduct.map((p) => (

                            <div className="card" style={{ width: '18rem' }} >

                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 15)}... </p>
                                    <p className="card-text">${p.price} </p>

                                    <button class=" btn btn-secondary ms-1">ADD TO CART</button>

                                </div>


                            </div>



                        ))
                    }

                </div>

            </div>

        </Layout>
    )
}

export default ProductDetails