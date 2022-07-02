import * as actions from './items.actions';
import { Item } from '../models/item.model';
import { tassign } from 'tassign';

export interface IItemsState {
    items: { [id: string]: Item };
    filter: string;
}

export const ITEMS_INITIAL_STATE: IItemsState = {
    items: {},
    filter: null
};

function loadItems(state: IItemsState, action: { type: string, body: IItemsState['items'] }) {
    return tassign(state, {
        ...state,
        items: action.body
    });
}

function addItem(state: IItemsState, action: { type: string, body: Item }) {
    return tassign(state, {
        ...state,
        items: {
            ...state.items,
            [action.body.id]: action.body
        }
    });
}

function removeItem(state: IItemsState, action: { type: string, body: Item }) {
    const newState = tassign(state, {...state, items: { ...state.items } });
    delete newState.items[action.body.id];
    return tassign(state, {
        ...newState
    });
}

function removeItems(state: IItemsState, action: { type: string, body: Item }) {
    return tassign(state, { ...ITEMS_INITIAL_STATE });
}

function setFilter(state: IItemsState, action: { type: string, body: string }) {
    return tassign(state, { ...state, filter: action.body });
}

export function itemsReducer(state: IItemsState = ITEMS_INITIAL_STATE, action) {
    switch (action.type) {
        case actions.LOAD_ITEMS: return loadItems(state, action);

        case actions.ADD_ITEM: return addItem(state, action);

        case actions.REMOVE_ITEM: return removeItem(state, action);
        case actions.REMOVE_ITEMS: return removeItems(state, action);

        case actions.FILTER_ITEMS: return setFilter(state, action);

        default: return state;
    }
}
