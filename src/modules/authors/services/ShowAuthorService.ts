import { getCustomRepository } from "typeorm";
import Author from "../typeorm/entities/Author";
import AuthorsRepository from "../typeorm/repositories/AuthorsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string
}

export default class ShowAuthorService{
    public async execute({id}: IRequest): Promise<Author>{
        const authorsRepository = getCustomRepository(AuthorsRepository)
        const author = await authorsRepository.findById(id)
        if(!author){
            throw new AppError('Author not found.')
        }
        return author
    }
}