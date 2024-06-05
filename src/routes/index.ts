import express from 'express'
import patternRoutes from './../routes/pattern.js'
import configurationRoutes from './../routes/configuration.js'
import userRoutes from './../routes/user.js'
import authRoutes from './../routes/auth.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.use(express.json()); 
router.use('/auth', authRoutes)
router.use(auth)
router.use('/patterns', patternRoutes)
router.use('/configurations', configurationRoutes)
router.use('/users', userRoutes)

export default router
