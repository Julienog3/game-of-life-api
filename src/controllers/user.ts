import type { Request, Response } from 'express';
import userService from "../services/user.js";

export default {
  async list(req: Request, res: Response) {
    const users = await userService.findAll();
    res.status(200).json(users);
  },
  async read(req: Request, res: Response) {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    const user = await userService.find(+userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  },
  async create(req: Request, res: Response) {
    const { body: payload } = req;
    const createdUser = await userService.create(payload);

    if (createdUser) {
      res.status(201).json({ message: "Utilisateur créé" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'insertion" });
    }
  },
  async update(req: Request, res: Response) {
    const { id: userId } = req.params;
    const { body: payload } = req;

    if (!userId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    const updatedUser = await userService.update(+userId, payload)

    if (updatedUser) {
      res.status(201).json({ message: "Utilisateur modifié" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'insertion" });
    }
  },
  async remove(req: Request, res: Response) {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    await userService.delete(+userId)
    res.status(204).json({ message: "User supprimé" });
  }
}