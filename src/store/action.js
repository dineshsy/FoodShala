
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const USER_SIGNIN_PENDING = "USER_SIGNIN_PENDING";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_ERROR = "USER_SIGNIN_ERROR";

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


