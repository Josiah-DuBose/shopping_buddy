import confidence

const manifest = {
    database: {
        uri: process.env.DB_URI,
        secret: process.env.SECRET
    }
};

store = new Confidence.Store(manifest);

export default function get(key) {
    return store.get(key, criteria);
}