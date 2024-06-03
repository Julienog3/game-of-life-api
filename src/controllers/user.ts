import type { Request, Response } from 'express';
import userService from "../services/user.js";

export default {
  async list(req: Request, res: Response) {
    const users = await userService.findAll();
    res.status(200).json(users);
  },
  async create(req: Request, res: Response) {
    const { body: payload } = req;
    const createdUser = await userService.create(payload);

    if (createdUser) {
      res.status(201).json({ message: "Utilisateur créé" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'insertion" });
    }
  }
}