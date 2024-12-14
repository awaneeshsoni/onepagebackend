import Message from "../models/Message.js";
import Page from "../models/Page.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Route: POST /api/messages
export const addMessage = async (req, res) => {
  try {
    const { message, slug } = req.body; // Receive message and slug from the frontend
    // Find the page using the slug
    const page = await Page.findOne({ slug });
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    // Find the user who created the page using the page's userId
    const user = await User.findById(page.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create a new message linked to the page and the user
    const newMessage = new Message({
      message, // The actual message text
      page: page._id, // Link the message to the page ID
      pageOwner: user._id, // Link the message to the page owner's user ID
    });
    await newMessage.save();
    res.status(201).json({ message: "Message added successfully", newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
     // provided by middleware
    // Find all messages that are linked to this user
    const messages = await Message.find({ pageOwner: req.user.id })
      .populate("page", "title slug") // Optionally, you can populate the page's title and slug
      .sort({ createdAt: -1 }); // Sort messages by creation time, most recent first
    if (!messages.length) {
      return res
        .status(404)
        .json({ message: "No messages found for this user" });
    }
    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
    try {
        const pageOwner = req.user.id;
      const message = await Message.findByIdAndDelete({_id: req.params.slug});
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(200).json({ success: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };