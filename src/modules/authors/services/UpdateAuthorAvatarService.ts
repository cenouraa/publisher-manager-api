import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError"
import path from "path"
import uploadConfig from '@config/upload'
import fs from "fs"
import AuthorsRepository from "../typeorm/repositories/AuthorsRepository"
import Author from "../typeorm/entities/Author"

interface IRequest{
    author_id: string
    avatarFileName: string
}

export default class UpdateAuthorAvatarService{
    public async execute({author_id, avatarFileName}: IRequest): Promise<Author>{
        const authorsRepository = getCustomRepository(AuthorsRepository)
        const author = await authorsRepository.findById(author_id)
        if(!author){
            throw new AppError('Author not found')
        }
        if(author.avatar){ //se o usuario tem avatar
            const authorAvatarFilePath = path.join(uploadConfig.directory, author.avatar)
            const authorAvatarFileExists = await fs.promises.stat(authorAvatarFilePath)
            if(authorAvatarFileExists){
                await fs.promises.unlink(authorAvatarFilePath)
            }
        }
        author.avatar = avatarFileName
        await authorsRepository.save(author)
        return author
    }
}