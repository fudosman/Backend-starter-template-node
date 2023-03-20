const app = require("./app.js");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const DB = require("./configs/db.config");

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    const connected = await DB(MONGO_URL);

    if (connected) {
      app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
      }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

start();
