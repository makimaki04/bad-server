import { MAX_UPLOAD_FILE_SIZE, UPLOAD_FILE_TYPES } from '../config'
import { v4 as uuidv4 } from 'uuid'
import { Request, Express } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { extname, join } from 'path'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(
            null,
            join(
                __dirname,
                process.env.UPLOAD_PATH_TEMP
                    ? `../public/${process.env.UPLOAD_PATH_TEMP}`
                    : '../public'
            )
        )
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        cb(null, uuidv4().concat(extname(file.originalname)))
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
