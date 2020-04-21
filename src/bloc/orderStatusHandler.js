import {
    fetchOrdersError,
    fetchOrdersPending, 
    checkoutSuccess
} from "../store/action";


import axios from "axios";

function orderStatusHandler(data,id) {
    return (dispatch) => {
        dispatch(fetchOrdersPending());
        axios
            .put(
                `http://localhost:4000/order/${id}/`,data
            )
            .then((res) => res.data).then(data => {
                dispatch(checkoutSuccess())
            })
            .catch((error) => {
                dispatch(fetchOrdersError(error));
            });
    };
}

export default orderStatusHandler;
