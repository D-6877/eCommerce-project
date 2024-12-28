import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
    return (
        <Layout title={'About us-Ecommers app'}>
            <div className="about-container d-flex flex-column align-items-center">
                <div className="row w-75 my-5 shadow-lg p-3 bg-light rounded">
                    <div className="col-md-6">
                        <img
                            src="/images/about.jpeg"
                            alt="about us"
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h2 className="text-center text-primary mb-3">About Us</h2>
                        <p className="text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                            perferendis eius temporibus dicta blanditiis doloremque explicabo
                            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                            commodi illum quidem neque tempora nam.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
