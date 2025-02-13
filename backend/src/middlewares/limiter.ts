import { REQUEST_LIMIT } from "../config";
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: REQUEST_LIMIT,
    message: { error: 'Слишком много запросов, пожалуйста, попробуйте позже.' },
    legacyHeaders: false,
    standardHeaders: true
})