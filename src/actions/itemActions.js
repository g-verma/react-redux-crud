import axios from 'axios';
import * as types from './actionTypes';

export function addItem(item) {
    return { type: types.ADD_ITEM, item};
}

export function editItem(item) {
    return { type: types.EDIT_ITEM, item};
}

export function deleteItem(id) {
    return { type: types.DELETE_ITEM, id};
}

export function setItems(items) {
    return { type: types.SET_ITEMS, items};
}

export function ajaxLoading(status) {
    return { type: types.AJAX_LOADING, status};
}

export function getItems() {
    return dispatch => {
        dispatch(ajaxLoading(true));
        axios.get('http://www.mocky.io/v2/5c58368d2f00009015856d6e')
            .then(response => {
                dispatch(setItems(response.data));
                dispatch(ajaxLoading(false));
            })
            .catch(error => {
                console.error(error);
                dispatch(ajaxLoading(false));
            });
    };
}