import express from 'express'
import userController from '../controllers/user.js';

const router = express.Router()

router.get("/", userController.list);
router.get("/:id", userController.read);
router.post("/", userController.create)
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

export default router