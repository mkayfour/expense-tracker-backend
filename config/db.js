module.exports = {
    HOST: "localhost",
    USER: "mkayfour",
    PASSWORD: "Test@123",
    DB: "todo",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };