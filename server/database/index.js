const { mongoose } = require('../imports');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('DB status: Online');
});