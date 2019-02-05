import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as itemActions from '../actions/itemActions';

import ItemForm from '../components/ItemForm';

class EditItemPage extends React.Component {
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
                id: this.props.currentItem.id
            });
            this.props.actions.editItem(item);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            this.props.ajaxLoading ?
                <p>Loading item...</p>
                :
                !this.props.currentItem ?
                    <p>Item not found.</p>
                    :
                    <div>
                        <h1 >Edit item information</h1>
                        <ItemForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus}
                                      initialValues={this.props.currentItem} goBack={this.props.goBack} />
                    </div>
        )
    }
}


function findCurrentItem(items, id = -1) {
    return items.find(item => {
        return parseInt(item.id, 10) === parseInt(id, 10);
    });
}

function mapStateToProps(state, ownProps) {
    let currentItem = state.items.length ? findCurrentItem(state.items, ownProps.match.params.id) : null;
    return {
        currentItem,
        itemForm: state.form.item,
        ajaxLoading: state.ajaxLoading,
        goBack: ownProps.history.goBack
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemPage);