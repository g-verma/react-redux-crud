import React from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import ItemsPage from './containers/ItemsPage';
import EditItemPage from './containers/EditItemPage';
import AddItemPage from './containers/AddItemPage';


import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <div>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName="selected" to="/items/1">list</NavLink></li>
                            <li><NavLink activeClassName="selected" to="/add">Add Item</NavLink></li>
                        </ul>
                    </nav>
                </div>

                <div>
                    <Route path="/items/:pageNo?" component={ItemsPage}/>
                    <Route path="/add" component={AddItemPage}/>
                    <Route path="/edit/:id" component={EditItemPage}/>
                </div>
            </div>
        </Router>
    );
};

export default App;
