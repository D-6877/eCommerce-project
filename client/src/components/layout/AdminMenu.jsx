import React from 'react'
import { NavLink } from 'react-router-dom'
NavLink
function AdminMenu() {
    return (
        <><div className="list-group">
            <div className='text-center'>
                <h4>
                    Admin Pannel
                </h4>
                <NavLink to="/dashboard/admin/create-catagory" className="list-group-item list-group-item-action">Create Catagory</NavLink>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>


            </div>

        </div>


        </>
    )
}

export default AdminMenu