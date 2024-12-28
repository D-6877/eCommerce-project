import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

function PageNotfound() {
    return (
        <Layout title='Page not Found - Ecommerce app'>
            <div className='pnf'>
                <h1 className='pnf-title'>404</h1>
                <h4 className='pnf-heading' >Opps! Page Not Found</h4>
                <Link to='/' className='pnf-btn'>
                    Go Back

                </Link>
            </div>
        </Layout>
    )
}

export default PageNotfound