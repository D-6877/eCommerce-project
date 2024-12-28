import React from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../Context/Cart'
import { useAuth } from '../Context/Auth';
import { useNavigate } from 'react-router-dom';

function CartPage() {

    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();



    //total  price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total = total + item.price });
            return total.toLocaleString("en-US", {
                style: 'currency',
                currency: 'USD'
            });

        } catch (error) {
            console.log(error);

        }
    }


    //delete item
    const removeCartItem = async (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-1' >
                            {
                                `Hello ${auth?.token && auth?.user?.name} `
                            }
                        </h1>

                        <h4 className='text-center'>
                            {
                                cart?.length ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "Your cart is empty"
                            }
                        </h4>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-8">
                        {
                            cart?.map(p => (
                                <div className="row m-2 card flex-row p-2">
                                    <div className="col-md-4">
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}
                                            width={'100px'}
                                            height={'250px'}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <p>{p.name}</p>
                                        <p>{p.description} </p>
                                        <p>Price: {p.price} </p>

                                        <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-3 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | checkout | Payment</p>
                        <hr />
                        <h4>
                            Total: {totalPrice()}
                        </h4>
                        <div>
                            {auth?.user?.address ? (
                                <>
                                    <div className='vmb-3'>
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")} >Update Address</button>

                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')} > Update Address </button>
                                    ) : (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/login ', {
                                            state: '/cart',
                                        })}> PLease Login to checkout</button>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>


                </div>
            </div>
        </Layout>
    )
}

export default CartPage