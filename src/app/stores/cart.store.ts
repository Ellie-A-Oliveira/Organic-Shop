import * as actions from './cart.actions';
import { CartItem } from '../models/cart.model';
import { tassign } from 'tassign';

export interface ICartState {
    cartItems: { [id: string]: CartItem };
}

export const CART_INITIAL_STATE: ICartState = {
    cartItems: {}
};

function addItem(state: ICartState, action: { type: string, body: CartItem }) {
    return tassign(state, {
        ...state,
        cartItems: {
            ...state.cartItems,
            [action.body.itemId]: action.body
        }
    });
}

function removeItem(state: ICartState, action: { type: string, body: CartItem }) {
    const newState = tassign(state, {...state, cartItems: { ...state.cartItems } });
    delete newState.cartItems[action.body.itemId];
    return tassign(state, {
        ...newState
    });
}

function removeItems(state: ICartState, action: { type: string, body: CartItem }) {
    return tassign(state, { ...CART_INITIAL_STATE });
}

export function cartReducer(state: ICartState = CART_INITIAL_STATE, action) {
    switch (action.type) {
        case actions.ADD_ITEM: return addItem(state, action);

        case actions.REMOVE_ITEM: return removeItem(state, action);
        case actions.REMOVE_ITEMS: return removeItems(state, action);

        default: return state;
    }
}
