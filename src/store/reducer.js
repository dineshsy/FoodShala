import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    USER_SIGNIN_ERROR,
    USER_SIGNIN_PENDING,
    USER_SIGNIN_SUCCESS
} from "./action";

const initialState = {
    pending: false,
    products: [],
    error: null,
    auth: false,
    user: null
};

export function productsReducer(state = initialState, action) {
    switch (action.type) {
        case USER_SIGNIN_PENDING:
            return {
                ...state,
                pending: true,
            };
        case USER_SIGNIN_SUCCESS:
            console.log(action.user)
            return {
                ...state,
                pending: false,
                user: action.user,
            };
        case USER_SIGNIN_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                pending: true,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action.products,
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        default:
            return state;
    }
}

export const getProducts = (state) => state.products;
export const getProductsPending = (state) => state.pending;
export const getProductsError = (state) => state.error;

export const getUser = (state) => state.user;
export const getUserPending = (state) => state.pending;
export const getUserError = (state) => state.error;
