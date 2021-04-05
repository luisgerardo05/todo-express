const Validator = require ('validator');
const isEmpty = require ('../utils/is_empty');

function validate_register_input (data) {

    let errors = {};

    data.name = !isEmpty (data.name) ? data.name : '';
    data.username = !isEmpty (data.username) ? data.username : '';
    data.email = !isEmpty (data.email) ? data.email : '';
    data.password = !isEmpty (data.password) ? data.password : '';
    data.confirm = !isEmpty (data.confirm) ? data.confirm : '';

    // validate name
    if (Validator.isEmpty (data.name)) errors.name = 'Name field is required.';

    // validate email
    if (Validator.isEmpty (data.email)) errors.email = 'Email field is required.';
    else if (!Validator.isEmail (data.email))
        errors.email = 'Email is invalid.';

    // TODO: check for special characters
    // validate username
    if (Validator.isEmpty (data.username)) errors.username = 'Username field is required.';
    else if (!Validator.isLength (data.username, { min: 2, max: 30 }))
        errors.username = 'Username must be between 2 and 30 characters.';

    // validate password
    if (Validator.isEmpty (data.password)) errors.password = 'Password field is required.';
    // else if (!Validator.isLength (data.password, { min: 6, max: 30 }))
    //     errors.password = 'Password must be at least 6 characters.';

    // validate password 2
    if (Validator.isEmpty (data.confirm)) errors.confirm = 'Confirm Password field is required.';
    else if (!Validator.equals (data.password, data.confirm))
        errors.confirm = 'Passwords must match.';

    return {
        errors,
        isValid: isEmpty (errors)
    };
};

module.exports = {
    validate_register_input
}
