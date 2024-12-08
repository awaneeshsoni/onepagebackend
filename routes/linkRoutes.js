import express from "express";
import { createLink, deleteLink, editLink, getLink, getLinks } from "../controllers/linkController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getLinks);   // Get all links for a user
router.get("/:slug", authenticate, getLink);   // Get all links for a user
router.post("/", authenticate, createLink); // Create a new link
router.put("/:slug", authenticate, editLink); // Create a new link
router.delete("/:slug",authenticate, deleteLink); // Delete a new link

export default router