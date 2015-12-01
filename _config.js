module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'my-precious',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://heroku_nzmv06sq:orn79vo2rdhhqcp0adei36kguk@ds059634.mongolab.com:59634/heroku_nzmv06sq' || 'mongodb://localhost/teacher-student',
  SALT_WORK_FACTOR: 10,
};
