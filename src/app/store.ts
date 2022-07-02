import { ICartState, cartReducer, CART_INITIAL_STATE } from './stores/cart.store';
import { IItemsState, ITEMS_INITIAL_STATE, itemsReducer } from './stores/items.store';
import { combineReducers } from 'redux';

export interface IAppState {
    cartState: ICartState;
    itemsState: IItemsState;
}

export const INITIAL_STATE: IAppState = {
    cartState: CART_INITIAL_STATE,
    itemsState: ITEMS_INITIAL_STATE
};

export const rootReducer = combineReducers({
    cartState: cartReducer,
    itemsState: itemsReducer
});
