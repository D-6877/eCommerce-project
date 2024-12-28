
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../Context/Auth'
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import Spinner from '../Spinner'


function AdminRoute() {

    const [ok, setOk] = useState(false);

    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            const response = await axios.get('/api/v1/auth/admin-auth'
            );


            if (response.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }

        if (auth?.token) authCheck()

    }, [auth?.token])


    return ok ? <Outlet /> : <Spinner path='' />;
}

export default AdminRoute;