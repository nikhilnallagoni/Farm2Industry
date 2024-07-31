const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    // const connect =await mongoose.connect("mongodb://localhost:27017/")
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/miniproject",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connected to db");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDb;
