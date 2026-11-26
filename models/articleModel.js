import mongoose from "mongoose";
import slugify from "slugify";
import CATEGORIES from "../constants/categories.js";

const Schema = mongoose.Schema;

const articleSchema = Schema({
  title: {
    type: String,
    // required: true,
    trim: true,
    unique: true,
    maxlength: 150,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  excerpt: { type: String, maxlength: 300, default: "" },
  content: {
    type: String,
    //  required: true
  },
  category: {
    type: String,
    // required:true,
    trim: true,
    enum: CATEGORIES,
  },
  coverImage: { type: String, default: "" },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.pre("save", function () {
  if (this.isModified("title")) {
    ((this.slug = slugify(this.title)),
      { lower: true, strict: true, trim: true });
  }
});

export default mongoose.model("Article", articleSchema);
