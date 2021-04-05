const Validator = require ('validator');
const isEmpty = require ('../utils/is_empty');

function validate_item_input (data) {

    let errors = {};

    data.title = !isEmpty (data.title) ? data.title : '';
    data.description = !isEmpty (data.description) ? data.description : '';

    if (Validator.isEmpty (data.title)) errors.title = 'Title field is required.';
    else if (!Validator.isLength (data.title, { max: 256 }))
        errors.title = 'Title must not exceed a length of 256.';

	if (!Validator.isLength (data.description, { max: 1024 }))
		errors.description = 'Description must not exceed a length of 1024.';

    return {
        errors,
        isValid: isEmpty (errors)
    };

};

module.exports = {
    validate_item_input,
}