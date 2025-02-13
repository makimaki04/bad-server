import { DoubleCsrfConfigOptions } from 'csrf-csrf'
import { CookieOptions } from 'express'
import ms from 'ms'

export const { PORT = '3000' } = process.env
export const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env
export const { JWT_SECRET = 'JWT_SECRET' } = process.env
export const ACCESS_TOKEN = {
    secret: process.env.AUTH_ACCESS_TOKEN_SECRET || 'secret-dev',
    expiry: process.env.AUTH_ACCESS_TOKEN_EXPIRY || '10m',
}
export const ORIGIN_ALLOW  = process.env.ORIGIN_ALLOW || 'http://localhost:5173';
export const JSON_BODY_LIMIT = '100kb';
export const MAX_LIMIT = 10;
export const REFRESH_TOKEN = {
    secret: process.env.AUTH_REFRESH_TOKEN_SECRET || 'secret-dev',
    expiry: process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d',
    cookie: {
        name: 'refreshToken',
        options: {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: ms(process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d'),
            path: '/',
        } as CookieOptions,
    },
}

export const doubleCsrfOptions: DoubleCsrfConfigOptions = {
    getSecret: () => process.env.CSRF_SECRET || 'default_secret_key',
    cookieName: 'XSRF-TOKEN',
    cookieOptions: {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    },
};

export const UPLOAD_FILE_TYPES = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]

export const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024;