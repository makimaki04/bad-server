import { MAX_LIMIT } from "config";
import { NextFunction, Request, Response } from "express";

const queryLimit = (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string, 10);

    if (isNaN(limit) || limit > MAX_LIMIT) {
        req.query.limit = MAX_LIMIT.toString();
    }

    next();
}

export default queryLimit;