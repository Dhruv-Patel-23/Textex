import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const createToken = (id) => {
    
  const token =  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export default createToken;
