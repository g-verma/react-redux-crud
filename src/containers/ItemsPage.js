import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as itemActions from '../actions/itemActions';
import ItemList from '../components/ItemList';

class ItemsPage extends React.Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(id) {
        if (window.confirm('Are you sure you want to delete this item?')) {
            this.props.actions.deleteItem(id);
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.ajaxLoading ?
                        <p>Loading items...</p>
                        :
                        <ItemList items={this.props.items} pages={this.props.pages}
                                      onDeleteItem={this.deleteItem} currentPage={this.props.currentPage} />
                }
            </div>
        )
    }
}

function generateItemsByPage(items, pageNo) {
    const perPage = 20;
    if (items.length) {
        return items.filter((item, i) => {
            return i >= perPage*(pageNo-1) && i < perPage*pageNo;
        });
    }
    return [];
}

function mapStateToProps(state, ownProps) {
    let pageNo = ownProps.match.params.pageNo || 1;
    let items = generateItemsByPage(state.items, pageNo);
    return {
        items: items,
        pages: Math.ceil(state.items.length / 10),
        currentPage: pageNo,
        ajaxLoading: state.ajaxLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);