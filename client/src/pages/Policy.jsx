import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
    return (
        <Layout title='Privacy Policy - Ecommerce app'>
            <div className="policy-container d-flex flex-column align-items-center">
                <div className="row w-75 my-5 shadow-lg p-4 bg-light rounded">
                    <div className="col-md-6">
                        <img
                            src="/images/contactus.jpeg"
                            alt="Privacy Policy"
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h2 className="text-center text-success mb-4">Privacy Policy</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                            malesuada felis euismod urna convallis, sit amet luctus purus
                            tincidunt. Mauris vel justo sapien. Proin nec tempor elit.
                        </p>
                        <p>
                            Cras ac ex nec urna bibendum aliquet. Suspendisse eget eros ac
                            nulla interdum vulputate. Sed posuere tortor nec tincidunt
                            interdum.
                        </p>
                        <p>
                            Aliquam erat volutpat. Duis vel tincidunt ex. Integer congue, mi
                            nec interdum vestibulum, nisl nulla feugiat sapien, nec
                            sollicitudin risus nisl sit amet velit.
                        </p>
                        <p>
                            Mauris mollis erat ac enim scelerisque, at molestie nisl
                            facilisis. Donec vel nisi at nunc facilisis vehicula non vel
                            orci.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
