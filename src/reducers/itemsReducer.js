import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function itemsReducer(state = initialState.items, action) {
    switch (action.type) {
        case types.SET_ITEMS:
            return action.items;
        case types.ADD_ITEM:
            return [
                ...state,
                Object.assign({}, action.item)
            ];
        case types.EDIT_ITEM:
            return [
                ...state.filter(item => item.id !== action.item.id),
                Object.assign({}, action.item)
            ];
        case types.DELETE_ITEM:
            return [
                ...state.filter(item => item.id !== action.id)
            ];
        default:
            return state;
    }
}