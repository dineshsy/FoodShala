import {
    userSigninError,
    userSigninPending,
    userSigninSuccess
} from "../../store/action";

import axios from "axios";

function userSignin(data) {
    
    return (dispatch) => {
        dispatch(userSigninPending());
        axios
            .post("http://localhost:4000/users/authenticate", data)
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
