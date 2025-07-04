import AuthorsRepository from "@modules/authors/typeorm/repositories/AuthorsRepository"
import { getCustomRepository } from "typeorm"
import ArticlesRepository from "../typeorm/repositories/ArticlesRepository"
import AppError from "@shared/errors/AppError"
import Article from "../typeorm/entities/Article"

interface IRequest{
    author_id: string
}

export default class ListArticlesByAuthorService{
    public async execute({author_id}: IRequest): Promise<Article[] | undefined>{
            const articlesRepository = getCustomRepository(ArticlesRepository)
            const authorsRepository = getCustomRepository(AuthorsRepository)

            const author = await authorsRepository.findOne(author_id)
            if(!author){
                throw new AppError('Author not found')
            }

            const articles = await articlesRepository.findByAuthor(author_id)
            return articles
        }
}