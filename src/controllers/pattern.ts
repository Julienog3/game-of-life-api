import type { Request, Response } from 'express';
import patternService from './../services/pattern.js'

export default {
  async list(req: Request, res: Response) {
    const patterns = await patternService.findAll()
    res.status(200).json(patterns);
  },
  async read(req: Request, res: Response) {
    const { id: patternId } = req.params

    if (!patternId) return

    const pattern = await patternService.find(+patternId)

    if (pattern) {
      res.status(200).json(pattern)
    } else {
      res.status(404).json({ message: "Pattern not found" })
    }
  },
  async create(req: Request, res: Response) {
    const { body: payload } = req;
    const createdPattern = await patternService.create(payload);

    if (createdPattern) {
      res.status(201).json({ message: "Pattern créé" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'insertion" });
    }
  },
  async update(req: Request, res: Response) {
    const { id: patternId } = req.params;
    const { body: payload } = req;

    if (!patternId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    const updatedPattern = await patternService.update(+patternId, payload)

    if (updatedPattern) {
      res.status(201).json({ message: "Pattern modifié" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'insertion" });
    }
  },
  async remove(req: Request, res: Response) {
    const { id: patternId } = req.params;

    if (!patternId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    await patternService.delete(+patternId)
    res.status(204).json({ message: "pattern supprimé" });
  }
}