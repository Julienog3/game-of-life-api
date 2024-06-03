import express from 'express'
import patternRoutes from './../routes/pattern.js'
import configurationRoutes from './../routes/configuration.js'

const router = express.Router()

router.use(express.json()); 
router.use('/patterns', patternRoutes)
router.use('/configurations', configurationRoutes)

export default router
