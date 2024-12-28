import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/AuthStyle.css'
import { useAuth } from '../../Context/Auth';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [auth, setAuth] = useAuth();



    const naviage = useNavigate();
    const location = useLocation();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('/api/v1/auth/login', {
                email, password
            })

            if (res && res.data.success) {
                toast.success(res.data.msg);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                naviage(location.state || '/');

            } else {
                toast.error(res.data.msg);
            }

        } catch (error) {
            console.log("Register Error:", error);
            toast.error("Something went wrong!");
        }


    }




    return (
        <>
            <Layout title={'register-Ecommerce app'} >

                <div className='form-container'>
                    <h3>Login Page</h3>
                    <form>

                        <div className="mb-3">

                            <input
                                type="email"
                                value={email}
                                className="form-control"
                                id="exampleInputEmail"
                                placeholder='Enter your email'
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />

                        </div>
                        <div className="mb-3">

                            <input
                                type="password"
                                value={password}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder='Enter your password'
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => { naviage('/forgot-password') }}
                            >
                                Forgot Password
                            </button>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}

                        >Login</button>


                    </form>


                </div>


            </Layout>



        </>
    )
}

export default Login