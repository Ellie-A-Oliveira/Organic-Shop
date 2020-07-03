import * as actions from './cart.actions';
import { CartItem } from '../models/cart.model';
import { tassign } from 'tassign';

export interface ICartState {
    cartItems: { [id: string]: CartItem };
    totalCartItems: number;
}

export const CART_INITIAL_STATE: ICartState = {
    cartItems: {},
    totalCartItems: 0
};

function loadCart(state: ICartState, action: { type: string, body: ICartState }) {
    return tassign(state, {
        ...state,
        cartItems: action.body.cartItems,
        totalCartItems: action.body.totalCartItems
    });
}

function addItem(state: ICartState, action: { type: string, body: CartItem }) {
    const totalItems = state.totalCartItems + action.body.quantity;

    if (Object.values(state.cartItems).some(cartItem => cartItem.itemId === action.body.itemId)) {
        let currentItem: CartItem;
        Object.values(state.cartItems).forEach(cartItem => {
            if (cartItem.itemId === action.body.itemId) {
                currentItem = cartItem;
            }
        });
        const totalQuantity = action.body.quantity + currentItem.quantity;

        return tassign(state, {
            ...state,
            cartItems: {
                ...state.cartItems,
                [action.body.itemId]: {
                    ...action.body,
                    quantity: totalQuantity
                }
            },
            totalCartItems: totalItems
        });
    }
    return tassign(state, {
        ...state,
        cartItems: {
            ...state.cartItems,
            [action.body.itemId]: action.body
        },
        totalCartItems: totalItems
    });
}

function removeItem(state: ICartState, action: { type: string, body: CartItem }) {
    const totalItems = state.totalCartItems - action.body.quantity;

    const newState = tassign(state, {...state, cartItems: { ...state.cartItems }, totalCartItems: totalItems });

    if (Object.values(state.cartItems).some(cartItem => cartItem.itemId === action.body.itemId && cartItem.quantity === 1)) {
        delete newState.cartItems[action.body.itemId];
    } else {
        newState.cartItems[action.body.itemId].quantity--;
    }
    return tassign(state, {
        ...newState
    });
}

function removeItems(state: ICartState, action: { type: string, body: CartItem }) {
    return tassign(state, { ...CART_INITIAL_STATE });
}

export function cartReducer(state: ICartState = CART_INITIAL_STATE, action) {
    switch (action.type) {
        case actions.ADD_CART_ITEM: return addItem(state, action);

        case actions.REMOVE_CART_ITEM: return removeItem(state, action);
        case actions.REMOVE_CART_ITEMS: return removeItems(state, action);

        case actions.LOAD_CART: return loadCart(state, action);

        default: return state;
    }
}
