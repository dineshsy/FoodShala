import { addMenuError, addMenuPending, addMenuSuccess } from "../store/action";

import axios from "axios";

function addMenu(data, user) {
    return (dispatch) => {
        var token = user.token;

        dispatch(addMenuPending());
        axios
            .post(`https://foodshala-db.herokuapp.com/menu/addMenu`, data, {
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
                dispatch(addMenuError(error));
            });
    };
}

export default addMenu;
