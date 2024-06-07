import userService from "../services/user.js";
import { RequestHandlerArgs } from '../types/index.js';

const userController = {
  list: async (...args: RequestHandlerArgs) => {
    const [_, res, next] = args

    try {
      const users = await userService.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err)
    }
  },
  read: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    try {
      const user = await userService.find(+userId);
      res.status(200).json(user);
    } catch (err) {
      next(err)
    }
  },
  create: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    const { body: payload } = req;

    try {
      const createdUser = await userService.create(payload);
      res.status(201).json({ user: createdUser });
    } catch (err) {
      next(err)
    }
  },
  update: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args

    const { id: userId } = req.params;
    const { body: payload } = req;

    if (!userId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    try {
      const updatedUser = await userService.update(+userId, payload)
      res.status(201).json({ user: updatedUser });
    } catch (err) {
      next(err)
    }
  },
  remove: async (...args: RequestHandlerArgs) => {
    const [req, res, next] = args
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "Identifiant manquant" });
    }

    try {
      await userService.delete(+userId)
      res.status(204).json();
    } catch (err) {
      next(err)
    }
  }
}

export default userController