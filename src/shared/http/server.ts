import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from './routes'
import AppError from '@shared/errors/AppError'
import '@shared/typeorm'
import { errors } from 'celebrate'
import uploadConfig from '@config/upload'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)
app.use(errors())


/*middleware que trata cada requisição*/
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(error)
    if(error instanceof AppError) {
            response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
        response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});

app.listen(3333, () => {
    console.log('Server started on port 3333!')
})