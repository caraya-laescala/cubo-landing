require('dotenv').config();
require('./server/database');

const { bodyParser, cors, express } = require('./server/imports');

const app = express();
const { PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use(require('./server/routes'));
app.use(express.static(`${ __dirname }/public`));
app.listen(PORT, error => console.log(error || `Port: ${ PORT }`));