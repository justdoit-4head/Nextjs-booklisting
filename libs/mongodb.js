import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://soap:TijQZyLMYRuw3a5a@cluster0.88zmhbg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
