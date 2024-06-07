import { RequestHandler } from "express";

type ArgumentTypes<T> = T extends (...args: infer P) => any ? P : never;

export type RequestHandlerArgs = ArgumentTypes<RequestHandler>;