// // import mongoose from "mongoose";

// // const urlSchema = new mongoose.Schema({
// //   shortId: { type: String, required: true, unique: true },
// //   originalUrl: { type: String, required: true },
// //   clicks: { type: Number, default: 0 },
// // }, { timestamps: true });

// // export default mongoose.model("Url", urlSchema);
// import mongoose from "mongoose";

// const urlSchema = new mongoose.Schema({
//   shortId: { type: String, required: true, unique: true },
//   originalUrl: { type: String, required: true },
//   shortUrl: { type: String }, // Add this field
//   clicks: { type: Number, default: 0 },
// }, { timestamps: true });

// export default mongoose.model("Url", urlSchema);
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Url", urlSchema);
