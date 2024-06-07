import type { Request, Response } from "express";
import authService, { Credentials } from '../services/auth.js'
import jwt from 'jsonwebtoken'
import { RequestHandlerArgs } from "../types/index.js";

const authController = {
  login: async (...args: RequestHandlerArgs) => {
    const [req, res] = args

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret key must be defined.')
    }

    const credentials: Credentials = req.body
    const isAuthenticated = await authService.authenticate(credentials)

    if (isAuthenticated) {
      const jwtToken = jwt.sign({ email: credentials.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })
      res.cookie('jwtToken', jwtToken, { httpOnly: true, secure: false })
      return res.status(200).json({ isAuthenticated, jwtToken })
    }
    
    return res.status(401).json({ message: "Authentification échouée." });
  },
  logout: async (...args: RequestHandlerArgs) => {
    const [_, res] = args

    res.clearCookie('jwtToken', { path: '/' })
    return res.status(204).json()
  }
}

export default authController