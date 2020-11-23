const { errorResponse } = require('../helpers');

const validRole = ['Directivo', 'Docente', 'Estudiante', 'Apoderado'];
const validName = /^[a-zA-Z ]{3,100}$/;
const validEstablishment = /^[a-zA-Z0-9-. ]{3,100}$/;
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const validPhone = /^[0-9]{8,15}$/;
const validComment = /^[\s\S]{6,250}$/;
const errorRole = `El 'Rol' debe ser Directivo, Docente, Estudiante o Apoderado`;
const errorName = `El 'Nombre' solo debe poseer letras entre A y Z y tener entre 3 y 100 caracteres`;
const errorEstablishment = `El 'Establecimiento' solo debe poseer letras entre A y Z, números, puntos, guiones y tener entre 3 y 100 caracteres`;
const errorEmail = `El 'Email' debe poseer un formato correcto de direcciones de correo`;
const errorPhone = `El 'Teléfono' solo debe poseer números y tener entre 8 y 15 caracteres`;
const errorComment = `El 'Comentario' debe tener entre 6 a 250 caracteres`;

const fieldValidator = (req, resp, next) => {
    const { role, name, establishment, email, phone, comment } = req.body;
    const errorList = [];
    if (!role || !validRole.find(option => option.toLowerCase() === role.trim().toLowerCase())) errorList.push(errorRole);
    if (!name || !validName.test(name.trim())) errorList.push(errorName);
    if (!establishment || !validEstablishment.test(establishment.trim())) errorList.push(errorEstablishment);
    if (!email || !validEmail.test(email.trim())) errorList.push(errorEmail);
    if (!phone || !validPhone.test(phone.trim())) errorList.push(errorPhone);
    if (!comment || !validComment.test(comment.trim())) errorList.push(errorComment);
    if (errorList.length) return errorResponse(resp, 400, errorList);

    const upperCaseFirstLetterFirstWord = value => value.charAt(0).toUpperCase() + value.slice(1);
    const upperCaseFirstLetterAllWords = value => value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    req.email = {
        role: upperCaseFirstLetterAllWords(role.trim()),
        name: upperCaseFirstLetterAllWords(name.trim()),
        establishment: upperCaseFirstLetterAllWords(establishment.trim()),
        email: email.trim(),
        phone: phone.trim(),
        comment: upperCaseFirstLetterFirstWord(comment.trim())
    };

    next();
}

module.exports = { fieldValidator };