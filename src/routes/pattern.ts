import express from 'express'
import patternController from './../controllers/pattern.js'

const router = express.Router()

router.get("/", patternController.list);

export default router