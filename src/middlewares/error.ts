import { Prisma } from "@prisma/client"
import type {  ErrorRequestHandler } from 'express';

export class CustomError {
  readonly code: number
  readonly message: string 

  constructor(message: string, code: number) {
    this.code = code
    this.message = message
  } 
}

function handlePrismaError (err: Prisma.PrismaClientKnownRequestError) {
  switch (err.code) {
    case 'P2002':
      return new CustomError(`Duplicate field value: ${err.meta?.target}`, 400);
    case 'P2014':
      return new CustomError(`Invalid ID: ${err.meta?.target}`, 400);
    case 'P2003':
      return new CustomError(`Invalid input data: ${err.meta?.target}`, 400);
    default:
      return new CustomError(`Something went wrong: ${err.message}`, 500);
  }
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = { ...err }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(err)
  }

  error.code = error.code || 500

  // TODO: Handle JWT Error
  return res.status(error.code).json({ status: error.code, message: error.message });
}

export default errorHandler