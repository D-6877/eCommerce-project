import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaBagShopping } from "react-icons/fa6";
import { useAuth } from '../../Context/Auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../Hooks/useCategory';
import { useCart } from '../../Context/Cart';
import { Badge } from 'antd';

function Header() {


    const [cart] = useCart();
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        toast.success("Logout successfull!");
        localStorage.removeItem('auth');

    }


    // console.log(categories);



    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to='/'><FaBagShopping />  Ecommers App</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/" >Home </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to='/categories' href="#" data-bs-toggle="dropdown" >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">

                                    <li>
                                        <Link className="dropdown-item" href="#" to={`/categories`} >All Categories </Link>
                                    </li>

                                    {
                                        categories.map((c) => (
                                            <li>

                                                <Link className="dropdown-item" href="#" to={`/category/${c.slug}`} > {c.name} </Link>

                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>




                            {
                                !auth.user ? (
                                    <>



                                        <li className="nav-item">
                                            <NavLink className="nav-link " to="/register" >Register </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link " to="/login" >Login </NavLink>
                                        </li>
                                    </>

                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" href="#">Dashboard</Link>
                                                </li>
                                                <li >
                                                    <NavLink className="dropdown-item " onClick={handleLogout} to="/login" >Logout </NavLink>
                                                </li>
                                            </ul>
                                        </li>



                                    </>
                                )
                            }
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                    <NavLink className="nav-link" to="/cart" >Cart </NavLink>
                                </Badge>


                            </li>

                        </ul>
                    </div>
                </div>

            </nav >

        </>
    )
}

export default Header