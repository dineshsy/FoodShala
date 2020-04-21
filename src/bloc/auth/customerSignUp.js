import {
    customerSignUpError,
    customerSignUpPending,
    customerSignUpSuccess
} from "../../store/action";

import axios from "axios";

function clientSignUp(data) {
    return (dispatch) => {
        dispatch(customerSignUpPending());
        axios
            .post(
                "https://murmuring-ridge-20737.herokuapp.com/clients/register",
                data
            )
            .then((res) => res.data)
            .then(() => {
                dispatch(customerSignUpSuccess());
            })
            .catch((error) => {
                dispatch(customerSignUpError(error.message));
            });
    };
}

export default clientSignUp;
