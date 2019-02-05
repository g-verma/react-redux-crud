import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// Initial action to load items list from API
import { getItems } from './actions/itemActions';
// Store config
import configureStore from './store/configureStore';
// Service Worker
import registerServiceWorker from './registerServiceWorker';
// App component
import App from './App';

const store = configureStore();
// Load Items list from API as soon as application initiates
store.dispatch(getItems());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
