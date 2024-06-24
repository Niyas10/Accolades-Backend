import Seo from "../models/seoModel.js";
import cloudinary from "../utils/cloudinary.js";

export const listSeo = async (req, res) => {
  try {
    const seos = await Seo.find();
    res.status(200).json({ seos });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addSeo = async (req, res) => {
  try {
    const { seoName, image } = req.body;
    if (!seoName || !image) {
      return res
        .status(400)
        .json({ message: "seoName and images are required" });
    }
    const uploadPromises = image.map((img) =>
      cloudinary.uploader.upload(img, { folder: "Seos" })
    );
    const uploadedImages = await Promise.all(uploadPromises);
    const seoImages = uploadedImages.map((img) => img.secure_url);

    await Seo.create({
      seoName,
      images: seoImages,
      isListed: true,
    });

    res.status(201).json({ message: "SEO added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const editSeoDetails = async (req, res) => {
  try {
    const { seoId } = req.params;
    const seo = await Seo.findById(seoId);
    if (seo) {
      res.status(200).json({ seo });
    } else {
      return res.status(404).json({ message: "Seo not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const savedEdit = async (req, res) => {
  const { seoId, seoName, newImages, existingImages } = req.body;
  try {
    let seo = await Seo.findById(seoId);
    if (!seo) {
      return res.status(404).json({ message: "Seo not found" });
    }

    seo.seoName = seoName;

    if (existingImages.length > 0) {
      const deletedImages = existingImages.filter(
        (img) => !newImages.includes(img)
      );
      if (deletedImages.length > 0) {
        const deletePromises = deletedImages.map((imgUrl) => {
          const publicId = imgUrl.split("/").pop().split(".")[0];
          return cloudinary.uploader.destroy(publicId);
        });
        await Promise.all(deletePromises);
      }
    }

    seo.images = newImages;

    seo = await seo.save();
    res.status(200).json({ message: "SEO updated successfully", seo });
  } catch (error) {
    console.error("Error updating seo:", error);
    res.status(500).json({ message: "Error updating seo" });
  }
};

export const deleteSeo = async (req, res) => {
  const { seoId } = req.params;
  try {
    const seo = await Seo.findById(seoId);
    if (!seo) {
      return res.status(404).json({ message: "Seo not found" });
    }

    const deletePromises = seo.images.map((imgUrl) => {
      const publicId = imgUrl.split("/").pop().split(".")[0];
      return cloudinary.uploader.destroy(publicId);
    });
    await Promise.all(deletePromises);

    await Seo.deleteOne({ _id: seoId });

    res.status(200).json({ message: "SEO deleted successfully" });
  } catch (error) {
    console.error("Error deleting SEO:", error);
    res.status(500).json({ message: "Error deleting SEO" });
  }
};
