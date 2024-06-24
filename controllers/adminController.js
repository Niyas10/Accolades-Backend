import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const adminLogin = (req, res) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const userName = "Admin";

  try {
    const { email, password } = req.body;
    if (email === adminEmail) {
      if ((password, adminPassword)) {
        const token = jwt.sign(
          {
            name: userName,
            email: adminEmail,
            role: "admin",
          },
          process.env.ADMIN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res
          .status(200)
          .json({ userName, token, message: `Welcome ${userName}` });
      } else {
        return res.status(403).json({ message: "Incorrect Password" });
      }
    } else {
      return res.status(401).json({ message: "Incorrect Email" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "Internal Server Error" });
  }
};
