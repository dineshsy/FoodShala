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
            .post("http://localhost:4000/clients/register", data)
            .then((res) => res.data)
            .then(() => {
                dispatch(customerSignUpSuccess());
            })
            .catch((error) => {
                console.log(error);

                console.log(error.message);

                dispatch(customerSignUpError(error.message));
            });
    };
}

export default clientSignUp;
