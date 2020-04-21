// fetch menu
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
//user (or) restaurant signin
export const USER_SIGNIN_PENDING = "USER_SIGNIN_PENDING";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_ERROR = "USER_SIGNIN_ERROR";
// restaurant sign up
export const CLIENT_SIGNUP_PENDING = "CLIENT_SIGNUP_PENDING";
export const CLIENT_SIGNUP_SUCCESS = "CLIENT_SIGNUP_SUCCESS";
export const CLIENT_SIGNUP_ERROR = "CLIENT_SIGNUP_ERROR";
// user sign up
export const CUSTOMER_SIGNUP_PENDING = "CUSTOMER_SIGNUP_PENDING";
export const CUSTOMER_SIGNUP_SUCCESS = "CUSTOMER_SIGNUP_SUCCESS";
export const CUSTOMER_SIGNUP_ERROR = "CUSTOMER_SIGNUP_ERROR";
// fetch all restaurants
export const FETCH_CLIENT_PENDING = "FETCH_CLIENT_PENDING";
export const FETCH_CLIENT_SUCCESS = "FETCH_CLIENT_SUCCESS";
export const FETCH_CLIENT_ERROR = "FETCH_CLIENT_ERROR";
// fetch all restaurants
export const FETCH_ORDERS_PENDING = "FETCH_ORDERS_PENDING";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_ERROR = "FETCH_ORDERS_ERROR";
//checkout process
export const CHECKOUT_PENDING = "CHECKOUT_PENDING";
export const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";
export const CHECKOUT_ERROR = "CHECKOUT_ERROR";
// add items to cart
export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART"
// clear items from cart
export const CLEAR_CART = "CLEAR_CART"
// add menu item
export const ADD_MENU_PENDING = "ADD_MENU_PENDING";
export const ADD_MENU_SUCCESS = "ADD_MENU_SUCCESS";
export const ADD_MENU_ERROR = "ADD_MENU_ERROR";

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
        type: FETCH_CLIENT_ERROR,
        error: error
    }
}

export function fetchClientsPending() {
    return {
        type: FETCH_CLIENT_PENDING
    }
}

export function fetchClientsSuccess(clients) {
    return {
        type: FETCH_CLIENT_SUCCESS,
        clients
    }
}

export function fetchClientsError(error) {
    return {
        type: FETCH_CLIENT_ERROR,
        error: error
    }
}

export function fetchOrdersPending() {
    return {
        type: FETCH_ORDERS_PENDING
    }
}

export function fetchOrdersSuccess(orders) {

    return {
        type: FETCH_ORDERS_SUCCESS,
        orders
    }
}

export function fetchOrdersError(error) {
    return {
        type: FETCH_ORDERS_ERROR,
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

export const addMenuError = (error) => {
    return {
        type: ADD_MENU_ERROR,
        error
    }
};

export const addMenuSuccess = () => {
    return {
        type: ADD_MENU_SUCCESS,
    }
};

export const addMenuPending = () => {
    return {
        type: ADD_MENU_PENDING,
    }
};
export const checkoutError = (error) => {
    return {
        type: CHECKOUT_ERROR,
        error
    }
};

export const checkoutSuccess = () => {
    return {
        type: CHECKOUT_SUCCESS,
    }
};

export const checkoutPending = () => {
    return {
        type: CHECKOUT_PENDING,
    }
};

export const addItemToCart = (product) => {
    return {
        type: ADD_ITEM_TO_CART,
        product
    }
};

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    }
};
