import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cart';



function HomePage() {


    const [AllProduct, setAllProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [cart, setCart] = useCart();

    const navigate = useNavigate();


    // get total count
    const getTotal = async () => {
        try {

            const { data } = await axios.get('/api/v1/product/product-count')
            setTotal(data?.total)

        } catch (error) {
            console.log(error);

        }
    }


    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`api/v1/product/product-list/${page}`)
            setLoading(false);
            setAllProduct([...AllProduct, ...data.products])

        } catch (error) {

            console.log(error);
            setLoading(false);

        }
    }

    const getAllProduct = async () => {
        try {

            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setAllProduct(data.products);

        } catch (error) {
            setLoading(true);
            console.log(error);
            setLoading(false);
        }
    }


    useEffect(() => {
        getAllProduct();
        getTotal();

    }, [])

    useEffect(() => {
        if (page === 1) return;

        loadMore();
    }, [page])






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




    //filter by categories
    const handleFilter = async (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c != id)
        }
        setChecked(all);
    }


    useEffect(() => {
        if (!checked.length || !radio.length) getAllCategory();
    }, [checked.length, radio.length]);


    useEffect(() => {
        if (checked.length || radio.length) filterProduct()
    }, [checked, radio]);


    //get filters product
    const filterProduct = async () => {
        try {

            const { data } = await axios.post(`/api/v1/product/product-filter`, { checked, radio })
            setAllProduct(data?.products)

        } catch (error) {
            console.log(error);

        }
    }



    return (
        <Layout title='All Product - Best Offer'>

            <div className="row mt-3">
                <div className="col-md-3">
                    <h6 className='text-center'>Filter By Category</h6>

                    <div className='d-flex flex-column px-2'>
                        {
                            categories.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))
                        }

                    </div>

                    {/* {price filter} */}
                    <h6 className='text-center mt-4'>Filter By Price</h6>

                    <div className='d-flex flex-column px-2'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {
                                Prices.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>

                                    </div>


                                ))
                            }

                        </Radio.Group>

                    </div>
                    <div className='d-flex flex-column px-2'>
                        <button className='btn  btn-danger ' onClick={() => window.location.reload()} > Reset Filters</button>

                    </div>

                </div>
                <div className="col-md-9">

                    <h1 className='text-center'>All Products</h1>
                    <div className="d-flex flex-wrap">

                        <div className="d-flex flex-wrap gap-3">
                            {
                                AllProduct.map((p) => (

                                    <div className="card" style={{ width: '18rem' }} >

                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 15)}... </p>
                                            <p className="card-text">${p.price} </p>
                                            <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                            <button class=" btn btn-secondary ms-1" onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                toast.success("Item added");

                                            }} >ADD TO CART</button>

                                        </div>


                                    </div>



                                ))
                            }

                        </div>
                    </div>

                    <div className='m-2 p-3'>
                        {
                            AllProduct && AllProduct.length < total && (
                                <button className=' btn btn-warning' onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }} >{loading ? "loading ..." : "Loadmore"}</button>
                            )
                        }

                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default HomePage