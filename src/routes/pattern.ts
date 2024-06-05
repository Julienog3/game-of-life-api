import express from 'express'
import patternController from './../controllers/pattern.js'

const router = express.Router()

router.get("/", patternController.list);
router.get("/:id", patternController.read);
router.post("/", patternController.create);
router.put("/:id", patternController.update);
router.delete("/:id", patternController.remove);

export default router