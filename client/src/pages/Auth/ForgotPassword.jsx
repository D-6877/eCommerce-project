import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyle.css'



function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');


    const naviage = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('/api/v1/auth/forgot-password', {
                email: email,
                answer: answer,
                newPassword: newpassword
            })



            if (res && res.data.success) {
                toast.success(res.data.messgae);
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
        <Layout title={'forgot password - Ecommerce App'}>
            <div className='form-container'>
                <h3>Rest  Password</h3>
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
                            type="text"
                            value={answer}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter your favorit sports'
                            onChange={(e) => { setAnswer(e.target.value) }}
                            required
                        />
                    </div>

                    <div className="mb-3">

                        <input
                            type="password"
                            value={newpassword}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter your new password'
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            required
                        />

                    </div>




                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}

                    >Rest</button>


                </form>


            </div>

        </Layout>
    )
}

export default ForgotPassword