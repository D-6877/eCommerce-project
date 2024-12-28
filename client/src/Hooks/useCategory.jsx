import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //getCatagory
    const getCategory = async () => {
        try {

            const { data } = await axios.get('/api/v1/catagory/get-catagory')

            setCategories(data?.getAllcatagory)

        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getCategory();
    }, [])

    return categories;

}
