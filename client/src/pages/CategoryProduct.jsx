import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



function CategoryProduct() {

  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const getProductByCat = async () => {
    try {

      const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)

      setProducts(data?.products);
      setCategory(data?.category);

      // console.log(data?.products);



    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getProductByCat();
  }, [params?.slug])

  return (
    <Layout>
      <div className="container mt-3">

        <h1 className='text-center'>Category - {category?.name}</h1>
        <h1 className='text-center'> {products?.length} results found </h1>
        <div className="row">
          <div className="col-md-9">


            <div className="d-flex flex-wrap">

              <div className="d-flex flex-wrap gap-3">
                {
                  products.map((p) => (

                    <div className="card" style={{ width: '18rem' }} >

                      <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 15)}... </p>
                        <p className="card-text">${p.price} </p>
                        <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                        <button class=" btn btn-secondary ms-1">ADD TO CART</button>

                      </div>


                    </div>



                  ))
                }

              </div>
            </div>

            {/* <div className='m-2 p-3'>
              {
                products && products.length < total && (
                  <button className=' btn btn-warning' onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }} >{loading ? "loading ..." : "Loadmore"}</button>
                )
              }

            </div> */}

          </div>
        </div>

      </div>
    </Layout>
  )
}

export default CategoryProduct