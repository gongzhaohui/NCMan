module.exports = {
    "production": {
        "databaseName": process.env.PROD_DB_NAME,
        "url": process.env.PROD_DB_HOST,
    },
    "development": {
        "databaseName": process.env.DEVELOPMENT_DB_NAME,
        "url": process.env.DEVELOPMENT_URL
    },
    "test": {
        "databaseName": "test",
        "url": "http://127.0.0.1:8529",
    },
}