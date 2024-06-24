import Seo from "../models/seoModel.js";

export const showSeo = async (req, res) => {
  try {
    const seoData = await Seo.find();
    if (seoData) {
      res.status(200).json({ seo: seoData });
    } else {
      res.status(500).json({ message: "somthing wrong finding a seo data" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server issue" });
  }
};
