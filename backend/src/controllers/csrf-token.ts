import { Request, Response } from "express";
import { generateToken } from "../middlewares/csrf-protection";

export function getCsrfToken(req: Request, res: Response) {
    const csrfToken = generateToken(req, res);
    res.json({ csrfToken });
}