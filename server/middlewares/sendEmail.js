const { nodemailer } = require('../imports');
const { errorResponse } = require('../helpers');

const setFieldsHtml = (req, resp, next) => {
    const { role, name, establishment, email, phone, comment } = req.email;

    const dataHtml = `
        <ul>
            <li><strong>Rol:</strong> ${ role }</li>
            <li><strong>Nombre:</strong> ${ name }</li>
            <li><strong>Establecimiento:</strong> ${ establishment }</li>
            <li><strong>Email:</strong> ${ email }</li>
            <li><strong>Teléfono:</strong> ${ phone }</li>
            <li><strong>Comentario:</strong> ${ comment }</li>
        </ul>
    `;

    req.dataHtml = dataHtml;
    next();
}

const setSubjectAndTransporter = async (req, resp, next) => {
    const {
        SUBJECT_EMAIL,
        NAME_TRANSPORTER,
        HOST_TRANSPORTER,
        PORT_TRANSPORTER,
        SECURE_TRANSPORTER,
        USER_TRANSPORTER,
        PASS_TRANSPORTER
    } = process.env;

    const testAccount = await nodemailer.createTestAccount();
    const { user, pass, smtp } = testAccount;
    const { host, port, secure } = smtp;

    const createTransportObj = {
        host: HOST_TRANSPORTER.trim() || host,
        port: PORT_TRANSPORTER.trim() || port,
        secure: SECURE_TRANSPORTER.trim() || secure,
        auth: {
            user: USER_TRANSPORTER.trim() || user,
            pass: PASS_TRANSPORTER.trim() || pass
        }
    };

    req.email.subjectEmail = SUBJECT_EMAIL.trim();
    req.email.nameTransporter = NAME_TRANSPORTER.trim();
    req.email.userTransporter = createTransportObj.auth.user;
    req.transporter = nodemailer.createTransport(createTransportObj);
    next();
}

const sendEmailAdministrator = (req, resp, next) => {
    const { email, dataHtml, transporter } = req;
    const { nameTransporter, userTransporter, subjectEmail } = email;
    
    const administratorMailHtml = `
        <p>Hola <strong>${ nameTransporter }</strong>,</p>
        <p>Tenemos una solicitud para una demo de cubo.</p>
        <p>Por favor, contacta al usuario lo antes posible para tomar su solicitud.</p>
        <p>Los datos ingresados son los siguientes:</p>
        ${ dataHtml }
        <p>Saludos.</p>
    `;

    const sendMailToAdministratorObj = {
        from: `"${ nameTransporter }" <${ userTransporter }>`,
        to: userTransporter,
        subject: subjectEmail,
        html: administratorMailHtml
    };

    transporter.sendMail(sendMailToAdministratorObj, (error, info) => {
        if (error) return errorResponse(resp, 500, error);
        const testMessageUrlTransporter = nodemailer.getTestMessageUrl(info);
        if (testMessageUrlTransporter) console.log('Test Message URL Transporter:', testMessageUrlTransporter);
        req.email.messageIdTransporter = info.messageId;
        next();
    });
}

const sendEmailUser = (req, resp, next) => {
    const { email, dataHtml, transporter } = req;
    const { name, email: emailUser, nameTransporter, userTransporter, subjectEmail } = email;

    const userMailHtml = `
        <p>Hola <strong>${ name }</strong>,</p>
        <p>Nos enviaste una solicitud para una demo de cubo.</p>
        <p>Te contactaremos lo antes posible para atender tu solicitud.</p>
        <p>En caso de que no hayas hecho esta solicitud, por favor indicar esta razón cuando nos contactemos contigo.</p>
        <p>Los datos ingresados son los siguientes:</p>
        ${ dataHtml }
        <p>Muchas gracias por tu elección.</p>
        <p>Saludos.</p>
    `;

    const sendMailToUserObj = {
        from: `"${ nameTransporter }" <${ userTransporter }>`,
        to: emailUser,
        subject: subjectEmail,
        html: userMailHtml
    };

    transporter.sendMail(sendMailToUserObj, (error, info) => {
        if (error) return errorResponse(resp, 500, error);
        const testMessageUrlUser = nodemailer.getTestMessageUrl(info);
        if (testMessageUrlUser) console.log('Test Message URL User:', testMessageUrlUser);
        req.email.messageIdUser = info.messageId;
        next();
    });
}

module.exports = {
    setFieldsHtml,
    setSubjectAndTransporter,
    sendEmailAdministrator,
    sendEmailUser
};