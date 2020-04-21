import {
    fetchOrdersError,
    fetchOrdersPending,
    fetchOrdersSuccess
} from "../store/action";

import axios from "axios";

function fetchOrders(user) {
    return (dispatch) => {
        var token = user.token;

        dispatch(fetchOrdersPending());
        axios
            .get(`http://localhost:4000/order/${user._id}/${user.accountType}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
            .then((products) => {
                dispatch(fetchOrdersSuccess(products));
                return products;
            })
            .catch((error) => {
                console.log(error.message);
                dispatch(fetchOrdersError(error));
            });
    };
}

export default fetchOrders;
