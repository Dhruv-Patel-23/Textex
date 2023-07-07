// import  express  from 'express';
// import { allUsers } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router=express.Router();

// router.route("/").get(protect,allUsers);

// export default router;
import express from "express";
import { allUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    await protect(req, res, () => allUsers(req, res));
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
