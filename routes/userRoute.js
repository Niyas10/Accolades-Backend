import express from "express";
import { showSeo } from "../controllers/UserController.js";
const userRoute = express();

userRoute.get("/seoList", showSeo);

export default userRoute;
