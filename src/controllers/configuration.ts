import type { Request, Response } from "express";
import configurationService from "../services/configuration.js";

export default {
  async list(req: Request, res: Response) {
    const patterns = await configurationService.findAll()
    res.status(200).json(patterns);
  },
  async read(req: Request, res: Response) {
    const { id: configurationId } = req.params;

    if (!configurationId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    const configuration = await configurationService.find(+configurationId);
    if (configuration) {
      res.status(200).json(configuration);
    } else {
      res.status(404).json({ message: "Configuration non trouvé" });
    }
  },
  async create(req: Request, res: Response) {
    const { body: datas } = req;
    const createdConfiguration = await configurationService.create(datas);

    if (createdConfiguration) {
      res.status(201).json({ message: "Configuration créé" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'insertion" });
    }
  },
  async update(req: Request, res: Response) {
    const { id: configurationId } = req.params;
    const { body: payload } = req;

    if (!configurationId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    const updatedConfiguration = await configurationService.update(+configurationId, payload)

    if (updatedConfiguration) {
      res.status(201).json({ message: "Configuration modifié" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'insertion" });
    }
  },
  async remove(req: Request, res: Response) {
    const { id: configurationId } = req.params;

    if (!configurationId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    await configurationService.delete(+configurationId)
    res.status(204).json({ message: "Configuration supprimé" });
  }
}