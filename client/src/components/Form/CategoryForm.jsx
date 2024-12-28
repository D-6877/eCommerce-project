import React, { useState } from 'react'

function CategoryForm({ handleSubmit, value, setValue }) {

    // const [value, setValue] = useState();

    return (
        <>
            <form onSubmit={handleSubmit} className='w-75'>
                <div className="mb-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder='Enter new category '
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm