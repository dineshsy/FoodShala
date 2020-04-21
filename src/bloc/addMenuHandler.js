import { addMenuError, addMenuPending, addMenuSuccess } from "../store/action";

import axios from "axios";

function addMenu(data, user) {
    return (dispatch) => {
        var token = user.token;

        dispatch(addMenuPending());
        axios
            .post(`http://localhost:4000/menu/addMenu`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
            .then((products) => {
                dispatch(addMenuSuccess(products));
                return products;
            })
            .catch((error) => {
                console.log(error.message);
                dispatch(addMenuError(error));
            });
    };
}

export default addMenu;
