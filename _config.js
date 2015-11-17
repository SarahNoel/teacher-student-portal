module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'my-precious',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/teacher-student',
  SALT_WORK_FACTOR: 10,
};
