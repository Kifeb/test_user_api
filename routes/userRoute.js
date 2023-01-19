import express from "express";
import { CreateUser, DeleteUserById, GetUserById, GetUsers } from "../controllers/userController.js";
import { verifyToken } from "../middlewere/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, GetUsers)
router.get("/:id", verifyToken, GetUserById)
router.post("/", verifyToken, CreateUser)
router.delete("/:id", verifyToken, DeleteUserById)

export default router;
