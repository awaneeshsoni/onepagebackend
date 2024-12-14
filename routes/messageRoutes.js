import express from "express";
import { addMessage, deleteMessage, getMessages } from "../controllers/messageController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",authenticate, getMessages)
router.post('/', addMessage);
router.delete('/:slug',authenticate, deleteMessage)

export default router