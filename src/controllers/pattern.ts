import patternService from './../services/pattern.js'
import { RequestHandlerArgs } from '../types/index.js';

const patternController = {
  list: async (...args: RequestHandlerArgs) => {
    const [_, res, next] = args

    try {
      const patterns = await patternService.findAll()
      res.status(200).json(patterns);
    } catch (err) {
      next(err)
    }
  },
  read: async (...args: RequestHandlerArgs) => {
    const [req, res] = args
    const { id: patternId } = req.params

    if (!patternId) return

    const pattern = await patternService.find(+patternId)

    if (pattern) {
      res.status(200).json(pattern)
    } else {
      res.status(404).json({ message: "Pattern not found" })
    }
  },
  create: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    const { body: payload } = req;

    try {
      const createdPattern = await patternService.create(payload);
      res.status(201).json({ pattern: createdPattern });
    } catch (err) {
      next(err)
    }
  },
  update: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args

    const { id: patternId } = req.params;
    const { body: payload } = req;

    if (!patternId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    try {
      const updatedPattern = await patternService.update(+patternId, payload)
      res.status(201).json({ pattern: updatedPattern });
    } catch (err) {
      next(err)
    }
  },
  remove: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    const { id: patternId } = req.params;

    if (!patternId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    try {
      await patternService.delete(+patternId)
      res.status(204).json();
    } catch (err) {
      next(err)
    }   
  }
}

export default patternController