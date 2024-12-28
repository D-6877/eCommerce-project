import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../Hooks/useCategory'
import { Link } from 'react-router-dom';

function Categories() {

    const categories = useCategory();

    // console.log(categories);


    return (
        <Layout title={'All Categories'}>
            <div className="container">
                <div className="row">
                    {
                        categories.map((c) => (
                            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key='_id'>
                                <Link to={`/category/${c.slug}`} className='btn btn-primary' > {c.name} </Link>
                            </div>

                        ))
                    }

                </div>
            </div>

        </Layout>
    )
}

export default Categories