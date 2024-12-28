import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'


function Order() {
    return (
        <Layout title={'orders- eCommerce App'}>
            <div className="container-fluid m-3 p-3 row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>All Orders</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Order