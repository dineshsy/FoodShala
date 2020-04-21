import {
    clientSignUpError,
    clientSignUpPending,
    clientSignUpSuccess,
} from "../../store/action";

import axios from "axios";

function clientSignUp(data) {
    return (dispatch) => {
        dispatch(clientSignUpPending());
        axios
            .post(
                "https://murmuring-ridge-20737.herokuapp.com/users/register",
                data
            )
            .then((res) => res.data)
            .then(() => {
                dispatch(clientSignUpSuccess());
            })
            .catch((error) => {
                dispatch(clientSignUpError(error.message));
            });
    };
}

export default clientSignUp;
