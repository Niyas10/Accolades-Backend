import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import {
  addSeo,
  deleteSeo,
  editSeoDetails,
  listSeo,
  savedEdit,
} from "../controllers/seoController.js";
import {
  addDescription,
  editDescription,
  listDescription,
  viewDescription,
} from "../controllers/descriptionController.js";
const adminRoute = express();

adminRoute.post("/login", adminLogin);
adminRoute.get("/seoList", listSeo);
adminRoute.post("/addSeo", addSeo);
adminRoute.get("/editSeo/:seoId", editSeoDetails);
adminRoute.put("/savedEdit/:seoId", savedEdit);
adminRoute.delete("/deleteSeo/:seoId", deleteSeo);
adminRoute.get("/descriptions", listDescription);
adminRoute.post("/addDescription", addDescription);
adminRoute.get("/viewDescription/:id", viewDescription);
adminRoute.put("/descriptions/:id", editDescription);

export default adminRoute;
