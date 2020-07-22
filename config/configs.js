module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.APP_URL || "http://localhost:3000",
    DB_URI: process.env.DB_URI ||
        "mongodb+srv://sami:samiproject@mongodb.jhach.mongodb.net/test"
}