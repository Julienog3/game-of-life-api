import type { Request, Response } from "express";
import authService, { Credentials } from '../services/auth.js'
import jwt from 'jsonwebtoken'

export default {
  async login(req: Request, res: Response) {
    const credentials: Credentials = req.body
    const isAuthenticated = await authService.authenticate(credentials)

    if (isAuthenticated) {
      // @ts-expect-error
      const jwtToken = jwt.sign({ email: credentials.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })
      res.cookie('jwtToken', jwtToken, { httpOnly: true, secure: false })
      return res.status(200).json({ isAuthenticated, jwtToken })
    }
    
    return res.status(401).json({ message: "Authentification échouée." });
  },
  async logout(req: Request, res: Response) {
    res.clearCookie('jwtToken', { path: '/' })
    return res.status(204).json()
  }
}