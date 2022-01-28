// require('dotenv').config();

// module.exports = {

//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE,

//     synchronize: false,
//     logging: false,
//     entities: [
//         'src/core/infra/data/database/entities/**/*'
//     ],
//     migrations : [
//         'src/core/infra/data/database/migrations/**/*'
//     ],
//     cli: {
//         entitiesDir: 'src/core/infra/data/database/entities',
//         migrationsDir: 'src/core/infra/data/database/migrations'
//     },
//     extra: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// }

//Configuração do banco de dados
require("dotenv").config();

const rootDir = process.env.NODE_ENV?.toLowerCase() === "production" ? "dist" : "src";
console.log(rootDir);

module.exports  = {
    type: 'postgres',
    // url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: false,
    entities: [
       rootDir +'/core/infra/data/database/entities/**/*'
    ],
    migrations : [
        rootDir+'/core/infra/data/database/migrations/**/*'
    ],
    cli: {
        entitiesDir: 'src/core/infra/data/database/entities',
        migrationsDir: 'src/core/infra/data/database/migrations'
    },
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }  
}