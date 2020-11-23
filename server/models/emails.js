const { mongoose } = require('../imports');

const stringObj = { type: String };

const emailSchema = new mongoose.Schema({
    role: stringObj,
    name: stringObj,
    establishment: stringObj,
    email: stringObj,
    phone: stringObj,
    comment: stringObj,
    subjectEmail: stringObj,
    nameTransporter: stringObj,
    userTransporter: stringObj,
    messageIdTransporter: stringObj,
    messageIdUser: stringObj
}, { timestamps: true });

emailSchema.methods.toJSON = function() {
    const { role, name, establishment, email, phone, comment } = this.toObject();
    return { role, name, establishment, email, phone, comment };
}

module.exports = mongoose.model('email', emailSchema);