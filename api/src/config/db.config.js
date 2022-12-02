const {
    DB_HOST,
    DB_PORT,
} = process.env;

module.exports = {
    url: `mongodb://${DB_HOST}:${DB_PORT}`
};