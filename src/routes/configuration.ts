import express from 'express'
import configurationController from '../controllers/configuration.js';

const router = express.Router()

router.get("/", configurationController.list);
router.post("/", configurationController.create)

export default router