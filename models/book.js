import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    publishYear: String
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Topic || mongoose.model("Topic", bookSchema);

export default Book;
