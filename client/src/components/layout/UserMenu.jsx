import React from 'react'
import { NavLink } from 'react-router-dom'
NavLink
function AdminMenu() {
    return (
        <><div className="list-group">
            <div className='text-center'>
                <h4>
                    User Pannel
                </h4>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile </NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>


            </div>

        </div>


        </>
    )
}

export default AdminMenu