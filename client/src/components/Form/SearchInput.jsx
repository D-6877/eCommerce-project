import React from 'react';
import { useSearch } from '../../Context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
    const [value, setValue] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/v1/product/search/${value.keyword}`);
            setValue({ ...value, results: data });
            navigate('/search');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={value.keyword}
                    onChange={(e) => setValue({ ...value, keyword: e.target.value })}
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchInput;
