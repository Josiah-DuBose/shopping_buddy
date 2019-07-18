const Confidence = require('confidence');
const manifest = {
    database: {
        uri: process.env.DB_URI,
        // secret: process.env.SECRET,
        useNewUrlParser: true
    }
};

store = new Confidence.Store(manifest);

module.exports.get = (key) => {
    return store.get(key);
}
