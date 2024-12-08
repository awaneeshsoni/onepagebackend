import Link from "../models/Link.js";

export async function createLink(req, res) {
  const { title, url } = req.body;
  try {
    const newLink = await Link.create({ title, url, user: req.user.id });
    res
      .status(201)
      .json({ message: "Link created successfully", link: newLink });
    console.log(req);
  } catch (error) {
    res.status(500).json({ message: "Error creating link", error });
  }
}

// Get all links for the authenticated user
export async function getLinks(req, res) {
  try {
    const links = await Link.find({ user: req.user.id });
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: "Error fetching links", error });
  }
}

export async function getLink(req, res) {
  const { slug } = req.params;
  try {
    const link = await Link.findOne({ _id: slug });
    console.log(slug);
    console.log(link);
    if (!link) return res.status(404).json({ message: "link not found" });

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: "Error fetching link", error });
  }
}
export async function editLink(req, res) {
  const { slug } = req.params;
  const { title, url } = req.body;
  try {
    const updatedLink = await Link.findOneAndUpdate(
      { _id: slug },
      { title, url }
    );
    res
      .status(201)
      .json({ message: "Link updated successfully", link: updatedLink });
    console.log(req);
  } catch (error) {
    res.status(500).json({ message: "Error updating link", error });
  }
}
export async function deleteLink(req, res) {
  const { slug } = req.params;
  try {
    const result = await Link.findOneAndDelete({ _id: slug });
    res
      .status(201)
      .json({ message: "Link deleted successfully" });
    console.log(result);
  } catch (error) {
    res.status(500).json({ message: "Error delting message from backend link", error });
  }
}
