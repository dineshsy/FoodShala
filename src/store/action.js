
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const USER_SIGNIN_PENDING = "USER_SIGNIN_PENDING";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_ERROR = "USER_SIGNIN_ERROR";

export const CLIENT_SIGNUP_PENDING = "CLIENT_SIGNUP_PENDING";
export const CLIENT_SIGNUP_SUCCESS = "CLIENT_SIGNUP_SUCCESS";
export const CLIENT_SIGNUP_ERROR = "CLIENT_SIGNUP_ERROR";

export const CUSTOMER_SIGNUP_PENDING = "CUSTOMER_SIGNUP_PENDING";
export const CUSTOMER_SIGNUP_SUCCESS = "CUSTOMER_SIGNUP_SUCCESS";
export const CUSTOMER_SIGNUP_ERROR = "CUSTOMER_SIGNUP_ERROR";


export function fetchProductsPending() {
    return {
        type: FETCH_PRODUCTS_PENDING
    }
}

export function fetchProductsSuccess(products) {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}

export function fetchProductsError(error) {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error: error
    }
}

export const userSigninError = (error) => {
    return {
        type: USER_SIGNIN_ERROR,
        error
    }
};

export const userSigninSuccess = (user) => {
    return {
        type: USER_SIGNIN_SUCCESS,
        user 
    }
};

export const userSigninPending = () => {
    return {
        type: USER_SIGNIN_PENDING,
    }
};

export const clientSignUpError = (error) => {
    return {
        type: CLIENT_SIGNUP_ERROR,
        error
    }
};

export const clientSignUpSuccess = () => {
    return {
        type: CLIENT_SIGNUP_SUCCESS,
    }
};

export const clientSignUpPending = () => {
    return {
        type: CLIENT_SIGNUP_PENDING,
    }
};

export const customerSignUpError = (error) => {
    return {
        type: CUSTOMER_SIGNUP_ERROR,
        error
    }
};

export const customerSignUpSuccess = () => {
    return {
        type: CUSTOMER_SIGNUP_SUCCESS,
    }
};

export const customerSignUpPending = () => {
    return {
        type: CUSTOMER_SIGNUP_PENDING,
    }
};


