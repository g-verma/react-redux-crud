import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as itemActions from '../actions/itemActions';
import ItemForm from '../components/ItemForm';

class AddItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formStatus: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.props.itemForm.syncErrors) {
            let item = Object.assign({}, this.props.itemForm.values, {
                id: this.props.newId
            });
            this.props.actions.addItem(item);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            <div>
                <h1>Add new item</h1>
                <ItemForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus} />
            </div>
        )
    }
}


function generateNewId(items) {
    let sortedItems = items.slice(0);
    sortedItems = sortedItems.sort(function(a, b) {
        return b.id - a.id;
    });
    let lastId = sortedItems.length ? parseInt(sortedItems[0].id, 10) : 0;
    return lastId + 1;
}

function mapStateToProps(state) {
    let newId = generateNewId(state.items);
    return {
        itemForm: state.form.item,
        newId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemPage);