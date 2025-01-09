import mongoose from "mongoose";

function dbConnect() {
  mongoose.connect('mongodb://127.0.0.1:27017/users',)
    .then(() => console.log('DB is connected'))
    .catch((error) => console.error('DB connection error:', error));
}

export default dbConnect;