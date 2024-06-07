import type { RequestHandler } from "express";
import jwt from "jsonwebtoken"

const auth: RequestHandler = async (...args) => {
  const [req, res, next] = args
  const jwtToken = req.cookies['jwtToken']

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret key must be defined.')
  }

  if (!jwtToken) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err: any) => {
    if (err) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    next();
  });
}

export default auth