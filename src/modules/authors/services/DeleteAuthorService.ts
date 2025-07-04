import { getCustomRepository } from "typeorm"
import AuthorsRepository from "../typeorm/repositories/AuthorsRepository"
import AppError from "@shared/errors/AppError"

interface IRequest{
    id: string
}

export default class DeleteAuthorService{
    public async execute({id}: IRequest): Promise<void>{
        const authorsRepository = getCustomRepository(AuthorsRepository)
        const author = await authorsRepository.findById(id)
        if(!author){
            throw new AppError('Author not found.')
        }
        await authorsRepository.remove(author)
    }
}