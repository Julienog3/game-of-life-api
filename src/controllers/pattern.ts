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
    const { body: datas } = req;
    const createdPattern = await patternService.create(datas);

    if (createdPattern) {
      res.status(201).json({ message: "Pattern créé" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'insertion" });
    }
  }
}