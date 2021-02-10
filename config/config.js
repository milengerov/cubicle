const config = {

    development: {
        PORT: 5000,
        DB_CONNECTION: "mongodb://localhost/cubicle",
        SALT_ROUNDS: 10,
        SECRET: "asparuh",
        COOKIE_NAME: "userData",
    },
    production: {
        PORT: 80,
        DB_CONNECTION: "mongodb+srv://milengerov:universe@cubicles.lbsdq.mongodb.net/cubicle?retryWrites=true&w=majority",
        SALT_ROUNDS: 10,
        SECRET: "asparuh",
        COOKIE_NAME: "userData",
    }

};
// const proc = process.env.NODE_ENV;


module.exports = config[process.env.NODE_ENV.trim()];