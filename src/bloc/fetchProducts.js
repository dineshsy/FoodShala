import {
    fetchProductsPending,
    fetchProductsSuccess,
    fetchProductsError,
} from "../store/action";

import axios from 'axios'

function fetchProducts() {
    return (dispatch) => {
        dispatch(fetchProductsPending());
        axios.get("http://localhost:4000/menu/")
            .then((res) => res.data)
            .then((products) => {
                dispatch(fetchProductsSuccess(products));
                return products;
            })
            .catch((error) => {
                console.log(error.message);
                dispatch(fetchProductsError(error));
            });
    };
}

export default fetchProducts;