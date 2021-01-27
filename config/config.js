const config = {

    development: {
        PORT: 5000,
    },
    production: {
        PORT: 80,
    }

};
// const proc = process.env.NODE_ENV;


module.exports = config[process.env.NODE_ENV.trim()];