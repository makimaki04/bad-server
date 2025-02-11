import BadRequestError from "../errors/bad-request-error";
import { MAX_LIMIT } from "../config";
import { NextFunction, Request, Response } from "express";

const forbiddenOperators = ['$expr', '$function', '$where', '$regex'];

// export async function validateQueryParams(req: Request, res: Response, next: NextFunction) {
//     const keys = Object.keys(req.query)

//     keys.forEach((key) => {
//         if (req.query[key] === 'object') {
//             throw new BadRequestError('Использование недопустимого оператора');
//         }

//         next();
//     })
// }
