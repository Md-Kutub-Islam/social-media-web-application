import express from "express";
import {
  getUser,
  getUserFriend,
  addRemoveFriend,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:id", getUser);
router.get("/:id/friends", getUserFriend);

// update user
router.put("/:id/update", updateUser);

// Update delete and add friend verifyToken,
router.patch("/:id/:friendId", addRemoveFriend);

export default router;
