import express from 'express'
import patternRoutes from './../routes/pattern.js'

const router = express.Router()

router.use(express.json()); 
router.use('/patterns', patternRoutes)

export default router
