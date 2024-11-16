require('dotenv').config();

const config = () => {
    switch (process.env.NODE_ENV) {
        case "local": return {
            PORT: process.env.PORT,
            DB_URL: process.env.DATABASE_URL_LOCAL,
            JWT_KEY: process.env.JWT_KEY
        }
        case "development": return {
            PORT: process.env.PORT,
            DB_URL: process.env.DATABASE_URL_DEV,
            JWT_KEY: process.env.JWT_KEY
        }
        case "test": return {
            PORT: process.env.PORT,
            DB_URL: process.env.DATABASE_URL_TEST,
            JWT_KEY: process.env.JWT_KEY
        }
        case "production": return {
            PORT: process.env.PORT,
            DB_URL: process.env.DATABASE_URL_PROD,
            JWT_KEY: process.env.JWT_KEY
        }
    }
}

exports.config = config;