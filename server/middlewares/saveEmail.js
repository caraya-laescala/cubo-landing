const Emails = require('../models/emails');
const { errorResponse } = require('../helpers');

const saveEmail = (req, resp, next) => {
    new Emails(req.email).save((error, email) => {
        if (error) return errorResponse(resp, 500, error);
        req.email = email;
        next();
    });
};

module.exports = { saveEmail };