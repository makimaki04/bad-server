import BadRequestError from "../errors/bad-request-error";
import { MAX_LIMIT } from "../config";
import { NextFunction, Request, Response } from "express";

export function queryLimit(req: Request, res: Response, next: NextFunction) {
    if (req.query.limit) {
        const limit = Number(req.query.limit);
        if (limit > MAX_LIMIT) {
            req.query.limit = MAX_LIMIT.toString();
        }
    }

    next();
}

const forbiddenOperators = ['$expr', '$function', '$where', '$regex'];

export function validateQueryParams(req: Request, res: Response, next: NextFunction) {
    const keys = Object.keys(req.query)

    keys.forEach((key) => {
        if (forbiddenOperators.includes(key) || req.query[key] === 'object') {
            throw new BadRequestError('Использование недопустимого оператора');
        }

        next();
    })
}
