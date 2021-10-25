import mongoose from "mongoose";
import  dotenv from "dotenv";

const connectDB = async () => {
  dotenv.config();

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB bağlantısı başarılı');
  } catch (err) {
    console.log('MongoDB bağlantısı başarısız');
    console.log(err);
    process.exit();
  }
}

export default connectDB;