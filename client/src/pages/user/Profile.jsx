import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../../Context/Auth';



function Profile() {

    //context
    const [auth, setAuth] = useAuth('');


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');


    //get user Data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhone(phone);
    }, [auth?.user])


    //from function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.put('/api/v1/auth/profile', {
                name, email, password, phone, address
            })

            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updateUser })
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls)
                ls.user = data.updateUser,
                    localStorage.setItem('auth', JSON.stringify(ls))
                toast.success("profile updated successfully");
            }

        } catch (error) {
            console.log("Register Error:", error);
            toast.error("Something went wrong!");
        }


    }


    return (
        <Layout title={'Profile- eCommerce App'}>
            <div className="container-fluid m-3 p-3 row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <div className='form-container'>

                        <form>
                            <div className="mb-3">
                                <h3 className='text-center' >UPDATE PROFILE</h3>
                                <input
                                    type="text"
                                    value={name}
                                    className="form-control"
                                    id="exampleInputName"
                                    placeholder='Enter your name'
                                    onChange={(e) => { setName(e.target.value) }}

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

                                    disabled
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

                                />

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}

                            >UPDATE</button>


                        </form>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile