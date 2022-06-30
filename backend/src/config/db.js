module.exports = (mongoose) => {
  const dbPort = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;
  const urlDB = `mongodb://localhost:${dbPort}/${dbName}`;

  mongoose.connect(urlDB).catch((error) => console.error(error));
};
