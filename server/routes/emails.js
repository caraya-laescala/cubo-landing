const { express } = require('../imports');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { setFieldsHtml, setSubjectAndTransporter, sendEmailAdministrator, sendEmailUser } = require('../middlewares/sendEmail');
const { saveEmail } = require('../middlewares/saveEmail');
const { postEmail } = require('../controllers/emails');

const router = express.Router();

router.post(
    '/send-email',
    fieldValidator,
    setFieldsHtml,
    setSubjectAndTransporter,
    sendEmailAdministrator,
    sendEmailUser,
    saveEmail,
    postEmail
);

module.exports = router;