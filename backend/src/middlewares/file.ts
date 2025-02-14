import { faker } from '@faker-js/faker'
import { MAX_UPLOAD_FILE_SIZE, UPLOAD_FILE_TYPES } from '../config'
import { Request, Express } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { extname, join } from 'path'
import fs from 'fs'
import { mkdirp } from 'mkdirp'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const newDir = join(
    __dirname,
    process.env.UPLOAD_PATH_TEMP
        ? `../public/${process.env.UPLOAD_PATH_TEMP}`
        : '../public'
)

mkdirp.sync(newDir);

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(null, newDir)
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        cb(null, faker.string.uuid().concat(extname(file.originalname)))
    },
})


const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!UPLOAD_FILE_TYPES.includes(file.mimetype)) {
        return cb(null, false)
    }

    return cb(null, true)
}

const limits = {
    fileSize: MAX_UPLOAD_FILE_SIZE
}

export default multer({ storage, fileFilter, limits })
