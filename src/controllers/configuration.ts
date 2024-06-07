import configurationService from "../services/configuration.js";
import { RequestHandlerArgs } from "../types/index.js";

const configurationController = {
  list: async (...args: RequestHandlerArgs) => {
    const [_, res, next] = args

    try {
      const patterns = await configurationService.findAll()
      res.status(200).json(patterns);
    } catch (err) {
      next(err)
    }
  },
  read: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    const { id: configurationId } = req.params;

    if (!configurationId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    try {
      const configuration = await configurationService.find(+configurationId);
      res.status(200).json(configuration);
    } catch (err) {
      next(err)
    }
  },
  create: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    const { body: payload } = req;
    
    try {
      await configurationService.create(payload);
      res.status(201).json({ message: "Configuration créé" });
    } catch (err) {
      next(err)
    }
  },
  update: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    
    const { id: configurationId } = req.params;
    const { body: payload } = req;

    if (!configurationId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    try {
      await configurationService.update(+configurationId, payload)
      res.status(201).json({ message: "Configuration modifié" });
    } catch(err) {
      next(err)
    }
  },
  remove: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    const { id: configurationId } = req.params;

    if (!configurationId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    try {
      await configurationService.delete(+configurationId)
      res.status(204).json({ message: "Configuration supprimé" });
    } catch (err) {
      next(err)
    }
  }
}

export default configurationController