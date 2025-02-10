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

function containsForbiddenOperators(obj: any): boolean {
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).some(key =>
            forbiddenOperators.some(op => key.includes(op)) || containsForbiddenOperators(obj[key])
        );
    }
    return false;
}

export function validateQueryParams(req: Request, res: Response, next: NextFunction) {
    if (containsForbiddenOperators(req.query)) {
        return res.status(400).json({ error: 'Invalid query parameter' });
    }
    next();
}
