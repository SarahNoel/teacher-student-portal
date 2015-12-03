module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'my-precious',
  SALT_WORK_FACTOR: 10,
  mongoURI: {
  development: 'mongodb://localhost/teacher-student',
  production: 'mongodb://heroku_nzmv06sq:orn79vo2rdhhqcp0adei36kguk@ds059634.mongolab.com:59634/heroku_nzmv06sq'
  }
};


