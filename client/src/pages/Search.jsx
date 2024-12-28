

import Layout from '../components/layout/Layout'
import { useSearch } from '../Context/Search'


function Search() {
    const [value, setValue] = useSearch();
    return (
        <Layout title='Ecommerce app'>
            <div className='container'>
                <div className="text-center">
                    <h1>Search Result</h1>
                    <h6>{value?.results.length < 1 ? 'No Products Found' : `Fount ${value?.results.length}`}</h6>

                    <div className="d-flex flex-wrap">

                        <div className="d-flex flex-wrap gap-3 mt-4">
                            {
                                value.results?.map((p) => (

                                    <div className="card" style={{ width: '18rem' }} >

                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 15)}... </p>
                                            <p className="card-text">${p.price} </p>
                                            <button class="btn btn-primary ms-1">More Details</button>
                                            <button class=" btn btn-secondary ms-1">ADD TO CART</button>

                                        </div>


                                    </div>



                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Search