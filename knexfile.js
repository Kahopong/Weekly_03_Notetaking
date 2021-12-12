require('dotenv').config({ path: '/Users/Kaho/Desktop/FTWD_Node_Weekly_03/Node/03_Weekly/.env' })

module.exports = {

    development: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    testing: {
        client: "postgresql",
        connection: {
            database: process.env.TESTDB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        },
    },
    production: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};