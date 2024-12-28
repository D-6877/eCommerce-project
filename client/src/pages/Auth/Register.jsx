import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyle.css'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');


    const naviage = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('/api/v1/auth/register', {
                name, email, password, phone, address, answer
            })

            if (res && res.data.success) {
                toast.success(res.data.msg);
                naviage('/login');
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
                    <h3>Register Page</h3>
                    <form>
                        <div className="mb-3">

                            <input
                                type="text"
                                value={name}
                                className="form-control"
                                id="exampleInputName"
                                placeholder='Enter your name'
                                onChange={(e) => { setName(e.target.value) }}
                                required
                            />

                        </div>
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

                            <input
                                type="text"
                                value={phone}
                                className="form-control"
                                id="exampleInputPhone"
                                placeholder='Enter your phone'
                                onChange={(e) => { setPhone(e.target.value) }}
                                required
                            />

                        </div>
                        <div className="mb-3">

                            <input
                                type="text"
                                value={address}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder='Enter your address'
                                onChange={(e) => { setAddress(e.target.value) }}
                                required
                            />

                        </div>
                        <div className="mb-3">

                            <input
                                type="text"
                                value={answer}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder='what is your favorite sports'
                                onChange={(e) => { setAnswer(e.target.value) }}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}

                        >Submit</button>


                    </form>


                </div>


            </Layout>



        </>
    )
}

export default Register