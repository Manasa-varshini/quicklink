// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import urlRoutes from "./routes/urlRoutes.js";

// // dotenv.config();
// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // }).then(() => console.log("MongoDB Connected"))
// // .catch(err => console.log(err));

// // app.use("/", urlRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import urlRoutes from "./routes/urlRoutes.js";

// dotenv.config();

// const app = express();

// // ✅ Middlewares
// app.use(cors());
// app.use(express.json());

// // ✅ Connect MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ MongoDB Connection Error:", err));

// // ✅ Routes
// app.use("/api", urlRoutes);

// // ✅ Default route
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", urlRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Redirect handler (handles shortened links like localhost:5000/abc123)
import Url from "./models/Url.js";
app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).send("Server error");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
