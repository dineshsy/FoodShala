import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    USER_SIGNIN_ERROR,
    USER_SIGNIN_PENDING,
    USER_SIGNIN_SUCCESS,
    CLIENT_SIGNUP_ERROR,
    CLIENT_SIGNUP_PENDING,
    CLIENT_SIGNUP_SUCCESS,
    CUSTOMER_SIGNUP_ERROR,
    CUSTOMER_SIGNUP_PENDING,
    CUSTOMER_SIGNUP_SUCCESS,
    FETCH_CLIENT_ERROR,
    FETCH_CLIENT_PENDING,
    FETCH_CLIENT_SUCCESS,
    ADD_ITEM_TO_CART,
    CHECKOUT_ERROR,
    CHECKOUT_PENDING,
    CHECKOUT_SUCCESS,
    CLEAR_CART,
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_SUCCESS,
    ADD_MENU_ERROR,
    ADD_MENU_PENDING,
    ADD_MENU_SUCCESS
} from "./action";

const initialState = {
    pending: false,
    products: [],
    error: null,
    auth: false,
    user: null,
    clients: [],
    cart: {},
    checkout: false,
    orders: [],
    addMenu: false
};

export function productsReducer(state = initialState, action) {
    switch (action.type) {
        case USER_SIGNIN_PENDING:
            return {
                ...state,
                pending: true,
            };
        case USER_SIGNIN_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                user: action.user,
            };
        case USER_SIGNIN_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case CLIENT_SIGNUP_PENDING:
            return {
                ...state,
                pending: true,
                auth: false,
            };
        case CLIENT_SIGNUP_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                auth: true,
            };
        case CLIENT_SIGNUP_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                auth: false,
            };
        case CUSTOMER_SIGNUP_PENDING:
            return {
                ...state,
                pending: true,
                auth: false,
            };
        case CUSTOMER_SIGNUP_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                auth: true,
            };
        case CUSTOMER_SIGNUP_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                auth: false,
            };
        case FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                error: null,
                pending: true,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                products: action.products,
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case FETCH_CLIENT_PENDING:
            return {
                ...state,
                error: null,
                pending: true,
            };
        case FETCH_CLIENT_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                clients: action.clients,
            };
        case FETCH_CLIENT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case FETCH_ORDERS_PENDING:
            return {
                ...state,
                error: null,
                pending: true,
            };
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                orders: action.orders,
            };
        case FETCH_ORDERS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case CHECKOUT_PENDING:
            return {
                ...state,
                error: null,
                pending: true,
                checkout: false
            };
        case CHECKOUT_SUCCESS:

            return {
                ...state,
                pending: false,
                error: null,
                checkout: true
            };
        case CHECKOUT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case ADD_MENU_PENDING:
            return {
                ...state,
                error: null,
                pending: true,
                addMenu: false
            };
        case ADD_MENU_SUCCESS:

            return {
                ...state,
                pending: false,
                error: null,
                addMenu: true
            };
        case ADD_MENU_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case ADD_ITEM_TO_CART:
            const cart = { ...state.cart };
 
            if (action.product.quantity === 0) delete cart[action.product.id];
            else {
                cart[action.product.id] = action.product;
            } 

            return {
                ...state,
                cart: cart,
            };
            case CLEAR_CART:
                return {
                    ...state,
                    cart: []
                }
        default:
            return state;
    }
}

export const getProducts = (state) => state.products;
export const getProductsPending = (state) => state.pending;
export const getProductsError = (state) => state.error;

export const getClients = (state) => state.clients;
export const getClientsPending = (state) => state.pending;
export const getClientsError = (state) => state.error;

export const getUser = (state) => state.user;
export const getUserPending = (state) => state.pending;
export const getUserError = (state) => state.error;

export const getClientPending = (state) => state.pending;
export const getClientError = (state) => state.error;
export const getClientSuccess = (state) => state.auth;

export const getCustomerPending = (state) => state.pending;
export const getCustomerError = (state) => state.error;
export const getCustomerSuccess = (state) => state.auth;

export const getOrdersPending = (state) => state.pending;
export const getOrdersError = (state) => state.error;
export const getOrdersSuccess = (state) => state.orders;

export const checkoutPending = (state) => state.pending;
export const checkoutError = (state) => state.error;
export const checkoutSuccess = (state) => state.checkout;

export const getAddMenuPending = (state) => state.pending;
export const getAddMenuError = (state) => state.error;
export const getAddMenuSuccess = (state) => state.addMenu;

export const getCart = (state) => state.cart
