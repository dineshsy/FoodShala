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
            .post("http://localhost:4000/users/register", data)
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
