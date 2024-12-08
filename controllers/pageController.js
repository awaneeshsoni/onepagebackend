import Link from "../models/Link.js";
import Page from "../models/Page.js";

// Create a new page
export const createPage = async (req, res) => {
  try {
    const { title, slug, links } = req.body;
    const userId = req.user.id; // Provided by authMiddleware

    // Validate input
    if (!title || !slug || !Array.isArray(links)) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    // Check if the slug is already in use
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ error: "Slug is already in use." });
    }

    // Validate that selected links belong to the user
    const userLinks = await Link.find({ _id: { $in: links }, user: userId });
    if (userLinks.length !== links.length) {
      return res.status(400).json({ error: "Some links are invalid or do not belong to the user." });
    }

    // Create the page
    const newPage = new Page({
      title,
      slug,
      links,
      user: userId
    });
    await newPage.save();

    res.status(201).json({ message: "Page created successfully!", page: newPage });
  } catch (error) {
    console.error("Error creating page:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// edit page
export const editPage = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, links } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!title || !Array.isArray(links)) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    // Find the page to update
    const page = await Page.findOne({ slug, user: userId });
    if (!page) {
      return res.status(404).json({ error: "Page not found or you don't have permission to edit it." });
    }

    // Validate that selected links belong to the user
    const userLinks = await Link.find({ _id: { $in: links }, user: userId });
    if (userLinks.length !== links.length) {
      return res.status(400).json({ error: "Some links are invalid or do not belong to the user." });
    }

    // Update page data
    page.title = title;
    page.links = links;

    // If the slug is being changed, ensure it's unique
    if (req.body.newSlug && req.body.newSlug !== page.slug) {
      const existingPage = await Page.findOne({ slug: req.body.slug });
      if (existingPage) {
        return res.status(400).json({ error: "Slug is already in use." });
      }
      page.slug = req.body.newSlug;
    }

    // Save the updated page
    await page.save();
    res.status(200).json({ message: "Page updated successfully!", page });
  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


// Get a public page by slug
export async function getUserPages(req, res) {
  try {
    const pages = await Page.find({ user: req.user.id }).populate("links");
    if (!pages) return res.status(404).json({ message: "Page not found" });

    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching page", error });
  }
}
export async function getPage(req, res) {
  const { slug } = req.params;
  try {
    const page = await Page.findOne({ slug }).populate("links");
    if (!page) return res.status(404).json({ message: "Page not found" });

    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: "Error fetching page", error });
  }
}

// delete page

export const deletePage = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;

    // Find the page to delete
    const page = await Page.findOneAndDelete({ slug, user: userId });
    if (!page) {
      return res.status(404).json({ error: "Page not found or you don't have permission to delete it." });
    }
    res.status(200).json({ message: "Page deleted successfully!" });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};