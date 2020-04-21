import {
    fetchProductsPending,
    fetchProductsSuccess,
    fetchProductsError,
} from "../store/action";

import axios from 'axios'

function fetchProducts(id) {
    return (dispatch) => {
        dispatch(fetchProductsPending());
        axios
            .get(`https://murmuring-ridge-20737.herokuapp.com/menu/${id}`)
            .then((res) => res.data)
            .then((products) => {
                dispatch(fetchProductsSuccess(products));
                return products;
            })
            .catch((error) => {
                dispatch(fetchProductsError(error));
            });
    };
}

export default fetchProducts;