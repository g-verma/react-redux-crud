import React from 'react';
import {NavLink} from 'react-router-dom';
import Pagination from './Pagination';

const ItemList = ({items, onDeleteItem, pages, currentPage}) => {
    return (
        !items.length ?
            <p>No items found.</p>
            :
            <div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <NavLink to={'/edit/' + item.id}>Edit</NavLink>
                                </td>
                                <td>
                                    <button onClick={() => onDeleteItem(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                { 
                    pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>
                }
            </div>
    )
};

export default ItemList;