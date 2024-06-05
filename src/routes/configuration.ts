import express from 'express'
import configurationController from '../controllers/configuration.js';
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get("/", configurationController.list);
router.get('/:id', configurationController.read)
router.post("/", auth, configurationController.create)
router.put('/:id', auth, configurationController.update)
router.delete('/:id', auth, configurationController.remove)

export default router