import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const jwtToken = req.cookies['jwtToken']

  if (!jwtToken) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  
  // @ts-expect-error
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    next();
  });
}