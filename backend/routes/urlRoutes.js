// // // import express from "express";
// // // import { nanoid } from "nanoid";
// // // import Url from "../models/Url.js";

// // // const router = express.Router();

// // // // POST - Create short URL
// // // // router.post("/shorten", async (req, res) => {
// // // //   const { originalUrl } = req.body;
// // // //   const shortId = nanoid(6);
// // // //   const newUrl = await Url.create({ shortId, originalUrl });
// // // //   res.json(newUrl);
// // // // });
// // // // POST - Create short URL
// // // router.post("/shorten", async (req, res) => {
// // //   try {
// // //     const { originalUrl } = req.body;
// // //     if (!originalUrl) {
// // //       return res.status(400).json({ message: "Original URL is required" });
// // //     }

// // //     const shortId = nanoid(6);
// // //     const baseUrl = process.env.BASE_URL || "http://localhost:5000";

// // //     const newUrl = await Url.create({
// // //       shortId,
// // //       originalUrl,
// // //       shortUrl: `${baseUrl}/${shortId}`,
// // //     });

// // //     res.json(newUrl);
// // //   } catch (error) {
// // //     console.error("Error shortening URL:", error);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // });

// // // // GET - Redirect to original URL
// // // router.get("/:shortId", async (req, res) => {
// // //   const { shortId } = req.params;
// // //   const url = await Url.findOne({ shortId });
// // //   if (url) {
// // //     url.clicks++;
// // //     await url.save();
// // //     return res.redirect(url.originalUrl);
// // //   } else {
// // //     res.status(404).json({ message: "URL not found" });
// // //   }
// // // });

// // // // GET - All shortened URLs
// // // router.get("/", async (req, res) => {
// // //   const urls = await Url.find().sort({ createdAt: -1 });
// // //   res.json(urls);
// // // });

// // // export default router;
// // import express from "express";
// // import { nanoid } from "nanoid";
// // import Url from "../models/Url.js";

// // const router = express.Router();

// // // POST - Create short URL
// // // In your urlRoutes.js - Fix the response format
// // router.post("/shorten", async (req, res) => {
// //   try {
// //     const { originalUrl } = req.body;
// //     if (!originalUrl) {
// //       return res.status(400).json({ message: "Original URL is required" });
// //     }

// //     const shortId = nanoid(6);
// //     const baseUrl = process.env.BASE_URL || "http://localhost:5000";
// //     const shortUrl = `${baseUrl}/${shortId}`;

// //     const newUrl = await Url.create({
// //       shortId,
// //       originalUrl,
// //       shortUrl,
// //     });

// //     // Return the response in the correct format
// //     res.json({
// //       shortId: newUrl.shortId,
// //       shortUrl: newUrl.shortUrl, // Make sure this matches
// //       originalUrl: newUrl.originalUrl, // Consistent casing
// //       clicks: newUrl.clicks,
// //       createdAt: newUrl.createdAt
// //     });

// //   } catch (error) {
// //     console.error("Error shortening URL:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // // GET - Redirect to original URL
// // router.get("/:shortId", async (req, res) => {
// //   try {
// //     const { shortId } = req.params;
// //     const url = await Url.findOne({ shortId });
    
// //     if (url) {
// //       url.clicks++;
// //       await url.save();
// //       return res.redirect(url.originalUrl);
// //     } else {
// //       res.status(404).json({ message: "URL not found" });
// //     }
// //   } catch (error) {
// //     console.error("Redirect error:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // // GET - All shortened URLs
// // router.get("/", async (req, res) => {
// //   try {
// //     const urls = await Url.find().sort({ createdAt: -1 });
// //     res.json(urls);
// //   } catch (error) {
// //     console.error("Error fetching URLs:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // export default router;
// import express from "express";
// import { nanoid } from "nanoid";
// import Url from "../models/Url.js";

// const router = express.Router();

// // POST - Create short URL
// router.post("/shorten", async (req, res) => {
//   try {
//     const { originalUrl } = req.body;
    
//     if (!originalUrl) {
//       return res.status(400).json({ message: "Original URL is required" });
//     }

//     // Validate URL format
//     try {
//       new URL(originalUrl);
//     } catch (error) {
//       return res.status(400).json({ message: "Invalid URL format" });
//     }

//     const shortId = nanoid(6);
//     const baseUrl = process.env.BASE_URL || "http://localhost:5000";
//     const shortUrl = `${baseUrl}/${shortId}`;

//     // Create the URL with ALL required fields
//     const newUrl = await Url.create({
//       shortId,
//       originalUrl,
//       shortUrl, // This is crucial!
//     });

//     console.log("Created URL:", newUrl); // Debug log

//     // Return the complete response
//     res.json({
//       shortId: newUrl.shortId,
//       shortUrl: newUrl.shortUrl,
//       originalUrl: newUrl.originalUrl,
//       clicks: newUrl.clicks,
//       createdAt: newUrl.createdAt
//     });

//   } catch (error) {
//     console.error("Error shortening URL:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET - Redirect to original URL (FIX THIS)
// router.get("/:shortId", async (req, res) => {
//   try {
//     const { shortId } = req.params;
//     console.log("Looking for shortId:", shortId); // Debug log
    
//     const url = await Url.findOne({ shortId });
//     console.log("Found URL:", url); // Debug log
    
//     if (url) {
//       url.clicks++;
//       await url.save();
//       console.log("Redirecting to:", url.originalUrl); // Debug log
//       return res.redirect(url.originalUrl);
//     } else {
//       console.log("URL not found for shortId:", shortId);
//       res.status(404).json({ message: "URL not found" });
//     }
//   } catch (error) {
//     console.error("Redirect error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET - All shortened URLs
// router.get("/", async (req, res) => {
//   try {
//     const urls = await Url.find().sort({ createdAt: -1 });
//     res.json(urls);
//   } catch (error) {
//     console.error("Error fetching URLs:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const router = express.Router();

// POST - Create short URL
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ message: "Invalid URL format" });
    }

    const shortId = nanoid(6);
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    const shortUrl = `${baseUrl}/${shortId}`;

    const newUrl = await Url.create({ shortId, originalUrl, shortUrl });

    res.json({
      shortId: newUrl.shortId,
      shortUrl: newUrl.shortUrl,
      originalUrl: newUrl.originalUrl,
      clicks: newUrl.clicks,
      createdAt: newUrl.createdAt,
    });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET - Fetch all URLs
router.get("/", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
