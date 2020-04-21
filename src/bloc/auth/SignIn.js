import {
    userSigninError,
    userSigninPending,
    userSigninSuccess,
} from "../../store/action";

import axios from "axios";

function userSignin(data, accountType) {
    var URL = "https://murmuring-ridge-20737.herokuapp.com/users/authenticate";
    if (accountType === "Restaurant") {
        URL = "http://localhost:4000/clients/authenticate";
    }
    return (dispatch) => {
        dispatch(userSigninPending());
        axios
            .post(URL, data)
            .then((res) => res.data)
            .then((user) => {
                dispatch(userSigninSuccess(user));

                return user;
            })
            .catch((error) => {
                dispatch(userSigninError(error.message));
            });
    };
}

export default userSignin;
