import express from "express";

import accessChat from "../controllers/chatController/accessChat.js";
import fetchChats from "../controllers/chatController/fetchChats.js";
import addToGroup from "../controllers/chatController/addToGroup.js";
import removeFromGroup from "../controllers/chatController/removeFromGroup.js";
import renameGroup from "../controllers/chatController/renameGroup.js";
import createGroupChat from "../controllers/chatController/createGroupChat.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/remove").put(protect, removeFromGroup);
router.route("/add").put(protect, addToGroup);

export default router;
