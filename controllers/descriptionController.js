import Description from "../models/seoDescription.js";

export const listDescription = async (req, res) => {
  try {
    const descriptions = await Description.find();
    res.status(200).json({ descriptions });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addDescription = async (req, res) => {
  const { titleOne, titleOneDescription, titleTwo, titleTwoDescription } =
    req.body;
  try {
    const newDescription = new Description({
      titleOne,
      titleOneDescription,
      titleTwo,
      titleTwoDescription,
    });
    await newDescription.save();
    res.status(201).json(newDescription);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editDescription = async (req, res) => {
  const { id } = req.params;
  const { titleOne, titleOneDescription, titleTwo, titleTwoDescription } =
    req.body;
  try {
    const updatedDescription = await Description.findByIdAndUpdate(
      id,
      { titleOne, titleOneDescription, titleTwo, titleTwoDescription },
      { new: true }
    );
    if (!updatedDescription) {
      return res.status(404).json({ message: "Description not found" });
    }
    res.status(200).json(updatedDescription);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const viewDescription = async (req, res) => {
  const { id } = req.params;
  try {
    const description = await Description.findById(id);
    if (!description) {
      return res.status(404).json({ message: "Description not found" });
    }
    res.status(200).json(description);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
