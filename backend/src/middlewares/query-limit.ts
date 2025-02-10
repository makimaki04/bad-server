import { MAX_LIMIT } from "../config";
import { NextFunction, Request, Response } from "express";

export function queryLimit(req: Request, res: Response, next: NextFunction) {
    const limit = parseInt(req.query.limit as string, 10);

    if (isNaN(limit) || limit > MAX_LIMIT) {
        req.query.limit = MAX_LIMIT.toString();
    }

    next();
}

const forbiddenOperators = ['$expr', '$function', '$where', '$regex'];

function checkQuery(obj: any) {
    Object.keys(obj).forEach((key) => {
        if (forbiddenOperators.includes(key)) {
            throw new Error('Использование недопустимого оператора');
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            checkQuery(obj[key]);
        }
    });
}

export function validateQueryParams(req: Request, res: Response, next: NextFunction) {
    try {
        checkQuery(req.query);
        next();
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}
