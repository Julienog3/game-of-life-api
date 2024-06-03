import express from 'express'
import configurationController from '../controllers/configuration.js';

const router = express.Router()

router.get("/", configurationController.list);
router.get('/:id', configurationController.read)
router.post("/", configurationController.create)
router.put('/:id', configurationController.update)
router.delete('/:id', configurationController.remove)

export default router