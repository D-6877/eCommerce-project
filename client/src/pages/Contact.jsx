import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Layout from "../components/layout/Layout";

const Contact = () => {
    return (
        <Layout title='contact us - Ecommerce app'>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="row w-75">
                    <div className="col-md-6">
                        <img
                            src="/images/contactus.jpeg"
                            alt="contactus"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                        <p className="text-justify mt-2">
                            Any query and info about products? Feel free to call anytime—we are
                            available 24/7.
                        </p>
                        <p className="mt-3">
                            <BiMailSend /> : www.help@ecommerceapp.com
                        </p>
                        <p className="mt-3">
                            <BiPhoneCall /> : 012-3456789
                        </p>
                        <p className="mt-3">
                            <BiSupport /> : 1800-0000-0000 (toll-free)
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
