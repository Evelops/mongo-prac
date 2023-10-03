const mongoose = require("mongoose");

const connect = () => {
  // 배포용이 아닐경우 monogoose의 debug 모드를 활성화
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    `mongodb://${process.env.mongo_user}:${process.env.monog_pwd}@localhost:27017/admin`,
    {
      dbName: process.env.monogo_db,
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (error) => {
      if (error) {
        console.log("monog connection error", error);
      } else {
        console.log("monog connection success");
      }
    }
  );
};

// connection error handler
mongoose.connection.on("error", (error) => {
  console.error("mongo connection error", error);
});

// if monogo connection failed retry to connection handler
mongoose.connection.on("disconnected", () => {
  console.error("disconnected with mongo, try to reconnection");
  connect();
});

module.exports = connect;
