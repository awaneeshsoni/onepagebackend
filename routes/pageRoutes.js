import express from "express";
import { createPage, getPage, getUserPages, editPage, deletePage } from "../controllers/pageController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:slug", getPage);              // Get a public page by slug
router.get("/", authenticate, getUserPages);              // Get a public page by slug
router.post("/", authenticate, createPage); // Create a new page
router.put("/:slug", authenticate, editPage); // Create a new page
router.delete("/:slug", authenticate, deletePage); // Create a new page

export default router