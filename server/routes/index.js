const { express } = require('../imports');

const app = express();

app.use(require('./emails'));

module.exports = app;