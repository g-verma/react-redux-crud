import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {NavLink} from 'react-router-dom';

let ItemForm = ({onSubmit, submitting, formStatus}) => {
    return (
        <div>
            <div>
                <form onSubmit={ onSubmit } noValidate>
                    <Field name="firstname" component={renderField} type="text"
                           id="first-name" label="First Name"/>
                    <Field name="lastname" component={renderField} type="text"
                           id="last-name" label="Last Name"/>
                    <Field name="email" component={renderField} type="email"
                           id="email-address" label="Email Address"/>
                    <Field name="phone" component={renderField} type="tel"
                           id="phone-number" label="Phone Number"/>
                    <button type="submit" disabled={submitting}>Submit</button>
                </form>
                {formStatus === 'success' &&
                <p>
                    Items successfully saved.
                    <NavLink to="/items/1"> Return to items list</NavLink>
                </p>}
                {formStatus === 'error' &&
                <p>Saving items failed. Please fill in all the fields.</p>}
            </div>
        </div>
    )
};

const renderField = ({
    input,
    label,
    type,
    id,
    meta: {touched, error}
}) => (
    (type === 'checkbox')
        ?
        <div>
            <label>
                <input {...input} type={type}/>
                {label}
            </label>
            {touched &&
            (error &&
            <span>
            {error}
          </span>)}
        </div>
        :
        <div>
            <label htmlFor={id}>
                {label}
            </label>
            <input {...input} id={id} type={type} />
            {touched &&
            (error &&
            <span>
            {error}
          </span>)}
        </div>
);

function validate(formProps) {
    const errors = {};

    if (!formProps.firstname) {
        errors.firstname = 'Please enter a first name';
    }

    if (!formProps.lastname) {
        errors.lastname = 'Please enter a last name';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Invalid email address';
    }

    if (!formProps.phone) {
        errors.phone = 'Please enter a phone number';
    }

    return errors;
}

ItemForm = reduxForm({
    form: 'item',
    validate,
    enableReinitialize: true
})(ItemForm);

export default ItemForm;