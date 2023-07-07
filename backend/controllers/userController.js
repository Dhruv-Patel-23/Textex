import dotenv from "dotenv";
import User from "../models/user.js";
import createToken from "../database/generateToken.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.send({ message: "User Already Registered" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      await newUser.save();
      res.status(201).send({
        message: "Successfully Registered Please Login now",
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: createToken(newUser._id),
      });
    }
  } catch (err) {
    console.error("Error while querying the database:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: createToken(user._id),
      });
    } else {
      res.status(401).json("password does not match");
    }
  } else {
    res.status(400).json("user does not exist");
  }
};

// const loginUser = async (req, res) => {

//     const { email, password } = req.body;
//     try {
//         const foundUser = await User.findOne({ email });
//         if (foundUser) {
//             if (password === foundUser.password) {
//                 res.send({ message: "Login Successful",foundUser, token:createToken(foundUser._id),});
//             } else {
//                 res.send({ message: "Password didn't match"});
//             }
//         } else {
//             res.send({ message: "User not registered"});
//         }
//     } catch (err) {
//         console.error("Error while querying the database:", err);
//         res.status(500).send({ error: "Internal Server Error"});
//     }
// }

// const allUsers = async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};

//   const users = await User.find(keyword);
//   res.send(users);
// };

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        
           name: { $regex: req.query.search, $options: "i" } 
          
        
      }
    : {};
      // console.log(req.body)
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);

};

export { loginUser, registerUser, allUsers };
