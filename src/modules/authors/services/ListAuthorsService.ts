import { getCustomRepository } from "typeorm";
import Author from "../typeorm/entities/Author";
import AuthorsRepository from "../typeorm/repositories/AuthorsRepository";

export default class ListAuthorsService{
    public async execute(): Promise<Author[]>{
        const authorsRepository = getCustomRepository(AuthorsRepository)
        const authors = await authorsRepository.find()
        return authors
    }
}