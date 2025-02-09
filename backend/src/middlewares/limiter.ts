import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: { error: 'Слишком много запросов, пожалуйста, попробуйте позже.' },
    legacyHeaders: false,
    standardHeaders: true
})