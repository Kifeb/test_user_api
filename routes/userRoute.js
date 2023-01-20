import express from "express";
import { CreateUser, DeleteUserById, GetUserById, GetUsers } from "../controllers/userController.js";
import { validate } from "../middlewere/validationRequest.js";

const router = express.Router();

router.post("/", validate, CreateUser)
router.get("/", GetUsers)
router.get("/:id", GetUserById)
router.delete("/:id", DeleteUserById)

export default router;
