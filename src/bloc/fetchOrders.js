import {
    fetchOrdersError,
    fetchOrdersPending,
    fetchOrdersSuccess
} from "../store/action";

import axios from "axios";

function fetchOrders(user) {
    return (dispatch) => {
        var token = user.token;
        token = token.toString('base64');
        
        dispatch(fetchOrdersPending());
        axios
            .get(
                `https://foodshala-db.herokuapp.com/order/${user._id}/${user.accountType}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => res.data)
            .then((products) => {
                dispatch(fetchOrdersSuccess(products));
                return products;
            })
            .catch((error) => {
                dispatch(fetchOrdersError(error));
            });
    };
}

export default fetchOrders;
